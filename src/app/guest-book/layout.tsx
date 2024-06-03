import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Guestbook',
  description:
    'Leave a lasting imprint on my digital canvas! Sign in and share your thoughts, greetings, or anecdotes on my guest-book page. Your messages contribute to the heart and soul of my online community. Connect with us through your words and be a part of the vibrant conversations happening on my website. Your messages matter, so take a moment to make your mark and be heard!'
}

export default function GuestbookLayout({ children }: Readonly<Props>) {
  return children
}
