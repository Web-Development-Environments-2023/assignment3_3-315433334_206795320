module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    // host: "132.72.65.211"
    host: '0.0.0.0',
    port: 8080,
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
