import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductStats({ product }: Props) {
    const launchYear = new Date(product.created_at).getFullYear();

    const users =
        product.clients?.length
            ? product.clients
            : [];

    return (
        <section className="pd-stats">
            <div className="container">

                <div className="pd-stats__row">

                    {product.stats?.map((item, index) => (
                        <div
                            className="pd-stat"
                            key={index}
                        >
                            <div className="pd-stat__num">
                                {item.number}
                            </div>

                            <div className="pd-stat__label">
                                {item.label}
                            </div>
                        </div>
                    ))}

                    {/* Fill remaining cards to match the HTML layout */}
                    {(!product.stats || product.stats.length < 4) && (
                        <div className="pd-stat">
                            <div className="pd-stat__num">
                                {launchYear}
                            </div>

                            <div className="pd-stat__label">
                                Launched
                            </div>
                        </div>
                    )}

                </div>

                {users.length > 0 && (
                    <div className="pd-users">

                        <div className="pd-users__label">
                            Trusted by
                        </div>

                        <div className="pd-users__row">

                            {users.map((item) => (
                                <div
                                    key={item}
                                    className="pd-users__item"
                                >
                                    {item}
                                </div>
                            ))}

                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}