import { FadeIn } from '@/components/atoms/fade-in'
import { weeklyCodingLanguanges, weeklyCodingActivity } from '@/lib/actions'

export const Languanges = async () => {
  const { data } = await weeklyCodingLanguanges()
  const { data: activity } = await weeklyCodingActivity()

  return (
    <FadeIn>
      <article>
        <div className='md:space-y-2 mb-2.5 pb-2.5 border-b'>
          <h1 className='md:text-3xl text-2xl font-semibold'>Code that i wrote this week</h1>
          <h2 className='text-muted-foreground'>
            From : {activity[0].range.text} - {activity[activity.length - 1].range.text}
          </h2>
        </div>
        {data.map(item => (
          <pre className='flex items-center' key={item.name}>
            <code className='text-muted-foreground w-40 truncate shrink-0 flex items-center gap-x-2'>
              <div
                className='w-1 h-1 rounded-full'
                style={{
                  backgroundColor: item.color
                }}
              />
              {item.name}
            </code>
            <div className='w-full h-1 bg-muted rounded'>
              <div
                className='w-full h-1 bg-foreground rounded'
                style={{
                  width: `${item.percent}%`
                }}
              />
            </div>
            <code className='w-24 text-end text-muted-foreground'>{item.percent}%</code>
          </pre>
        ))}
      </article>
    </FadeIn>
  )
}
