const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  webpack: (config:any, { isServer }:any) => {
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["javascript", "typescript", "html", "css", "json"],
          filename: "static/[name].worker.js",
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
