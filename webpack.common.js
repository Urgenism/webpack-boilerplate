const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

// We need Nodes fs module to read directory contents
const fs = require("fs");

// Our function that generates our html plugins
function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    // Create new HTMLWebpackPlugin with options
    return new HTMLWebpackPlugin({
      title: `${name}`,
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    });
  });
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins("./src/templates");

// main webpack exports
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename:  devMode ? "assets/js/app.js" : "assets/js/app.[contentHash].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "assets/css/app.css" : "assets/css/app.[hash].css"
    })
  ].concat(htmlPlugins),
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};
