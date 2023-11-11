import { Loader2 } from 'lucide-react'

export const PageLoading = () => {
  return (
    <div className='flex-1 flex items-center justify-center'>
      <Loader2 className='w-10 h-10 animate-spin text-muted-foreground' />
    </div>
  )
}
