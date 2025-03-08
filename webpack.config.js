const path = require("path");

module.exports = {
    entry: "./src/index.js", // Make sure this is correct
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js", // Ensure this is the correct output filename
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
