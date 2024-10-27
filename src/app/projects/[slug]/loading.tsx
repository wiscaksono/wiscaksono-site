import { Loading } from '@/components/icons'

export default function Loader() {
  return (
    <div className='lg:h-[calc(100%-28px)] h-[calc(100%-35px)] grid place-items-center'>
      <Loading className='animate-spin size-5' />
    </div>
  )
}
