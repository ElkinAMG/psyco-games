const path = require("path");

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  config = {
    mode: "none",
    // Agregar los script que se están utilizando siguiendo el mismo modelo de 'main'.
    entry: {
      user: path.join(__dirname, "src", "User"),
      main: {
        dependOn: "user",
        import: "./src/index",
      },
      questions: {
        dependOn: "user",
        import: "./src/games/questions",
      },
    },
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
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    // Agregar las páginas utilizando una nueva instancia de HtmlWebpackPlugin.
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "public/index.html",
        chunks: ["main", "user"],
      }),
      new HtmlWebpackPlugin({
        filename: "questions.html",
        template: "public/kids/questions.html",
        chunks: ["questions", "user"],
      }),
      new HtmlWebpackPlugin({
        filename: "ahorcado.html",
        template: "public/young/ahorcado.html",
        inject: false, // Agregar inject cuando tengan onclick o eventos en html.
      }),
      new MiniCssExtractPlugin({ filename: "./assets/styles/[name].css" }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./src/utils", to: "avatar-utils" }],
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./src/addons", to: "addons" }],
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./public/assets", to: "assets" }],
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./public/styles", to: "styles" }],
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./public/scripts", to: "." }],
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
