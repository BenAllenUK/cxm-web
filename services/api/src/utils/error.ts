const error = (e?: Error | string) => {
  console.error(e)
  return {
    statusCode: 500,
    body: JSON.stringify({
      name: typeof e === 'object' ? e?.name ?? 'UNKNOWN' : e,
      error: typeof e === 'object' ? e?.message ?? 'Unknown Error' : e,
    }),
  }
}

export default error
