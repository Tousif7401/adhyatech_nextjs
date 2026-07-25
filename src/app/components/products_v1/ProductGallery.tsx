import Image from "next/image";

import { Product } from "@/types/product";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface Props {
    product: Product;
}

export default function ProductGallery({ product }: Props) {
    if (!product.gallery?.length) return null;

    return (
        <section className="pd-gallery">
            <div className="container">

                <div className="pd-gallery__head">

                    <div className="pd-gallery__eyebrow">
                        A look inside
                    </div>

                    <h2 className="pd-gallery__title">
                        The product, <em>in three frames.</em>
                    </h2>

                </div>

                <div className="pd-gallery__row">

                    {product.gallery.slice(0, 3).map((image, index) => (

                        <div
                            className="pd-shot"
                            key={index}
                        >

                            <div className="pd-shot__inner">

                                <Image
                                    src={`${storageUrl}/${image}`}
                                    alt={`${product.name} Screenshot ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width:768px) 100vw, 33vw"
                                />

                            </div>

                            <div className="pd-shot__caption">

                                {(index + 1)
                                    .toString()
                                    .padStart(2, "0")}

                                {" · "}

                                {product.features?.[index]?.title ??
                                    `Screenshot ${index + 1}`}

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}