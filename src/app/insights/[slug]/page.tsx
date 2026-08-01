import { notFound } from 'next/navigation'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import ArticleCard from '../../components/ArticleCard'
import Link from "next/link";
import type { Metadata } from "next";

import { getBlogCategories, getArticles, getArticle, getRelatedArticles } from "@/lib/articles";

// 👇 Add this
// export async function generateStaticParams() {
//   const articles = await getArticles();

//   return articles.map((article) => ({
//     slug: article.slug,
//   }));
// }

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const meta_article = await getArticle(slug);

  if (!meta_article) {
    return {
      title: "Article not found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title:
      meta_article.meta_title ||
      meta_article.heading,

    description:
      meta_article.meta_description ||
      meta_article.description,

    keywords: meta_article.keywords
      ? meta_article.keywords.split(",")
      : undefined,

    robots: meta_article.robots || undefined,

    openGraph: {
      title:
        meta_article.og_title ||
        meta_article.meta_title ||
        meta_article.heading,

      description:
        meta_article.og_description ||
        meta_article.meta_description ||
        meta_article.description,

      images: meta_article.image
        ? [`${storageUrl}/${meta_article.image}`]
        : [],
    },

    other: meta_article.head_html
      ? {
        head_html: meta_article.head_html,
      }
      : undefined,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const categories = await getBlogCategories();

  const article = await getArticle(params.slug)
  if (!article) notFound()

  const related = await getRelatedArticles(params.slug);

  const readMinutes = Math.max(
    1,
    Math.ceil(
      (
        article.content
          ?.replace(/<[^>]+>/g, "")
          .split(/\s+/).length || 0
      ) / 200
    )
  );

  const shareUrl = `https://adyatech.com/insights/${article.slug}`

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <article>
          <section className="article-hero">
            <div className="container">
              <div className="article-hero__inner">
                <div className="article-hero__breadcrumb">
                  <Link href="/">Home</Link><span className="sep">/</span>
                  <Link href="/insights">Insights</Link><span className="sep">/</span>
                  <span>{article.slug}</span>
                </div>
                <span className="article-hero__category">
                  {categories.find(c =>
                    article.category_ids?.includes(c.id.toString())
                  )?.title ?? "General"}
                </span>
                <h1>
                  {article.heading}

                  {article.sub_heading && (
                    <em
                      style={{
                        fontFamily: "var(--f-serif)",
                        fontStyle: "italic",
                        fontWeight: 400,
                      }}
                    >
                      {article.sub_heading}
                    </em>
                  )}
                </h1>
                <p className="article-hero__excerpt">{article.description}</p>
                <div className="article-hero__meta">
                  <div className="article-hero__author">
                    <div className="article-hero__author-avatar">AT</div>
                    <div className="article-hero__author-info">
                      <strong>Adyatech Team</strong>
                      <span></span>
                    </div>
                  </div>
                  <div className="article-hero__meta-divider"></div>
                  <div className="article-hero__date-read">
                    <strong>
                      {
                        new Date(article.publish_date ?? "").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      }
                    </strong>
                    <span>{readMinutes} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="article-cover">
            <div className="container">
              <div className={article.image ? "" : "article-cover__inner is-gold"}>
                {article.image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${article.image}`}
                    alt={article.heading}
                    style={{
                      width: "100%",
                      maxHeight: "600px",
                      objectFit: "contain",
                    }}
                  />
                )}
                {/* <div className="article-cover__icon">
                  {categories.find(c =>
                    article.category_ids?.includes(c.id.toString())
                  )?.title ?? "General"}
                </div> */}
              </div>
            </div>
          </section>

          <section className="article-body">
            <div className="container">
              <div className="article-body__inner">

                <aside className="article-toc" aria-label="Table of contents">
                  <div className="article-toc__heading">In this article</div>
                  <ul>
                    {/* {article.toc?.map(item => (
                      <li key={item.id}>
                        <Link href={`#${item.id}`}>{item.label}</Link>
                      </li>
                    )) || (
                        <li><Link href="#top" className="is-active">Top of article</Link></li>
                      )} */}
                    <li><Link href="#top" className="is-active">Top of article</Link></li>
                  </ul>
                </aside>

                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <aside className="article-share">
                  <div className="article-share__label">Share</div>
                  <div className="article-share__btns">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.heading + ' ' + (article.sub_heading || ''))}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="article-share__btn"
                      aria-label="Share on X"
                      title="Share on X"
                    >X</a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="article-share__btn"
                      aria-label="Share on LinkedIn"
                      title="Share on LinkedIn"
                    >In</a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(article.heading + ' ' + shareUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="article-share__btn"
                      aria-label="Share on WhatsApp"
                      title="Share on WhatsApp"
                    >Wa</a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(article.heading + ' ' + (article.sub_heading || ''))}&body=${encodeURIComponent('Thought you might find this useful: ' + shareUrl)}`}
                      className="article-share__btn"
                      aria-label="Share via Email"
                      title="Share via Email"
                    >@</a>
                  </div>
                </aside>

              </div>

              <div className="article-bio">
                <div className="article-bio__avatar">AT</div>
                <div className="article-bio__info">
                  <h4>Adyatech Team</h4>
                  {/* <div className="role">CEO</div> */}
                  <p>Adyatech</p>
                </div>
              </div>
            </div>
          </section>
        </article>

        {related.length > 0 && (
          <section className="article-related">
            <div className="container">
              <div className="article-related__head">
                <span className="eyebrow">Continue reading · 03</span>
                <h2>More <em>field notes</em>.</h2>
              </div>
              <div className="insights-grid">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} categories={categories} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <Link href="/insights" className="btn btn--ghost-d">← All articles</Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <a href="/contact" className="fab">Let's talk →</a>
    </>
  )
}
