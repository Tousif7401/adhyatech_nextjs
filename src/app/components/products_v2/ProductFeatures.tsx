import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductFeatures({
    product,
}: Props) {

    if (!product.features?.length) return null;

    return (

        <section className="product-features theme-dark">

            <div className="container">

                <div className="product-features__head">

                    <div>

                        <span className="eyebrow">
                            FEATURES
                        </span>

                        <h2 className="section-title">
                            Everything your <em>team needs.</em>
                        </h2>

                    </div>

                    <p className="lede">

                        Powerful tools designed to simplify workflows,
                        improve productivity and deliver better results.

                    </p>

                </div>

                <div className="product-features__grid">

                    {product.features.map((feature, index) => (

                        <article
                            key={index}
                            className="feature-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >

                            <div className="feature-card__icon">

                                {feature.icon ? (
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                    />
                                ) : (
                                    <span>
                                        {(index + 1)
                                            .toString()
                                            .padStart(2, "0")}
                                    </span>
                                )}

                            </div>

                            <h3>

                                {feature.title}

                            </h3>

                            <p>

                                {feature.description}

                            </p>

                        </article>

                    ))}

                </div>

            </div>

        </section>

    );

}