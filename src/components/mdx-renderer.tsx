import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

interface Props {
  source: string
  components?: MDXRemoteProps['components']
  limitWidth?: boolean
}

export const MDXRenderer = ({ source, components, limitWidth = true }: Props) => {
  const mdxSource: MDXRemoteProps = {
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { keepBackground: false, theme: 'poimandres' }]]
      }
    },
    components: {
      img: ({ src, alt }) => (
        <Image
          src={src!}
          alt={alt!}
          className='mx-auto my-0 object-cover object-center md:max-w-[80%] bg-[#898989]/10'
          priority
          width={820}
          height={492}
          quality={100}
          unoptimized={src?.includes('.gif')}
        />
      ),
      a: props => <a href={props.href} target='_blank' {...props} />,
      ...components
    }
  }

  return (
    <article
      className={`prose prose-neutral prose-invert mx-auto font-sans prose-headings:text-[#C6C6C6] prose-p:text-[#898989] prose-a:text-[#C6C6C6] prose-ul:text-[#898989] prose-ol:text-[#898989] prose-strong:text-[#C6C6C6] ${limitWidth ? 'max-w-5xl' : 'max-w-none'} `}
    >
      <MDXRemote {...mdxSource} />
    </article>
  )
}
