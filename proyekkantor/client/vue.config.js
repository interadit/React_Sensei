const path = require('path');

module.exports = {
    productionSourceMap     : false,
    runtimeCompiler         : true,
    publicPath              : process.env.VUE_APP_SUBDOMAIN == 'true' ? `/${process.env.VUE_APP_NAME}` : '/',
    transpileDependencies   : ['@elpi.datatable'],
    configureWebpack        : {
        resolve : {
            alias : {
                assets : path.resolve(__dirname, 'src/assets'),
                core   : path.resolve(__dirname, 'node_modules/@elpi/client/assets')
            },
            extensions: ['.vue', '.min.css', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [{ 
                        loader  : 'less-loader',
                    }, { 
                        loader  : 'text-transform-loader',
                        options : {
                            prependText: `@import "~core/css/variable.less";\n`
                        }
                    }]
                }
            ],
        }
    },
    devServer: {
        proxy : {
            [`/${process.env.VUE_APP_API}`] : {
                target : `${process.env.VUE_APP_PROXY}`
            }
        }
    },
    pwa: {
        name: process.env.VUE_APP_TITLE,
        themeColor: '#ffffff',
        msTileColor: '#ffffff',
        appleMobileWebAppCapable: 'yes',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'sw.js',
            include: ['.svg']
        }
    }
};