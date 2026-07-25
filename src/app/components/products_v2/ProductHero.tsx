import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface Props {
    product: Product;
}

export default function ProductHero({
    product,
}: Props) {
    return (
        <section className="product-hero">

            <div className="container">

                <div className="product-hero__grid">

                    {/* LEFT */}

                    <div className="product-hero__content">

                        <span
                            className={`product-hero__status is-${product.publish_status
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                        >
                            {product.publish_status}
                        </span>

                        {product.logo && (
                            <div className="product-hero__logo">

                                <Image
                                    src={`${storageUrl}/${product.logo}`}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                />

                            </div>
                        )}

                        <h1 className="product-hero__title">
                            {product.name}
                        </h1>

                        {product.subtitle && (
                            <h2 className="product-hero__subtitle">
                                {product.subtitle}
                            </h2>
                        )}

                        <p className="product-hero__description">
                            {product.short_description}
                        </p>

                        {!!product.tags?.length && (

                            <div className="product-hero__tags">

                                {product.tags.map((tag) => (

                                    <span
                                        key={tag}
                                        className="product-tag"
                                    >
                                        {tag}
                                    </span>

                                ))}

                            </div>

                        )}

                        <div className="product-hero__actions">

                            {product.website && (

                                <Link
                                    href={product.website}
                                    target="_blank"
                                    className="btn btn--red"
                                >
                                    {product.cta_text}
                                </Link>

                            )}

                            {product.demo_url && (

                                <Link
                                    href={product.demo_url}
                                    target="_blank"
                                    className="btn btn--ghost-d"
                                >
                                    Request Demo
                                </Link>

                            )}

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="product-hero__visual">

                        {product.banner ? (

                            <Image
                                src={`${storageUrl}/${product.banner}`}
                                alt={product.name}
                                fill
                                priority
                                className="product-hero__image"
                            />

                        ) : (

                            <div className="product-placeholder">
                                No Banner
                            </div>

                        )}

                    </div>

                </div>

            </div>

        </section>
    );
}