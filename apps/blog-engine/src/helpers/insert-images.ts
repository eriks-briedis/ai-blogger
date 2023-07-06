export const insertImages = async (postContent: string, images: PostImage[]): Promise<string> => {
  return images.reduce((acc, image) => {
    if (!image) {
      return acc
    }

    const headerWithTags = `<h2>${image.header}</h2>`
    // find end inddex of header
    const headerEndIndex = acc.indexOf(headerWithTags) + headerWithTags.length
    // insert image tag after header
    const imageTag = `
      <div>
        <div>
          <img src="${image.url}" title="${image.header}" alt="${image.header}" />
        </div>
        <div>
          <p>Photo by <a href="${image.authorPorfolioUrl ?? ''}">${image.authorName}</a> on <a href="https://unsplash.com/">Unsplash</a></p>
        </div>
      </div>
    `
    acc = acc.slice(0, headerEndIndex) + imageTag + acc.slice(headerEndIndex)

    return acc
  }, postContent)
}

export interface PostImage {
  header: string
  url: string
  authorName: string
  authorPorfolioUrl?: string
}
