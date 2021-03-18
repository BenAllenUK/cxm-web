module.exports = {
  schema: [
    {
      'https://cxm.hasura.app/v1/graphql': {
        headers: {
          'X-Hasura-admin-secret': process.env.ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.gql', './src/**/*.graphql'],
  overwrite: true,
  generates: {
    './src/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        transformUnderscore: true,
        namingConvention: {
          enumValues: 'change-case#pascalCase',
          typeNames: 'change-case#pascalCase',
        },
        // typesPrefix: 'I',
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}
