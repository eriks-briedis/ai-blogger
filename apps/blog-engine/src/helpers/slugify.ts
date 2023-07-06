export const slugify = (input: string) => {
  return input
    .toLowerCase()
    // Remove spaces
    .replace(/\s+/g, '-')
    // Remove special characters
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
}
