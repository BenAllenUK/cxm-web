const notfound = (e?: Error) => {
  console.error(e)
  return {
    statusCode: 404,
    body: JSON.stringify({
      name: 'NOT_FOUND',
    }),
  }
}

export default notfound
