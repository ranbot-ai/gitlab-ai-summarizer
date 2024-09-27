const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HTMLWebpackInjector = require('html-webpack-injector');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const extPlugins = [
    new CopyWebpackPlugin({
        patterns: [
            { from: "src/resources/manifest.json", to: "[name][ext]" },
            { from: "public/*.ico", to: "[name][ext]" },
            { from: "src/assets/icons/*.png", to: "./icons/[name][ext]" },
        ],
    }),
    new HTMLWebpackPlugin({
        template: "./public/settings.html",
        filename: "settings.html",
        chunks: ["settings"]
    }, {
        template: "./public/settings.html",
        filename: "index.html",
        chunks: ["index"]
    }),
    new HTMLWebpackInjector(),
]

module.exports = {
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    entry: {
        app: "./src/containers/app/Index.tsx",
        settings: "./src/containers/settings/Index.tsx",
        background: "./src/background/index.ts",
        contentscript: "./src/contentscript/index.ts",
    },
    mode: "production",
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        }
                    }
                ],
            },
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: extPlugins,
    resolve: {
        extensions: [".tsx", ".ts", ".js", "*.png"],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        clean: true,
    },
};
