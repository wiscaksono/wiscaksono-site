import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Read my latest articles on web development, programming, and technology. Stay informed with the latest trends, tools, and techniques in the industry. Learn from my experiences and insights as a web developer. Discover new ideas, concepts, and strategies to improve your skills and knowledge. Stay ahead of the curve with my informative and engaging articles on web development.'
}

export default function ArticlesLayout({ children }: Readonly<Props>) {
  return children
}
