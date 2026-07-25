import type { Metadata } from "next";

import UtilityBar from "../../components/UtilityBar";
import Header from "../../components/Header";
import { Footer } from "../../components/Sections4";

import ProductHero from "../../components/products_v2/ProductHero";
import ProductOverview from "../../components/products_v2/ProductOverview"
import ProductFeatures from "../../components/products_v2/ProductFeatures";
import ProductGallery from "../../components/products_v2/ProductGallery";
import ProductStats from "../../components/products_v2/ProductStats";
import ProductTechStack from "../../components/products_v2/ProductTechStack";
import ProductFaq from "../../components/products_v2/ProductFaq";
import ProductTestimonials from "../../components/products_v2/ProductTestimonials";
import ProductCTA from "../../components/products_v2/ProductCTA";
import RelatedProducts from "../../components/products_v2/RelatedProducts";

import { getProducts, getProduct } from "../../../lib/products";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const product = await getProduct(slug);

        return {
            title: product.meta_title || `${product.name} | Adyatech Solutions`,

            description:
                product.meta_description || product.short_description,

            keywords: product.meta_keywords?.split(","),

            openGraph: {
                title: product.meta_title || product.name,

                description:
                    product.meta_description || product.short_description,

                images: product.banner
                    ? [`${storageUrl}/${product.banner}`]
                    : [],
            },
        };
    } catch {
        return {
            title: "Product Not Found",
            description: "Requested product not found.",
        };
    }
}

export default async function ProductPage({
    params,
}: Props) {
    const { slug } = await params;

    const product = await getProduct(slug);

    const products = await getProducts();

    return (
        <>
            <UtilityBar />

            <Header />

            <main>

                <ProductHero product={product} />

                <ProductOverview product={product} />

                <ProductFeatures product={product} />

                <ProductGallery product={product} />

                <ProductStats product={product} />

                <ProductTechStack product={product} />

                <ProductFaq product={product} />

                <ProductTestimonials product={product} />

                <ProductCTA product={product} />

                <RelatedProducts
                    currentSlug={product.slug}
                    products={products}
                />

            </main>

            <Footer />
        </>
    );
}