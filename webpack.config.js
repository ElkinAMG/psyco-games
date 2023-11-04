const path = require("path");

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  config = {
    mode: "none",
    entry: path.join(__dirname, "src", "index"),
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          include: [path.resolve(__dirname, "src")],
          exclude: [path.resolve(__dirname, "node_modules")],
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/env",
                {
                  targets: {
                    browsers: "last 2 chrome versions",
                  },
                },
              ],
            ],
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "public/index.html",
        hash: true,
      }),
    ],
    resolve: {
      extensions: [".json", ".js"],
    },
    devServer: {
      port: 8080,
      hot: true,
      client: {
        progress: true,
      },
      static: {
        directory: path.join(__dirname, "./build"),
        serveIndex: true,
      },
    },
    optimization: {
      runtimeChunk: "single",
    },
  };

  switch (argv.mode) {
    case "development":
      config.devtool = "source-map";
      return config;
    case "production":
      config.optimization = { ...config.optimization, minimize: true };
    default:
      return config;
  }
};
