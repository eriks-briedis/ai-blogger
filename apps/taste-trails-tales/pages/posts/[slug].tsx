import { PortableText } from '@portabletext/react'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import PostHeader from '../../components/post-header'
import PostTitle from '../../components/post-title'
import type PostType from '../../interfaces/post'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import { TITLE } from '../../lib/constants'

interface Props {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post ({ post, morePosts, preview }: Props) {
  const router = useRouter()
  const title = `${post.title} | ${TITLE}`
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback
          ? <PostTitle>Loading…</PostTitle>
          : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title} | {TITLE}</title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              {/* <PostBody content={post.content} /> */}
              <PortableText value={post.content} />
            </article>
          </>
            )}
      </Container>
    </Layout>
  )
}

interface Params {
  params: {
    slug: string
  }
}

export async function getStaticProps ({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

  return {
    props: {
      post: {
        ...post,
      },
    },
  }
}

export async function getStaticPaths () {
  const posts = await getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug?.current,
        },
      }
    }),
    fallback: false,
  }
}
