const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    // config.module.rules.push({
    //   test: /\.(css|scss)$/,
    //   exclude: /node_modules/,
    //   use: [
    //     'style-loader',
    //     '@teamsupercell/typings-for-css-modules-loader',
    //     {
    //       loader: 'css-loader',
    //       options: { modules: true },
    //     },
    //   ],
    // })
    if (process.env.ANALYZE) {
      // https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      )
    }

    return config
  },
  images: {
    domains: ['localhost', 'api.omnea.co', 'omnea-upload.s3.amazonaws.com'],
  },
  env: {
    OMNEA_UPLOAD_URL: process.env.OMNEA_UPLOAD_URL,

    API_HOST: process.env.API_HOST,
    ROOT_HOST: process.env.ROOT_HOST,
    ADMIN_HOST: process.env.ADMIN_HOST,
    HOSTED_HOST: process.env.HOSTED_HOST,
    DOCS_HOST: process.env.DOCS_HOST,
    PROTOCOL: process.env.PROTOCOL,

    // Dev Only
    ORGANISATION: process.env.ORGANISATION,
  },
}
