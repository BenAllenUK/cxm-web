const error = (e?: Error) => {
  console.error(e)
  return {
    statusCode: 500,
    body: JSON.stringify({
      name: e?.name ?? 'UNKNOWN',
      error: e?.message ?? 'Unknown Error',
    }),
  }
}

export default error
