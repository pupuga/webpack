'use strict'

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const entries = ['main']

const url = 'wp.loc'
const port = 3000

const statics = ['images']
const htmlPages = []

const maxSizeImage = 3

const srcDir = 'assets/src/'
const distDir = 'assets/dist/'

module.exports = (env, argv) => {
    const points = entries.map(file => file.includes('/') ? file : srcDir + file);
    const isProduction = argv.mode === 'production'
    const nameFile = isProduction ? '[name]-[contenthash:8]' : '[name]'

    const plugins = [
        new MiniCssExtractPlugin({
            filename: `${nameFile}.min.css`,
            chunkFilename: `${nameFile}.chunk.css`,
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json',
            publicPath: '',
            generate: (seed, files, points) => {
                const manifest = {}

                Object.keys(points).forEach(entryName => {
                    const jsFile = files.find(file => file.name === `${entryName}.js` && file.path.endsWith('.min.js'))
                    if (jsFile) manifest[`${entryName}.js`] = jsFile.path

                    const cssFile = files.find(file => file.name === `${entryName}.css` && file.path.endsWith('.min.css'))
                    if (cssFile) manifest[`${entryName}.css`] = cssFile.path
                })

                return manifest
            }
        }),
        new CopyWebpackPlugin({
            patterns: statics.map(folder => ({
                from: path.resolve(__dirname, srcDir, folder),
                to: path.resolve(__dirname, distDir, folder)
            }))
        })
    ]

    if (htmlPages.length > 0) {
        htmlPages.forEach(page => {
            plugins.push(
                new HtmlWebpackPlugin({
                    filename: `${page}.html`,
                    template: path.resolve(__dirname, srcDir, 'html', `${page}.html`)
                })
            )
        })
    }

    return {
        mode: isProduction ? 'production' : 'development',

        entry: points.reduce((entries, item) => {
            const name = path.basename(item, path.extname(item))
            entries[name] = path.resolve(__dirname, item)
            return entries
        }, {}),

        output: {
            path: path.resolve(__dirname, distDir),
            filename: `${nameFile}.min.js`,
            clean: true,
            assetModuleFilename: `images/${nameFile}[ext]`,
            chunkFilename: `${nameFile}.js`,
        },

        devtool: isProduction ? false : 'source-map',

        module: {
            rules: [
                {
                    test: /\.m?jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]]
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction,
                                esModule: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: !isProduction,
                                postcssOptions: {
                                    plugins: [require('autoprefixer')()]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [require('cssnano')({
                                        preset: ['default', { discardComments: { removeAll: true } }]
                                    })]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff2?|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: `fonts/${nameFile}[ext]`
                    }
                },
                {
                    test: /\.(cur|gif|png|jpe?g|svg)$/i,
                    exclude: /fonts/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: maxSizeImage * 1024
                        }
                    },
                    generator: {
                        filename: `images/${nameFile}[ext]`
                    }
                }
            ]
        },

        resolve: {
            extensions: ['.js', '.ts', '.json']
        },

        optimization: {
            minimizer: [
                new TerserPlugin({ extractComments: false })
            ]
        },

        plugins,

        devServer: {
            host: '0.0.0.0',
            port: port,
            open: true,
            hot: true,
            liveReload: true,
            allowedHosts: 'all',
            static: {
                directory: path.resolve(__dirname, distDir),
                watch: true,
            },
            watchFiles: [
                path.resolve(__dirname, '**/*.php'),
                path.resolve(__dirname, distDir, '**/*.js'),
                path.resolve(__dirname, distDir, '**/*.css'),
            ],
            devMiddleware: {
                writeToDisk: true,
            },
            proxy: [
                {
                    context: () => true,
                    target: 'http://apache-php',
                    changeOrigin: false,
                    ws: false,
                    logLevel: 'silent'
                }
            ],
            client: {
                overlay: true,
                webSocketURL: `ws://${url}:${port}/ws`,
            },
        }
    }
}