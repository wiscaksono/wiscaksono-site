import { getRandomWidth } from '@/lib/utils'

export default function Loading() {
  return (
    <div className='grid gap-2 lg:grid-cols-2'>
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className='flex flex-col gap-y-2 border border-[#898989]/10 p-2 md:gap-y-2.5 lg:gap-y-5'
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: `${index * 150}ms`
          }}
        >
          <div className='h-7 md:h-8 lg:h-9 w-4/5 bg-[#898989]/10' />
          <div className='flex-1 space-y-2'>
            <div className='h-4 bg-[#898989]/10' style={{ width: getRandomWidth(90, 100) }} />
            <div className='h-4 bg-[#898989]/10' style={{ width: getRandomWidth(95, 100) }} />
            <div className='h-4 bg-[#898989]/10' style={{ width: getRandomWidth(95, 100) }} />
            <div className='h-4 bg-[#898989]/10' style={{ width: getRandomWidth(70, 100) }} />
          </div>
          <div className='flex flex-wrap items-center justify-between gap-2 text-sm'>
            <div className='h-5 w-36 bg-[#898989]/10' />
            <div className='h-6 w-24 bg-[#898989]/10' />
          </div>
        </div>
      ))}
    </div>
  )
}
