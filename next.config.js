const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["icon-library.com", "images.ctfassets.net"],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "src/styles")],
    },
}

module.exports = nextConfig
