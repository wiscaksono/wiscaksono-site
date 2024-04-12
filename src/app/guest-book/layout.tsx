import { FaRegEnvelope } from 'react-icons/fa'
import { TbBrandUpwork } from 'react-icons/tb'
import { BsWhatsapp, BsInstagram, BsLinkedin } from 'react-icons/bs'

import { Input } from '@/components/atoms/input'
import { FadeIn } from '@/components/atoms/fade-in'

import { ResizableWrapper, SidebarMenu } from '@/components/organisms/resizable-wrapper'

import { auth } from '@/lib/auth'
import { ENV } from '@/lib/constants'
import { createPost } from '@/lib/actions'
import { generateSEO } from '@/lib/generateSEO'
import { SignInBtn, SendBtn } from './action-buttons'

const title = 'guest-book'
const description =
  'Leave a lasting imprint on my digital canvas! Sign in and share your thoughts, greetings, or anecdotes on my guest-book page. Your messages contribute to the heart and soul of my online community. Connect with us through your words and be a part of the vibrant conversations happening on my website. Your messages matter, so take a moment to make your mark and be heard!'
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/guest-book`
const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

export const metadata = generateSEO(title, description, image, url)

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  const sidebarMenu: SidebarMenu[] = [
    {
      title: 'Email',
      href: 'mailto:wwicaksono96@gmail.com',
      icon: <FaRegEnvelope className='w-4 h-4 shrink-0' />
    },
    {
      title: 'Upwork',
      href: 'https://www.upwork.com/freelancers/~01df34d78e05fa69bf',
      icon: <TbBrandUpwork className='w-4 h-4 shrink-0' />
    },
    {
      title: 'WhatsApp',
      href: 'https://wa.me/+6287885002327',
      icon: <BsWhatsapp className='w-4 h-4 shrink-0' />
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/wiscaksono/',
      icon: <BsLinkedin className='w-4 h-4 shrink-0' />
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/this.wsn/',
      icon: <BsInstagram className='w-4 h-4 shrink-0' />
    }
  ]

  return (
    <ResizableWrapper sidebarTitle='Contacts' sidebarMenu={sidebarMenu}>
      <FadeIn className='p-5 space-y-2'>
        <form action={createPost} className='col-span-full flex items-center justify-between gap-x-2.5'>
          <Input name='desc' id='desc' placeholder='This is really cool!' aria-labelledby='desc' required className='flex-1' />
          {!session ? <SignInBtn /> : <SendBtn />}
        </form>
        {children}
      </FadeIn>
    </ResizableWrapper>
  )
}
