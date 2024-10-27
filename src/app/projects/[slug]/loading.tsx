import { Loading as LoadingIcon } from '@/components/icons'

export default function Loading() {
  return (
    <div className='lg:h-[calc(100%-28px)] h-[calc(100%-35px)] grid place-items-center'>
      <LoadingIcon className='animate-spin size-5' />
    </div>
  )
}
