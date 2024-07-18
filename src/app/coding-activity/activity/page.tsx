import { Metadata } from 'next'
import { weeklyCodingActivity } from '@/lib/actions'

export const metadata: Metadata = {
  title: 'Weekly Activity',
  description: 'My coding activity for this week.'
}

export const dynamic = 'force-static'

export default async function ActivityPage() {
  const { data } = await weeklyCodingActivity()

  const maxTotalSeconds = Math.max(...data.map(entry => entry.grand_total.total_seconds))
  const minTotalSeconds = Math.min(...data.map(entry => entry.grand_total.total_seconds))

  return (
    <>
      <h1 className='mb-2 text-base text-[#C6C6C6] md:text-xl'>This week&apos;s coding activity</h1>
      <ul className='text-sm'>
        {data.map(item => (
          <li key={item.range.date} className='flex items-center justify-between'>
            <p className='w-40 shrink-0 truncate !text-sm'>{item.range.text}</p>

            <div className='hidden h-1 w-full bg-[#232323] md:block'>
              <div className='h-1 w-full bg-[#898989]' style={{ width: `${((item.grand_total.total_seconds - minTotalSeconds) / (maxTotalSeconds - minTotalSeconds)) * 100}%` }} />
            </div>

            <p className='ml-4 w-32 shrink-0 text-end md:ml-0'>{item.grand_total.text}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
