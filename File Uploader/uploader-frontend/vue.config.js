module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://demapi.herokuapp.com',
          changeOrigin: true
        },
        '/file': {
          target: 'https://demapi.herokuapp.com',
          changeOrigin: true,
         }
      }
    }
}