import { FadeIn } from '@/components/atoms/fade-in'
import { weeklyCodingActivity } from '@/lib/actions'

export const Activity = async () => {
  const { data } = await weeklyCodingActivity()

  const maxTotalSeconds = Math.max(...data.map(entry => entry.grand_total.total_seconds))
  const minTotalSeconds = Math.min(...data.map(entry => entry.grand_total.total_seconds))

  return (
    <FadeIn>
      <article>
        <div className='space-y-2 mb-2.5 pb-2.5 border-b'>
          <h1 className='text-3xl font-semibold'>Weekly Activity</h1>
          <h2 className='text-muted-foreground'>
            From : {data[0].range.text} - {data[data.length - 1].range.text}
          </h2>
        </div>
        {data.reverse().map(item => (
          <pre className='flex items-center' key={item.range.date}>
            <code className='text-muted-foreground w-44 truncate shrink-0'>{item.range.text}</code>
            <div className='w-full h-1 bg-muted rounded'>
              <div
                className='h-1 bg-foreground rounded'
                style={{
                  width: `${((item.grand_total.total_seconds - minTotalSeconds) / (maxTotalSeconds - minTotalSeconds)) * 100}%`
                }}
              />
            </div>
            <code className='w-44 text-end text-muted-foreground'>{item.grand_total.text}</code>
          </pre>
        ))}
      </article>
    </FadeIn>
  )
}
