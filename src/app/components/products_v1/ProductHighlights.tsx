import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductHighlights({ product }: Props) {
    if (!product.features?.length) return null;

    return (
        <section className="pd-highlights">
            <div className="container">

                <div className="pd-highlights__head">

                    <div className="pd-highlights__eyebrow">
                        What it does
                    </div>

                    <h2 className="pd-highlights__title">
                        The three things that <em>matter.</em>
                    </h2>

                </div>

                <div className="pd-highlights__grid">

                    {product.features.slice(0, 3).map((feature, index) => (

                        <div
                            className="pd-hi"
                            key={index}
                        >

                            <div className="pd-hi__num">
                                {(index + 1)
                                    .toString()
                                    .padStart(2, "0")}
                            </div>

                            <h3>
                                {feature.title}
                            </h3>

                            <p>
                                {feature.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}