module.exports = {
  entry: './widget/weather-widget.js',
  output: {
    path: __dirname,
    filename: './public/javascripts/dist/weather-widget.js',
    library: ["WeatherWidget"],
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  devtool: 'source-map'
};
