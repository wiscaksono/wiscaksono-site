export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export const unslugify = (str: string) => {
  return str.replace(/-/g, ' ')
}
