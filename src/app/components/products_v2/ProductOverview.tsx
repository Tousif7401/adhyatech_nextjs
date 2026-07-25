import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductOverview({ product }: Props) {
    return (
        <section className="product-overview theme-light">

            <div className="container">

                <div className="product-overview__grid">

                    {/* Left */}

                    <div>

                        <span className="eyebrow">
                            PRODUCT OVERVIEW
                        </span>

                        <h2 className="section-title">
                            About <em>{product.name}</em>
                        </h2>

                    </div>

                    {/* Right */}

                    <div>

                        <p className="product-overview__description">
                            {product.description}
                        </p>

                        {!!product.tech_stack?.length && (

                            <>
                                <h4 className="product-overview__heading">
                                    Technology Stack
                                </h4>

                                <div className="product-overview__stack">

                                    {product.tech_stack.map((tech) => (
                                        <span key={tech}>
                                            {tech}
                                        </span>
                                    ))}

                                </div>
                            </>

                        )}

                        {!!product.stats?.length && (

                            <div className="product-overview__stats">

                                {product.stats.map((item) => (

                                    <div
                                        className="product-overview__stat"
                                        key={item.label}
                                    >

                                        <strong>
                                            {item.number}
                                        </strong>

                                        <span>
                                            {item.label}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        )}

                        <div className="product-overview__links">

                            {product.website && (

                                <Link
                                    href={product.website}
                                    target="_blank"
                                    className="btn btn--slate"
                                >
                                    Visit Website
                                </Link>

                            )}

                            {product.demo_url && (

                                <Link
                                    href={product.demo_url}
                                    target="_blank"
                                    className="btn btn--ghost-l"
                                >
                                    Live Demo
                                </Link>

                            )}

                            {product.github_url && (

                                <Link
                                    href={product.github_url}
                                    target="_blank"
                                    className="btn btn--ghost-l"
                                >
                                    GitHub
                                </Link>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}