import Link from "next/link";

import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductCTA({ product }: Props) {
    return (
        <section
            className="pd-cta"
            id="contact"
        >
            <div className="container">

                <div className="pd-cta__inner">

                    <h2 className="pd-cta__title">
                        See it in action, or{" "}
                        <em>build something like it.</em>
                    </h2>

                    <p className="pd-cta__lede">
                        {product.name} is continuously evolving as an
                        Adyatech in-house product. Whether you want to
                        explore it or you're thinking about building a
                        similar platform for your organization, we'd love
                        to talk.
                    </p>

                    <div className="pd-cta__actions">

                        {product.website && (
                            <Link
                                href={product.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--red"
                            >
                                {product.cta_text}
                                <span className="arrow"> ↗</span>
                            </Link>
                        )}

                        <Link
                            href="/contact"
                            className="btn btn--black"
                        >
                            Talk to Adyatech
                        </Link>

                    </div>

                </div>

            </div>
        </section>
    );
}