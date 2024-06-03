import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { ENV } from '@/lib/constants'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get('title')

  const font = fetch('https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.ttf').then(res => res.arrayBuffer())
  const fontData = await font

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${ENV.NEXT_PUBLIC_WEBSITE_URL}/og-bg.png)`
        }}
      >
        <p
          style={{
            marginLeft: 205,
            marginRight: 205,
            display: 'flex',
            fontSize: 68,
            lineHeight: 0.9,
            fontFamily: 'Geist Mono',
            fontStyle: 'normal',
            textAlign: 'center',
            color: '#C6C6C6'
          }}
        >
          {postTitle}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 620,
      fonts: [
        {
          name: 'Geist Mono',
          data: fontData,
          style: 'normal'
        }
      ]
    }
  )
}
