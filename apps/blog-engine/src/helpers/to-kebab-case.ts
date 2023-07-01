export const toKebabCase = (text: string) => {
  // Convert text to lowercase and replace non-alphanumeric characters with hyphens
  const kebabCaseText = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Remove leading and trailing hyphens
  return kebabCaseText.replace(/^-+|-+$/g, '');
}
