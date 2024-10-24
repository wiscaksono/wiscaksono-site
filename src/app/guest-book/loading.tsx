export default function Loader() {
  const getRandomWidth = (min: number, max: number) => {
    return `${Math.floor(Math.random() * (max - min + 1) + min)}%`
  }

  return (
    <ul className='flex flex-col gap-y-2 divide-y divide-[#898989]/20 text-sm lg:divide-y-0'>
      {[...Array(50)].map((_, index) => (
        <li
          key={index}
          className='flex flex-col gap-1 py-1 lg:flex-row lg:gap-2 lg:border-y-0 lg:py-0 items-center'
          style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: `${index * 100}ms` }}
        >
          <div className='flex-1 truncate lg:w-36 lg:flex-none'>
            <div className='h-5 w-full rounded bg-[#898989]/30' />
          </div>
          <div className='block lg:hidden'>
            <div className='h-5 w-full rounded bg-[#898989]/30' />
          </div>
          <p className='hidden lg:block text-muted-foreground'>:</p>
          <div className='hidden flex-1 lg:block'>
            <div
              className='h-5 rounded bg-[#898989]/30'
              style={{
                width: getRandomWidth(10, 100)
              }}
            />
          </div>
          <div className='hidden lg:block relative'>
            <p className='text-transparent bg-[#898989]/30 rounded'>08-22-2024 07:20 PM</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
