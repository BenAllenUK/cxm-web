const invalid = (e?: Error | string) => {
  console.error(e)
  return {
    statusCode: 400,
    body: JSON.stringify({
      name: typeof e === 'object' ? e.message : e,
    }),
  }
}

export default invalid
