import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface Props {
    product: Product;
}

export default function ProductHero({ product }: Props) {
    const launchYear =
        product.launch_year ??
        new Date(product.created_at).getFullYear();

    const category =
        product.category ??
        "Software";

    return (
        <section className="pd-hero">
            <div className="container">
                <div className="pd-hero__inner">

                    {/* LEFT */}
                    <div className="pd-hero__lead">

                        <div className="pd-hero__crumbs">
                            <Link href="/">Adyatech</Link>

                            <span className="sep">/</span>

                            <Link href="/products">
                                Products
                            </Link>

                            <span className="sep">/</span>

                            <span>{product.name}</span>
                        </div>

                        <div className="pd-hero__badge">
                            <span className="dot"></span>

                            {product.publish_status} · An Adyatech in-house product
                        </div>

                        <h1>
                            {product.name}.
                            <br />

                            {product.subtitle && (
                                <em>{product.subtitle}</em>
                            )}
                        </h1>

                        <p className="pd-hero__lede">
                            {product.short_description}
                        </p>

                        <div className="pd-hero__actions">

                            {product.website && (
                                <Link
                                    href={product.website}
                                    target="_blank"
                                    className="btn btn--red"
                                >
                                    {product.cta_text}
                                    <span className="arrow">↗</span>
                                </Link>
                            )}

                            <Link
                                href="/contact"
                                className="btn btn--ghost-d"
                            >
                                Talk to Adyatech
                            </Link>

                        </div>

                        <div className="pd-hero__meta">

                            <span>
                                <strong>Launched</strong>{" "}
                                {launchYear}
                            </span>

                            <span>
                                <strong>Category</strong>{" "}
                                {category}
                            </span>

                            <span>
                                <strong>Status</strong>{" "}
                                {product.publish_status}
                            </span>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="pd-hero__visual">

                        {product.banner ? (

                            <Image
                                src={`${storageUrl}/${product.banner}`}
                                alt={product.name}
                                fill
                                priority
                                className="pd-hero__image"
                            />

                        ) : product.logo ? (

                            <Image
                                src={`${storageUrl}/${product.logo}`}
                                alt={product.name}
                                fill
                                priority
                                className="pd-hero__image"
                            />

                        ) : (

                            <div className="pd-hero__visual-placeholder">
                                Product logo lockup or hero mockup
                                <br />
                                (recommended: 1200×960 or 5:4 aspect)
                            </div>

                        )}

                    </div>

                </div>
            </div>
        </section>
    );
}