'use client'

export default function Error() {
  return (
    <pre className='flex h-full flex-col items-center justify-center space-y-5 whitespace-pre-wrap'>
      <code className='text-[1.4dvh] leading-[0.9] tracking-[-0.1em]'>{ascii}</code>
      <code className='text-center'>
        <p>Something went wrong</p>
        <p>Sorry, an error occurred while processing your request.</p>
      </code>
    </pre>
  )
}

const ascii = ` _______  _______  _______ 
|       ||  _    ||  _    |
|   ____|| | |   || | |   |
|  |____ | | |   || | |   |
|_____  || |_|   || |_|   |
 _____| ||       ||       |
|_______||_______||_______|`
