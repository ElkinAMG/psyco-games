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
      avioncito: {
        dependOn: "user",
        import: "./src/games/avioncito",
      },
      escaleras: {
        dependOn: "user",
        import: "./src/games/escaleras",
      },
      aquatics: {
        dependOn: "user",
        import: "./src/games/aquatics",
      },
      2048: {
        dependOn: "user",
        import: "./src/games/2048/index",
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
        filename: "mapa.html",
        template: "public/mapa.html",
        inject: false,
      }),
      // KIDS
      new HtmlWebpackPlugin({
        filename: "questions.html",
        template: "public/kids/questions.html",
        chunks: ["questions", "user"],
      }),
      new HtmlWebpackPlugin({
        filename: "aquatics.html",
        template: "public/kids/aquatics.html",
        chunks: ["aquatics", "user"],
      }),
      new HtmlWebpackPlugin({
        filename: "memory-game.html",
        template: "public/kids/memory-game.html",
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: "maze.html",
        template: "public/kids/maze.html",
        inject: false,
      }),
      // YOUNG
      new HtmlWebpackPlugin({
        filename: "2048.html",
        template: "public/young/2048.html",
        chunks: ["2048", "user"],
      }),
      new HtmlWebpackPlugin({
        filename: "avioncito.html",
        template: "public/young/avioncito.html",
        chunks: ["avioncito", "user"],
      }),
      new HtmlWebpackPlugin({
        filename: "escaleras.html",
        template: "public/young/escaleras.html",
        chunks: ["escaleras", "user"],
      }),
      new HtmlWebpackPlugin({
        filename: "futbol.html",
        template: "public/young/futbol.html",
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: "ahorcado.html",
        template: "public/young/ahorcado.html",
        inject: false, // Agregar inject cuando tengan onclick o eventos en html.
      }),
      new HtmlWebpackPlugin({
        filename: "snake.html",
        template: "public/kids/snake.html",
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: "dimensiones.html",
        template: "public/kids/dimensiones.html",
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: "volcan.html",
        template: "public/kids/volcan.html",
        inject: false,
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
