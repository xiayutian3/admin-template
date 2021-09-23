module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/css/variables.scss";'
      }
    }
  },
  // 声明配置webpack
  configureWebpack: {
    // devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'nosources-source-map',
    resolve: {
      // 配置路径别名
      alias: {
        // 解决开发环境下的警告 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    }
    // DefinePlugin: {
    //   __INTLIFY_PROD_DEVTOOLS__: false
    // }

  },
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        console.log('args', args)
        args[0].__INTLIFY_PROD_DEVTOOLS__ = false
        // args[0].__VUE_PROD_DEVTOOLS__ = JSON.stringify(false)
        return args
      })
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://192.168.2.27:8823',
        target: 'http://44.193.243.127:8849',
        // target: 'http://192.168.2.213:8849',
        // target: 'http://192.168.2.110:8850',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
      // '/api/yy-advertisement': {
      //   // target: 'http://192.168.2.54:8861',
      //   target: 'http://192.168.2.27:8873',
      //   changeOrigin: true,
      //   pathRewrite: { '^/api/yy-advertisement': '/' }
      // }
    }
  }
}
