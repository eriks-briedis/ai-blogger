export const getPostHeaders = (postContent: string): string[] => {
  const regex = /<(h1|h2)>(.*?)<\/(h1|h2)>/g;
  const matches = postContent.match(regex);

  return (matches || [])
    .map((match) => match.replace(/<\/?(h1|h2)>/g, ''))
    .filter((header) => header.toLocaleLowerCase() !== 'introduction')
    .slice(0, -1);
}
