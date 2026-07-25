"use client";

import { useMemo, useState } from "react";
import { Testimonial } from "@/types/testimonial";

interface TestimonialsClientProps {
    testimonials: Testimonial[];
}

function getYoutubeEmbedUrl(url: string) {
    try {
        const parsed = new URL(url);

        // Already an embed URL
        if (parsed.pathname.startsWith("/embed/")) {
            return `${parsed.origin}${parsed.pathname}?autoplay=1`;
        }

        // Normal YouTube video
        if (parsed.pathname === "/watch") {
            const id = parsed.searchParams.get("v");
            if (id) {
                return `https://www.youtube.com/embed/${id}?autoplay=1`;
            }
        }

        // YouTube Shorts
        if (parsed.pathname.startsWith("/shorts/")) {
            const id = parsed.pathname.split("/")[2];
            return `https://www.youtube.com/embed/${id}?autoplay=1`;
        }

        // youtu.be short URL
        if (parsed.hostname === "youtu.be") {
            const id = parsed.pathname.slice(1);
            return `https://www.youtube.com/embed/${id}?autoplay=1`;
        }

        return url;
    } catch {
        return url;
    }
}

function Stars({ rating }: { rating?: number }) {
    if (!rating) return null;

    return (
        <div className="testi-card__stars" aria-label={`${rating} out of 5`}>
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
        </div>
    );
}

function Card({
    t,
    onVideoClick,
}: {
    t: Testimonial;
    onVideoClick: (url: string) => void;
}) {
    const className = `testi-card${t.span2 ? " span-2" : ""}`;

    if (t.type === "video") {
        const bg =
            t.video_tone === "gold"
                ? "linear-gradient(135deg, var(--brand-gold), var(--brand-gold-2))"
                : t.video_tone === "teal"
                    ? "linear-gradient(135deg, #1F4E5C, #2D6B7A)"
                    : t.video_tone === "charcoal"
                        ? "linear-gradient(135deg, #2A2F36, #1A1D22)"
                        : "linear-gradient(135deg, var(--brand-slate), var(--brand-slate-3))";

        return (
            <div className={className}>
                <div
                    className="testi-video"
                    style={{ background: bg, cursor: "pointer" }}
                    onClick={() => {
                        if (t.video_url) {
                            onVideoClick(getYoutubeEmbedUrl(t.video_url));
                        }
                    }}
                >                    <div
                    className="testi-video__play"
                    aria-label="Play video"
                ></div>

                    {t.video_duration && (
                        <div className="testi-video__duration">
                            {t.video_duration}
                        </div>
                    )}
                </div>

                <div className="testi-card__type is-video">
                    Video testimonial
                </div>

                {t.quote && (
                    <p
                        className="testi-card__quote"
                        style={{ fontSize: "0.95rem" }}
                    >
                        "{t.quote}"
                    </p>
                )}

                <div className="testi-card__author">
                    <div className="testi-card__avatar">
                        {t.author_initials}
                    </div>

                    <div className="testi-card__author-info">
                        <span className="testi-card__author-name">
                            {t.author_name}
                        </span>

                        <span className="testi-card__author-role">
                            {t.author_role}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (t.type === "google") {
        return (
            <div className={className}>
                <div className="testi-card__type is-google">
                    Google review
                </div>

                <Stars rating={t.rating} />

                <p className="testi-card__quote">"{t.quote}"</p>

                <div className="testi-card__author">
                    <div
                        className="testi-card__avatar"
                        style={{
                            background:
                                "linear-gradient(135deg, #4285F4, #1A57D6)",
                        }}
                    >
                        {t.author_initials}
                    </div>

                    <div className="testi-card__author-info">
                        <span className="testi-card__author-name">
                            {t.author_name}
                        </span>

                        <span className="testi-card__author-role">
                            {t.author_role}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="testi-card__type is-text">
                Client testimonial
            </div>

            <Stars rating={t.rating} />

            <p className="testi-card__quote">"{t.quote}"</p>

            <div className="testi-card__author">
                <div className="testi-card__avatar">
                    {t.author_initials}
                </div>

                <div className="testi-card__author-info">
                    <span className="testi-card__author-name">
                        {t.author_name}
                    </span>

                    <span className="testi-card__author-role">
                        {t.author_role}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function TestimonialsClient({
    testimonials,
}: TestimonialsClientProps) {
    const [filter, setFilter] = useState("All");

    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    // Generate categories dynamically
    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                testimonials
                    .map((t) => t.category)
                    .filter(
                        (category): category is string =>
                            Boolean(category && category.trim())
                    )
            ),
        ];

        return ["All", ...uniqueCategories];
    }, [testimonials]);

    // Count testimonials in each category
    const counts = useMemo(() => {
        const map: Record<string, number> = {
            All: testimonials.length,
        };

        categories.forEach((category) => {
            if (category !== "All") {
                map[category] = testimonials.filter(
                    (t) => t.category === category
                ).length;
            }
        });

        return map;
    }, [categories, testimonials]);

    // Filter testimonials
    const filtered = useMemo(() => {
        if (filter === "All") return testimonials;

        return testimonials.filter((t) => t.category === filter);
    }, [filter, testimonials]);

    // Google reviews count
    const googleTestimonials = testimonials.filter(
        (t) => t.type === "google" && typeof t.rating === "number"
    );

    const googleCount = googleTestimonials.length;

    const averageRating =
        googleCount > 0
            ? (
                googleTestimonials.reduce(
                    (sum, t) => sum + (t.rating ?? 0),
                    0
                ) / googleCount
            ).toFixed(1)
            : "0.0";

    return (
        <section className="testimonials-page-section">
            <div className="container">
                <div className="google-reviews-widget">
                    <div className="google-reviews-widget__logo">
                        <span>G</span>
                    </div>

                    <div className="google-reviews-widget__info">
                        <h3>{averageRating} out of 5</h3>

                        <div className="google-reviews-widget__rating-line">
                            <strong>{averageRating}</strong>

                            <span className="google-reviews-widget__stars">
                                {"★".repeat(Math.round(Number(averageRating)))}
                                {"☆".repeat(5 - Math.round(Number(averageRating)))}
                            </span>

                            <span>
                                · Based on {googleCount} Google review{googleCount !== 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>

                    <a
                        href="https://www.google.com/maps/place/Adyatech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="google-reviews-widget__cta"
                    >
                        See all reviews →
                    </a>
                </div>

                {/* Filters */}
                <div className="testi-filter">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={filter === category ? "is-active" : ""}
                            onClick={() => setFilter(category)}
                        >
                            {category}

                            <span
                                style={{
                                    opacity: 0.6,
                                    marginLeft: 4,
                                }}
                            >
                                ({counts[category] || 0})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="testi-mix-grid">
                    {filtered.length > 0 ? (
                        filtered.map((testimonial) => (
                            <Card
                                key={testimonial.id}
                                t={testimonial}
                                onVideoClick={setSelectedVideo}
                            />
                        ))
                    ) : (
                        <p>No testimonials found.</p>
                    )}
                </div>

                {selectedVideo && (
                    <div
                        className="video-modal"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <div
                            className="video-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="video-close"
                                onClick={() => setSelectedVideo(null)}
                            >
                                ✕
                            </button>

                            <iframe
                                src={selectedVideo}
                                title="Video Testimonial"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}