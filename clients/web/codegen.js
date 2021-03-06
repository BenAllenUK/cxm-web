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
  documents: ['./src/queries/**/*.tsx', './src/queries/**/*.ts', './src/**/*.gql', './src/**/*.graphql'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
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
