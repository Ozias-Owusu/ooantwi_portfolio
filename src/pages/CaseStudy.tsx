import { Navigate, useParams } from 'react-router-dom'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import { getProjectBySlug } from '@/data/projects'

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return <Navigate to="/404" replace />
  }

  return <CaseStudyLayout project={project} />
}
