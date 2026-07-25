import Image from "next/image";
import { Product } from "@/types/product";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface Props {
    product: Product;
}

export default function ProductTestimonials({
    product,
}: Props) {

    if (!product.testimonials?.length) return null;

    return (

        <section className="product-testimonials theme-light">

            <div className="container">

                <div className="product-testimonials__head">

                    <div>

                        <span className="eyebrow">
                            TESTIMONIALS
                        </span>

                        <h2 className="section-title">
                            Loved by <em>our customers.</em>
                        </h2>

                    </div>

                    <p className="lede">

                        Real feedback from organizations using
                        {` ${product.name} `}every day.

                    </p>

                </div>

                <div className="product-testimonials__grid">

                    {product.testimonials.map((item, index) => (

                        <article
                            key={index}
                            className="testimonial-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >

                            <div className="testimonial-card__quote">

                                “

                            </div>

                            <p>

                                {item.quote}

                            </p>

                            <div className="testimonial-card__author">

                                {item.photo ? (

                                    <Image
                                        src={`${storageUrl}/${item.photo}`}
                                        alt={item.author}
                                        width={60}
                                        height={60}
                                        className="testimonial-card__photo"
                                    />

                                ) : (

                                    <div className="testimonial-card__avatar">

                                        {item.author.charAt(0)}

                                    </div>

                                )}

                                <div>

                                    <strong>

                                        {item.author}

                                    </strong>

                                    <span>

                                        {item.designation}

                                        {item.company &&
                                            ` · ${item.company}`}

                                    </span>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </div>

        </section>

    );

}