module.exports = {
  devServer: {
    overlay: false,
    proxy: "http://localhost",
  },

  transpileDependencies: ["vuetify"],
};
