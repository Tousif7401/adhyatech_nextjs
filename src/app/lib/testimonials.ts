export type TestimonialType = 'text' | 'video' | 'google'

export type Testimonial = {
  type: TestimonialType
  quote?: string
  rating?: number  // 1-5
  authorName: string
  authorRole: string
  authorInitials: string
  videoDuration?: string
  videoTone?: 'gold' | 'slate' | 'cream' | 'charcoal' | 'teal'
  span2?: boolean
  category?: string
}

export const testimonials: Testimonial[] = [
  // Featured longer text testimonials (span 2 cols)
  {
    type: 'text',
    quote: 'We had data for years, but no actionable signal. Adyatech built us a system that doesn\'t just predict — it tells us why. That changed how our entire RM team works. The team\'s sensible, senior, and ships when they say they will.',
    rating: 5,
    authorName: 'Suresh Krishnamurthy',
    authorRole: 'Chief Data Officer · Civic Bank',
    authorInitials: 'SK',
    span2: true,
    category: 'AI',
  },
  {
    type: 'video',
    authorName: 'Dr. Padma Reddy',
    authorRole: 'Registrar · Bharatiya University',
    authorInitials: 'PR',
    videoDuration: '2:18',
    videoTone: 'gold',
    category: 'SaaS',
    quote: 'On migrating 12,847 alumni records into Alumnyo.',
  },
  // Single-column cards
  {
    type: 'text',
    quote: 'Their pricing is honest and their timeline is honest. After a decade of working with agencies, that combination is rare.',
    rating: 5,
    authorName: 'Anil Verma',
    authorRole: 'Founder · Foodaroo',
    authorInitials: 'AV',
    category: 'Web',
  },
  {
    type: 'google',
    quote: 'Outstanding team. They redesigned our college website end-to-end and our admission applications tripled within a semester. Vijay personally checks in.',
    rating: 5,
    authorName: 'Pragati College',
    authorRole: 'Verified Google Review · April 2025',
    authorInitials: 'PC',
    category: 'Web',
  },
  {
    type: 'text',
    quote: 'The Osciva team rebuilt our contract review pipeline from scratch in 12 weeks. We\'re now processing 4,000 contracts a day with the same headcount.',
    rating: 5,
    authorName: 'Anita Nair',
    authorRole: 'Managing Partner · Northwind Legal',
    authorInitials: 'AN',
    category: 'AI',
  },
  {
    type: 'video',
    authorName: 'Karan Mehta',
    authorRole: 'COO · Helio Health',
    authorInitials: 'KM',
    videoDuration: '1:42',
    videoTone: 'teal',
    category: 'AI',
    quote: 'On deploying voice AI across 4 hospitals.',
  },
  {
    type: 'google',
    quote: 'Hired them for a Joomla migration. They delivered it 2 weeks ahead of schedule. Communication was excellent throughout. Five stars without hesitation.',
    rating: 5,
    authorName: 'Logiwave India',
    authorRole: 'Verified Google Review · Feb 2025',
    authorInitials: 'LI',
    category: 'Web',
  },
  {
    type: 'text',
    quote: 'A senior team that actually picks up the phone. We\'ve worked with three other agencies before Adyatech — none came close to this.',
    rating: 5,
    authorName: 'Sanjay Pillai',
    authorRole: 'CTO · LendLift Capital',
    authorInitials: 'SP',
    category: 'Software',
  },
  {
    type: 'text',
    quote: 'They turned down work that didn\'t fit, which surprised me. Then they over-delivered on the work they accepted. Refreshing.',
    rating: 5,
    authorName: 'Meena Joshi',
    authorRole: 'Founder · MedSync Clinics',
    authorInitials: 'MJ',
    span2: true,
    category: 'Software',
  },
  {
    type: 'video',
    authorName: 'Rohit Bhandari',
    authorRole: 'CEO · Vortek Industries',
    authorInitials: 'RB',
    videoDuration: '3:04',
    videoTone: 'charcoal',
    category: 'Mobile',
    quote: 'On building a field-ops app used by 1,200 technicians.',
  },
  {
    type: 'google',
    quote: 'I rarely leave reviews. Adyatech earned this one. They delivered our ERP in 16 weeks — the previous vendor had spent 9 months and shipped nothing usable.',
    rating: 5,
    authorName: 'Logiwave India',
    authorRole: 'Verified Google Review · Dec 2024',
    authorInitials: 'LV',
    category: 'Software',
  },
  {
    type: 'text',
    quote: 'They demoed working software in our second meeting. By month three we were live with users. That pace is unusual in this industry.',
    rating: 5,
    authorName: 'Vikram Shetty',
    authorRole: 'Director · Karnataka State e-Gov',
    authorInitials: 'VS',
    category: 'Government',
  },
]

export const testiCategories = ['All', 'Text', 'Video', 'Google reviews'] as const
