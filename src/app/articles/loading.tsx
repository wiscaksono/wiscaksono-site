export default function Loader() {
  return (
    <div className='grid gap-2 lg:grid-cols-2'>
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className='flex flex-col gap-y-2 border border-[#898989]/20 p-2 md:gap-y-2.5 lg:gap-y-5'
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: `${index * 150}ms`
          }}
        >
          {/* Title */}
          <div className='h-7 md:h-8 lg:h-9 w-4/5 rounded bg-[#898989]/20' />

          {/* Summary - 4 lines */}
          <div className='flex-1 space-y-2'>
            <div className='h-4 w-full rounded bg-[#898989]/20' />
            <div className='h-4 w-11/12 rounded bg-[#898989]/20' />
            <div className='h-4 w-4/5 rounded bg-[#898989]/20' />
            <div className='h-4 w-2/3 rounded bg-[#898989]/20' />
          </div>

          {/* Footer */}
          <div className='flex flex-wrap items-center justify-between gap-2 text-sm'>
            {/* Published date */}
            <div className='h-5 w-36 rounded bg-[#898989]/20' />

            {/* Read more button */}
            <div className='h-6 w-24 rounded bg-[#898989]/20' />
          </div>
        </div>
      ))}
    </div>
  )
}
