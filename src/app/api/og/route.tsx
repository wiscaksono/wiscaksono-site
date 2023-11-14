import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { ENV } from '@/lib/constants'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get('title')

  const font = fetch(new URL('../../../../public/fonts/outfit-semibold.ttf', import.meta.url)).then(res => res.arrayBuffer())
  const fontData = await font

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: `url(${ENV.NEXT_PUBLIC_WEBSITE_URL}/og-bg.png)`
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 130,
            fontFamily: 'Outfit',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Outfit',
          data: fontData,
          style: 'normal'
        }
      ]
    }
  )
}
