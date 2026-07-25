'use client'

import { useState } from "react";
import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductFaq({
    product,
}: Props) {

    const [active, setActive] = useState<number | null>(0);

    if (!product.faqs?.length) return null;

    return (

        <section className="product-faq theme-dark">

            <div className="container">

                <div className="product-faq__head">

                    <span className="eyebrow">
                        FAQ
                    </span>

                    <h2 className="section-title">
                        Frequently <em>asked questions.</em>
                    </h2>

                </div>

                <div className="faq-list">

                    {product.faqs.map((faq, index) => (

                        <div
                            key={index}
                            className={`faq-item ${active === index ? "is-active" : ""
                                }`}
                        >

                            <button
                                className="faq-question"
                                onClick={() =>
                                    setActive(
                                        active === index
                                            ? null
                                            : index
                                    )
                                }
                            >

                                <span>
                                    {faq.question}
                                </span>

                                <span className="faq-icon">

                                    {active === index ? "−" : "+"}

                                </span>

                            </button>

                            <div className="faq-answer">

                                <p>

                                    {faq.answer}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}