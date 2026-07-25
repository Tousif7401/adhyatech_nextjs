export type BlogCategory = {
    id:number;
    title:string;
}

export type Article = {
  id: number

  slug: string

  heading: string
  sub_heading?: string

  description?: string
  content: string

  category_ids?: string[]
  categories?: BlogCategory[]

  image?: string

  publish_date?: string

  keywords?: string

  meta_title?: string
  meta_description?: string

  og_title?: string
  og_description?: string

  robots?: string

  head_html?: string

  views: number
  shares: number

  status: boolean
  trash: boolean

  created_at: string
  updated_at: string
}