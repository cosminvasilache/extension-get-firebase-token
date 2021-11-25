import * as path from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
/* eslint-disable */
// @ts-ignore: no types provided
import JsonMinimizerPlugin from 'json-minimizer-webpack-plugin';
/* eslint-enable */
interface Environment {
    analyze?: boolean,
}

const baseWebpackConfig: webpack.Configuration = {
    mode: 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjs', '.cjs', '.json', '.wasm'],
    },
    entry: {
        popup: './src/popup/popup.ts',
        background: './src/background/background.ts',
        content: './src/content/content.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/

        new HtmlWebpackPlugin({
            template: 'src/popup/index.html',
            filename: 'popup.html',
            chunks: ['popup'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/manifest.json',
                    to: 'manifest.json', // `dist/` is included by [config].output.path
                },
                {
                    from: 'src/assets',
                    to: '.',
                }
            ],
        }),
    ],
    module: {
        rules: [
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/

            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};

const makeProdConfig = () => {
    const prodWebpackConfig: webpack.Configuration = {
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.json/i,
                    type: 'asset/resource',
                },
            ],
        },
        optimization: {
            minimizer: [
                '...', // keep the default minimizers: https://webpack.js.org/plugins/json-minimizer-webpack-plugin/
                new JsonMinimizerPlugin({

                }),
            ],
        },
    };
    return prodWebpackConfig;
};

const devWebpackConfig: webpack.Configuration = {
    mode: 'development',
    devtool: 'source-map',
};

const makeAnalyzeConfig = () => {
    const analyzeWebpackConfig: webpack.Configuration = {
        plugins: [
            new BundleAnalyzerPlugin({

            }),
        ],
    };
    return analyzeWebpackConfig;
};

function createConfig(env: Environment, argv: { [key: string]: unknown }) {
    console.log('ENVIRONMENT:', env);
    console.log('argv:', argv);

    let outputWebpackConfig: webpack.Configuration = baseWebpackConfig;

    if (argv?.mode === 'production') {
        outputWebpackConfig = merge(outputWebpackConfig, makeProdConfig());
    }

    if (argv?.mode === 'development') {
        outputWebpackConfig = merge(outputWebpackConfig, devWebpackConfig);
    }

    if (env?.analyze) {
        outputWebpackConfig = merge(outputWebpackConfig, makeAnalyzeConfig());
    }

    return outputWebpackConfig;
}

export default createConfig;
