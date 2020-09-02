module.exports = {
  devServer: {
	https: true,
    proxy: {
      "^/api*": {
        "target": "https://domodel.herokuapp.com",
          ws: true,
          changeOrigin: true
      }
	}
  },
  "transpileDependencies": [
    "vuetify"
  ]
};