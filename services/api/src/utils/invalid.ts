const invalid = (e?: Error) => {
  console.error(e)
  return {
    statusCode: 400,
    body: JSON.stringify({
      name: 'INVALID',
    }),
  }
}

export default invalid
