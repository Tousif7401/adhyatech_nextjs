'use client'

import { useMemo, useState } from 'react'

import ArticleCard from '../components/ArticleCard'
import type { Article, BlogCategory } from '@/types/article'
import { sendNewsletterSubscribe } from "@/lib/newsletter";
import Link from "next/link";

interface Props {
    articles: Article[],
    categories: BlogCategory[];
}

export default function InsightContent({ articles, categories }: Props) {

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await sendNewsletterSubscribe(formData);

            setSubmitted(true);

            setFormData({
                email: ""
            });

        } catch (err) {
            console.error(err);
            alert("Failed to send message.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const articleCategories = useMemo(() => {
        return [
            { id: 0, title: "All" },
            ...categories
        ];
    }, [categories]);

    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    const featured = articles[0]; // or featured flag

    const nonFeatured = articles;

    const filtered = useMemo(() => {
        if (!activeCategory) return nonFeatured;

        return nonFeatured.filter(article =>
            article.category_ids?.includes(activeCategory.toString())
        );
    }, [activeCategory, nonFeatured]);

    return (
        <section className="insights-section">
            <div className="container">
                {/* Featured */}

                <Link
                    href={`/insights/${featured.slug}`}
                    className="insights-featured"
                >
                    <div className={featured.image ? "" : "insights-featured__media"}>
                        {featured.image && (
                            <img
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${featured.image}`}
                                alt={featured.heading}
                                style={{ maxWidth: "450px", width: "100%" }}
                            />
                        )}
                        {/* <div className="insights-featured__icon">
                            {categories.find(c =>
                                featured.category_ids?.includes(c.id.toString())
                            )?.title ?? "General"}
                        </div> */}

                        <span className="insights-card__category-badge">
                            {categories.find(c =>
                                featured.category_ids?.includes(c.id.toString())
                            )?.title ?? "General"}
                        </span>
                    </div>


                    <div className="insights-featured__body">

                        <div className="insights-card__meta">
                            {new Date(featured.publish_date ?? "").toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            )}

                            {" · "}

                            {Math.max(
                                1,
                                Math.ceil(
                                    (
                                        featured.content
                                            ?.replace(/<[^>]+>/g, "")
                                            .split(/\s+/)
                                            .length || 0
                                    ) / 200
                                )
                            )} min read
                        </div>

                        <h1>
                            {featured.heading}{" "}
                            {featured.sub_heading && (
                                <em
                                    style={{
                                        fontFamily: "var(--f-serif)",
                                        fontStyle: "italic",
                                        fontWeight: 400,
                                    }}
                                >
                                    {featured.sub_heading}
                                </em>
                            )}
                        </h1>

                        <p>
                            {featured.description}
                        </p>

                        <div className="insights-featured__author">

                            <div className="insights-card__author-avatar">
                                VR
                            </div>

                            <div>
                                <strong>
                                    Vijay Reddy
                                </strong>

                                <small>
                                    Founder · Adyatech
                                </small>
                            </div>

                        </div>

                    </div>
                </Link>

                <div className="industries__head" style={{ marginBottom: 40 }}>
                    <span className="eyebrow">
                        All articles · {articles.length.toString().padStart(2, '0')}
                    </span>

                    <h2 className="section-title">
                        Browse by <em>topic</em>.
                    </h2>
                </div>

                <div className="insights-filter">
                    {articleCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={
                                activeCategory === cat.id
                                    ? "is-active"
                                    : ""
                            }
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <p
                        style={{
                            textAlign: 'center',
                            color: 'rgba(245,242,234,0.5)',
                            padding: '60px 0',
                        }}
                    >
                        No articles in this category yet.
                    </p>
                ) : (
                    <div className="insights-grid">
                        {filtered.map((a) => (
                            <ArticleCard key={a.slug} article={a} categories={categories} />
                        ))}
                    </div>
                )}

                <div className="insights-newsletter">
                    <div className="insights-newsletter__copy">
                        <h3>
                            Quiet, occasional <em>essays</em>.
                        </h3>

                        <p>
                            Once a fortnight. No marketing, no pitches...
                        </p>
                    </div>


                    {submitted ? (
                        <p className="footer__newsletter-success">
                            🎉 Thank you for subscribing! We'll keep you updated.
                        </p>
                    ) : (
                        <form className="footer__newsletter" onSubmit={handleNewsletter}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                required
                            />
                            <button type="submit">Subscribe →</button>
                        </form>
                    )}

                </div>
            </div>
        </section>
    )
}