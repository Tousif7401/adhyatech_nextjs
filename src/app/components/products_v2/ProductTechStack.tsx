import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductTechStack({
    product,
}: Props) {

    if (!product.tech_stack?.length) return null;

    return (

        <section className="product-tech theme-light">

            <div className="container">

                <div className="product-tech__head">

                    <div>

                        <span className="eyebrow">
                            TECHNOLOGY
                        </span>

                        <h2 className="section-title">
                            Built with <em>modern technologies.</em>
                        </h2>

                    </div>

                    <p className="lede">

                        Reliable technologies chosen for
                        performance, scalability and long-term
                        maintainability.

                    </p>

                </div>

                <div className="product-tech__grid">

                    {product.tech_stack.map((tech, index) => (

                        <div
                            key={tech}
                            className="tech-card"
                            data-aos="zoom-in"
                            data-aos-delay={index * 50}
                        >

                            <div className="tech-card__icon">

                                {tech.charAt(0)}

                            </div>

                            <span>

                                {tech}

                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}