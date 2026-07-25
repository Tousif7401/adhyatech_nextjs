import Link from "next/link";

import { Product } from "@/types/product";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface Props {

    currentSlug: string;

    products: Product[];

}

export default function RelatedProducts({

    currentSlug,

    products,

}: Props) {

    const related = products

        .filter(p => p.slug !== currentSlug)

        .slice(0, 3);

    if (!related.length) return null;

    return (
        <section className="products theme-light">
            <div className="container">
                <div className="products__head">
                    <div>
                        <span className="eyebrow">
                            MORE PRODUCTS
                        </span>
                        <h2 className="section-title">
                            Explore <em>our products.</em>
                        </h2>
                    </div>
                </div>
                <div className="products__grid">
                    {related.map((product, index) => (

                        <article
                            key={product.id}
                            className="product"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <span
                                className={`product__status ${product.publish_status === "Live" ? "is-live" : ""
                                    }`}
                            >
                                {product.publish_status}
                            </span>

                            <div
                                className="product__icon"
                                style={
                                    product.logo
                                        ? {
                                            backgroundImage: `url(${storageUrl + '/' + product.logo})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }
                                        : {}
                                }
                            >
                                {!product.logo &&
                                    product.name
                                        .split(" ")
                                        .map((w) => w[0])
                                        .join("")
                                        .slice(0, 2)}
                            </div>

                            <h3>{product.name}</h3>

                            <p>{product.short_description}</p>

                            <ul className="product__tags">
                                {product.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>

                            <div className="product__actions">
                                {/* Details Page */}
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="product__cta"
                                >
                                    Read More →
                                </Link>

                                {/* External CTA */}
                                {product.cta_url && (
                                    <Link
                                        href={product.cta_url}
                                        className="product__cta product__cta--secondary"
                                        target={product.cta_url.startsWith("http") ? "_blank" : undefined}
                                        rel={product.cta_url.startsWith("http") ? "noopener noreferrer" : undefined}
                                    >
                                        <span className="product__cta-text">{product.cta_text}</span>
                                        <span className="product__cta-arrow">↗</span>
                                    </Link>
                                )}
                            </div>
                        </article>

                    ))}
                </div>
            </div>
        </section>
    );

}