import { Metadata } from 'next'
import { weeklyOperatingSystems } from '@/lib/actions'

export const metadata: Metadata = {
  title: 'Operating Systems Activity',
  description: 'This week I spent my time using these operating systems.'
}

export const dynamic = 'force-static'

export default async function EditorPage() {
  const { data } = await weeklyOperatingSystems()

  return (
    <>
      <h1 className='mb-2 text-base text-[#C6C6C6] md:text-xl'>Weekly Operating Systems Activity</h1>
      <ul className='text-sm'>
        {data.map(item => (
          <li key={item.name} className='flex items-center justify-between'>
            <p className='w-40 shrink-0 truncate !text-sm'>{item.name}</p>

            <div className='hidden h-1 w-full bg-[#232323] md:block'>
              <div className='h-1 w-full bg-[#898989]' style={{ width: `${item.percent}%` }} />
            </div>

            <p className='w-24 text-end'>{item.percent} %</p>
          </li>
        ))}
      </ul>
    </>
  )
}
