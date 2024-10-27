import { getRandomWidth } from '@/lib/utils'

export default function Loading() {
  return (
    <ul className='flex flex-col gap-y-2 divide-y divide-[#898989]/20 text-sm lg:divide-y-0'>
      {[...Array(50)].map((_, index) => (
        <li
          key={index}
          className='flex flex-col gap-1 py-1 lg:flex-row lg:gap-2 lg:border-y-0 lg:py-0'
          style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: `${index * 100}ms` }}
        >
          <div className='lg:w-36 w-20 h-5 bg-[#898989]/10 shrink-0' />
          <p className='shrink-0 hidden lg:block'>:</p>
          <div className='h-5 bg-[#898989]/10' style={{ width: getRandomWidth(10, 100) }} />
          <p className='text-transparent bg-[#898989]/10 select-none shrink-0 hidden lg:block ml-auto'>08-22-2024 07:20 PM</p>
        </li>
      ))}
    </ul>
  )
}
