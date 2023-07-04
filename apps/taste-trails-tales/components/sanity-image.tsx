import { createClient } from '@sanity/client';
import Img from 'next/image'
import { useNextSanityImage } from 'next-sanity-image';

const configuredSanityClient = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	useCdn: true,
  apiVersion: '2023-07-01',
});

export const SanityImage = ({ image, title, alt }: any) => { //@TODO: type this
  const imageProps: any = useNextSanityImage(configuredSanityClient, image)

  return (
    <Img
      {...imageProps}
      style={{ width: '100%', height: 'auto' }} // layout="responsive" prior to Next 13.0.0
      sizes="(max-width: 800px) 100vw, 800px"
      priority={true}
      alt={alt}
      title={title}
      // placeholder="blur"
      // blurDataURL={coverImage.asset.metadata.lqip}
    />
  )
}
