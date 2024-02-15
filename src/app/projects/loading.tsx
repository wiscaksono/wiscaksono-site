import { ProjectCardSkeleton } from '@/components/molecules/project-card'
import { FadeIn, FadeInStagger, AnimatePresence } from '@/components/atoms/fade-in'

export default function Loading() {
  return (
    <FadeInStagger className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5' faster>
      <AnimatePresence mode='wait'>
        {[...Array(12)].map((_, i) => (
          <FadeIn layout key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProjectCardSkeleton delay={i} />
          </FadeIn>
        ))}
      </AnimatePresence>
    </FadeInStagger>
  )
}
