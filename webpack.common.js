const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');

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
    filename: "assets/js/app.[contentHash].js"
  },
  plugins: [
    // new CopyPlugin([
    //   { from: './src/assets/fonts', to: 'assets/fonts' },
    // ]),
  ].concat(htmlPlugins),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(html)$/,
        use: [ "html-loader" ]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/imgs"
          }
        }
      }
    ]
  }
};
