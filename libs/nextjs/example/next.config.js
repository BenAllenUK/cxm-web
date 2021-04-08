module.exports = {
  images: {
    domains: [
      'localhost',
      'api.omnea.co',
      'omnea-upload.s3.amazonaws.com',
      'images.unsplash.com'
    ]
  },
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false
              }
            }
          }
        }
      ]
    })
    return config
  },
  env: {
    OMNEA_UPLOAD_URL: process.env.OMNEA_UPLOAD_URL,
    OMNEA_ROOT_URL: process.env.OMNEA_ROOT_URL,
    OMNEA_PROJECT_SLUG: process.env.OMNEA_PROJECT_SLUG,
    OMNEA_SECRET_KEY: process.env.OMNEA_SECRET_KEY
  }
}
