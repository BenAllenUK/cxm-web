// https://auth0.com/docs/extensions/deploy-cli-tool

async function f(user, context, callback) {
  let API_URL = 'https://cxm.hasura.app/v1/graphql';
  const NAMESPACE = 'https://hasura.io/jwt/claims';

  const UPSERT_USER_QUERY = `
  mutation ($hasuraUserId: String!, $name: String!, $email: String!, $image: String!, $organisationId: Int!, $lastSignedInAt: timestamptz) {
    insert_users_one(object: {hasuraUserId: $hasuraUserId, name: $name, email: $email, image: $image, organisationId: $organisationId, lastSignedInAt: $lastSignedInAt}, on_conflict: {constraint: users_hasura_user_id_key, update_columns: []}) {
      id
      organisationId
      permissions {
        projectId
      }
    }
  }

  `;

  const GET_USER_QUERY = `
    query getUserId($hasuraUserId: String!) {
      users(where: {hasuraUserId: { _eq: $hasuraUserId}}) {
        id
        organisationId
        permissions {
          projectId
          type
        }
      }
    }
  `;

  const HEADERS = {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'BARBAR',
  };

  const axios = require('axios');

  try {
    const response = await axios.post(
      API_URL,
      {
        query: UPSERT_USER_QUERY,
        variables: {
          hasuraUserId: user.user_id,
          name: user.nickname,
          email: user.email,
          image: user.picture,
          organisationId: 1,
          lastSignedInAt: new Date().toISOString(),
        },
      },
      {
        headers: HEADERS,
      }
    );

    if (!response.data.data) {
      console.error(response.data.errors);
      throw Error(`Mutation error`);
    }

    const data = response.data.data.insert_users_one;

    let userId = data ? data.id : null;
    let organisationId = data ? data.organisationId : null;
    var projectIds = [];
    if (data) {
      projectIds = data.permissions.map((item) => {
        return item.projectId;
      });
    }

    // Fetch user
    if (!userId) {
      const graphqlReq2 = { query: GET_USER_QUERY, variables: { hasuraUserId: user.user_id } };
      const response2 = await axios.post(API_URL, graphqlReq2, {
        headers: HEADERS,
      });

      const data2 = response2.data.data.users[0];
      userId = data2 ? data2.id : null;
      organisationId = data2 ? data2.organisationId : null;
      if (data2) {
        projectIds = data2.permissions.map((item) => {
          return item.projectId;
        });
      }
    }

    const role = 'org-admin';

    context.idToken[NAMESPACE] = {
      'x-hasura-role': role,
      'x-hasura-default-role': role,
      'x-hasura-allowed-roles': [role],
      'x-hasura-user-id': `${userId}`,
      'x-hasura-org-id': `${organisationId}`,
    };
    callback(null, user, context);
  } catch (e) {
    console.error(e);
    callback(e, null, context);
  }
}

// exports.f = f;
