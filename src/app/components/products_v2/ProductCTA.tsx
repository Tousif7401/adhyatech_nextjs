import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductCTA({
    product,
}: Props) {

    return (

        <section className="product-cta">

            <div className="container">

                <div className="product-cta__box">

                    <span className="eyebrow">
                        READY TO GET STARTED?
                    </span>

                    <h2>

                        Let's build something amazing with{" "}
                        <em>{product.name}</em>

                    </h2>

                    <p>

                        Whether you're looking to streamline operations,
                        improve engagement, or launch something new,
                        our team is ready to help.

                    </p>

                    <div className="product-cta__actions">

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
                                Book Demo
                            </Link>

                        )}

                        <Link
                            href="/#contact"
                            className="btn btn--ghost-d"
                        >
                            Contact Us
                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}