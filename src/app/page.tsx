export default function Home() {
  return (
    <pre className='flex h-full flex-col items-center justify-center space-y-2.5 whitespace-pre-wrap md:space-y-5'>
      <code className='text-[2dvw] leading-[0.9] tracking-[-0.1em] lg:text-[1.4dvh] select-none'>{ascii}</code>
      <code className='text-center text-sm md:text-base'>
        <p>Self taught web developer</p>
        <p>love to learn new things and I&apos;m always looking for new challenges to solve :)</p>
      </code>
    </pre>
  )
}

const ascii = `___ __ _______________________________________________________________
7  V  V  77  77     77     77  _  77  7  77     77     77     77     7
|  |  |  ||  ||  ___!|  ___!|  _  ||   __!|  ___!|  7  ||  _  ||  7  |
|  !  !  ||  |!__   7|  7___|  7  ||     |!__   7|  |  ||  7  ||  |  |
|        ||  |7     ||     7|  |  ||  7  |7     ||  !  ||  |  ||  !  |
!________!!__!!_____!!_____!!__!__!!__!__!!_____!!_____!!__!__!!_____!
                                                                      
`
