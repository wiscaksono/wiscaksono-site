import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { getContents } from '@/lib/contents'

interface Props {
  searchParams: Promise<{
    tag?: string
  }>
}

export default async function Projects({ searchParams }: Props) {
  const { tag } = await searchParams
  const projects = tag ? getContents('projects').filter(project => project.metadata.technology?.includes(tag)) : getContents('projects')

  return (
    <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {projects.map(project => (
        <Link href={`/projects/${project.slug}`} key={project.slug} className='divide-y divide-[#898989]/20 overflow-hidden border border-[#898989]/20'>
          <figure className='group relative aspect-video'>
            <Image
              src={project.metadata.image!}
              alt={project.metadata.title}
              quality={10}
              fill
              sizes='100%'
              className='object-cover object-center grayscale-[50%] transition-all duration-500 group-hover:grayscale-0'
              priority
            />
            <div className='absolute left-0 top-0 grid h-full w-full place-items-center bg-[#080808]/90 transition-opacity duration-500 group-hover:opacity-0'>
              <p className='text-center text-3xl font-semibold uppercase'>{project.metadata.title}</p>
            </div>
            <div
              className='absolute left-0 top-0 h-full w-full opacity-[2%] group-hover:opacity-0'
              style={{
                backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
                backgroundRepeat: 'repeat'
              }}
            />
          </figure>
          <div className='p-2'>
            <p className='line-clamp-4 text-sm'>{project.metadata.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
