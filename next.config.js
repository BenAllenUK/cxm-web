const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { nextI18NextRewrites } = require('next-i18next/rewrites')
const localeSubpaths = {
  fr: 'fr',
  de: 'de',
}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
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
}
