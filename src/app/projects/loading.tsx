export default function Loading() {
  return (
    <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {[...Array(16)].map((_, i) => (
        <div key={i} className='divide-y divide-[#898989]/10 overflow-hidden border border-[#898989]/20'>
          <div className='group aspect-video bg-[#1F1F20] animate-pulse' />
          <div className='p-2 space-y-1 h-[97px]'>
            <div className='h-3 w-full bg-[#898989]/10 animate-pulse' />
            <div className='h-3 w-full bg-[#898989]/10 animate-pulse' />
            <div className='h-3 w-full bg-[#898989]/10 animate-pulse' />
            <div className='h-3 w-full bg-[#898989]/10 animate-pulse' />
            <div className='h-3 w-full bg-[#898989]/10 animate-pulse' />
          </div>
        </div>
      ))}
    </div>
  )
}
