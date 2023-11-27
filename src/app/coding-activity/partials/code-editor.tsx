import { FadeIn } from '@/components/atoms/fade-in'
import { weeklyCodeEditor } from '@/lib/actions'

export const CodeEditor = async () => {
  const { data } = await weeklyCodeEditor()

  return (
    <FadeIn>
      <article>
        <div className='md:space-y-2 mb-2.5 pb-2.5 border-b'>
          <h1 className='md:text-2xl text-xl font-semibold'>Code Editors that i used this week</h1>
        </div>
        {data.map(item => (
          <pre className='flex items-center justify-between' key={item.name}>
            <code className='text-muted-foreground w-40 truncate shrink-0 flex items-center gap-x-2 !text-sm'>
              <div
                className='w-1 h-1 rounded-full'
                style={{
                  backgroundColor: item.color
                }}
              />
              {item.name}
            </code>
            <div className='w-full h-1 bg-muted rounded md:block hidden'>
              <div
                className='w-full h-1 bg-foreground rounded'
                style={{
                  width: `${item.percent}%`
                }}
              />
            </div>
            <code className='w-24 text-end text-muted-foreground !text-sm'>{item.percent}%</code>
          </pre>
        ))}
      </article>
    </FadeIn>
  )
}
