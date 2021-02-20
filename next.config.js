const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig

module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'fr', 'nl-NL'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
    // localeSubpaths,
    // localeStructure: `{{ns}}/{{lng}}`,
  },
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')],
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
