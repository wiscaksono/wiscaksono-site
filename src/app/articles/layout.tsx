import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Discover the latest articles, delve into the world of technology, and explore the latest trends in the tech industry. Stay up-to-date with the latest news, and immerse yourself in the world of technology.'
}

interface Props {
  children: React.ReactNode
}

export default function ArticlesLayout({ children }: Readonly<Props>) {
  return children
}
