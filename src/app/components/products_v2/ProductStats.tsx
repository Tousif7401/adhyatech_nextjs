import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductStats({
    product,
}: Props) {

    if (!product.stats?.length) return null;

    return (

        <section className="product-stats theme-dark">

            <div className="container">

                <div className="product-stats__head">

                    <span className="eyebrow">
                        IMPACT
                    </span>

                    <h2 className="section-title">
                        Built for <em>real results.</em>
                    </h2>

                </div>

                <div className="product-stats__grid">

                    {product.stats.map((item, index) => (

                        <div
                            key={index}
                            className="stat-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
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

            </div>

        </section>

    );

}