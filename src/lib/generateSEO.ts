import { Metadata } from 'next'

export const generateSEO = (title: string, description: string, image: string, url: string): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: {
        url: image
      }
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [image]
    }
  }
}
