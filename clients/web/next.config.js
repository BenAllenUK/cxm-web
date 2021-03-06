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
    domains: ['localhost', 'api.omnea.co', 'omnea-upload.s3.amazonaws.com', 'images.unsplash.com'],
  },

  env: {
    OMNEA_UPLOAD_URL: process.env.OMNEA_UPLOAD_URL,

    API_HOST: process.env.API_HOST,
    ROOT_HOST: process.env.ROOT_HOST,
    ADMIN_HOST: process.env.ADMIN_HOST,
    HOSTED_HOST: process.env.HOSTED_HOST,
    DOCS_HOST: process.env.DOCS_HOST,
    PROTOCOL: process.env.PROTOCOL,

    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    NEXT_PUBLIC_AUTH0_LOGIN: process.env.NEXT_PUBLIC_AUTH0_LOGIN,
    NEXT_PUBLIC_AUTH0_PROFILE: process.env.NEXT_PUBLIC_AUTH0_PROFILE,
    AUTH0_CALLBACK: process.env.AUTH0_CALLBACK,
    AUTH0_POST_LOGOUT_REDIRECT: process.env.AUTH0_POST_LOGOUT_REDIRECT,
    AUTH0_COOKIE_DOMAIN: process.env.AUTH0_COOKIE_DOMAIN,
    NEXT_PUBLIC_AUTH_POST_LOGIN: process.env.NEXT_PUBLIC_AUTH_POST_LOGIN,

    // Dev Only
    ORGANISATION: process.env.ORGANISATION,
  },
}
