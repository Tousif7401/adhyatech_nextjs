import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductWhat({ product }: Props) {
    return (
        <section className="pd-what">
            <div className="container">

                <div className="pd-what__inner">

                    <div className="pd-what__label">
                        What it is
                    </div>

                    <div className="pd-what__body">

                        <p>
                            {product.short_description}
                        </p>

                        {product.description && (
                            <p>
                                {product.description}
                            </p>
                        )}

                        <p>
                            <strong>Built by Adyatech.</strong>{" "}
                            This is an in-house product that is continuously
                            improved based on real customer feedback and
                            production experience.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}
