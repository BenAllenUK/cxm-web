const { f } = require(`./rule`)

f(
  {
    user_id: '1',
    nickname: 'ben',
    email: 'ben@omnea.co',
    picture: 'asdf',
    organisationId: 1,
  },
  {
    idToken: {},
  },
  (error, user, context) => {
    console.log(error)
    console.log(user)
    console.log(context)
  }
)
