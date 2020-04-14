const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const path = require('path');

module.exports = {
    mode: devMode ? "development" : "production",
    entry: {
        app: './src/styles/scss/app.scss',
       
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'dist/css/[name].css',
    },


  module:{
      rules:[
        {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader'

        },
        {
        
        test: /\.(sa|sc)ss$/,
        use: [
            {

                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: "css-loader",
                options: {
                    importLoaders: 2
                }
            },
            {

                loader: "postcss-loader",
                options: {
                    ident: "postcss",

                    plugins: devMode
                        ? () => []
                        : () => [
                            postcssPresetEnv({
                                browsers: [">1%"]
                            }),
                            require("cssnano")()
                        ]
                }
            },
            {

                loader: "sass-loader"
            }
        ]
    }
]

  },
  plugins: [
    // Configuration options for MiniCssExtractPlugin. Here I'm only
    // indicating what the CSS output file name should be and
    // the location
    new MiniCssExtractPlugin({
        filename: devMode ? "dist/css/[name].css" : "dist/css/[name].min.css"
    })
]
};