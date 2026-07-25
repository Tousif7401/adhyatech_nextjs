import Image from "next/image";

import { Product } from "@/types/product";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface Props {
    product: Product;
}

export default function ProductGallery({
    product,
}: Props) {

    if (!product.gallery?.length) return null;

    return (

        <section className="product-gallery theme-light">

            <div className="container">

                <div className="product-gallery__head">

                    <div>

                        <span className="eyebrow">
                            SCREENSHOTS
                        </span>

                        <h2 className="section-title">

                            See <em>{product.name}</em> in action.

                        </h2>

                    </div>

                    <p className="lede">

                        Every screen is crafted with usability,
                        performance and beautiful UI in mind.

                    </p>

                </div>

                <div className="product-gallery__grid">

                    {product.gallery.map((image, index) => (

                        <div
                            key={index}
                            className={`gallery-card ${index === 0
                                    ? "gallery-card--large"
                                    : ""
                                }`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >

                            <div className="gallery-browser">

                                <div className="gallery-browser__top">

                                    <span></span>
                                    <span></span>
                                    <span></span>

                                </div>

                                <div className="gallery-browser__body">

                                    <Image
                                        src={`${storageUrl}/${image}`}
                                        alt={`${product.name} Screenshot ${index + 1}`}
                                        fill
                                        className="gallery-browser__image"
                                    />

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}