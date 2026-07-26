import Link from 'next/link'
import type { GovProject } from '@/types/government'

export default function GovCard({ project }: { project: GovProject }) {
  return (
    <Link href={`/government/${project.slug}`} className="gcard">
      <div className="gcard__media">
        <div className="gcard__frame">
          <span className="gcard__dept">{project.department}</span>
          <span className="gcard__year">{project.year}</span>
        </div>
        <div className="gcard__tag">{project.tag}</div>
      </div>
      <div className="gcard__body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <span className="gcard__more">Read the case study →</span>
      </div>
    </Link>
  )
}
