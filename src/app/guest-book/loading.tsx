export default function Loading() {
  return (
    <div className='space-y-1.5'>
      {[...Array(50)].map((_, i) => (
        <pre className='flex lg:flex-row flex-col items-start gap-x-2 gap-y-1.5 py-2 lg:py-0 animate-pulse' key={i} style={{ animationDelay: `${i * 0.2}s` }}>
          <code className='text-muted-foreground lg:w-36 truncate shrink-0 flex items-center justify-between w-full gap-x-2'>
            <code className='lg:w-full h-4 bg-muted/40 rounded-sm' style={{ width: Math.floor(Math.random() * 100) + 60 }} />
            <code className='shrink-0 bg-muted/40 w-[136px] h-4 lg:hidden rounded-sm' />
          </code>
          <code className='hidden lg:block w-2 h-4 bg-muted/40 rounded-sm' />
          <code className='w-full relative'>
            <code className='h-4 bg-muted/40 rounded-sm absolute left-0 top-0' style={{ width: Math.floor(Math.random() * (100 - 36) + 360) }} />
          </code>
          <code className='w-[160px] h-4 bg-muted/40 rounded-sm shrink-0 lg:block hidden' />
        </pre>
      ))}
    </div>
  )
}
