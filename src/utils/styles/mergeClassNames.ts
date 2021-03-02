const mergeClassNames = (classes: (string | boolean | null | undefined)[]) => {
  return classes.filter((item) => !!item)
}

export default mergeClassNames
