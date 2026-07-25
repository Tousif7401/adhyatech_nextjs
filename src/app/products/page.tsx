import type { Metadata } from "next";

import UtilityBar from "../components/UtilityBar";
import Header from "../components/Header";
import { Footer } from "../components/Sections4";

import { getProducts } from "../../lib/products";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export const metadata: Metadata = {
  title: "Products - Adhyatech",
  description: "Explore our innovative products designed to transform your business.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <UtilityBar />
      <Header />

      <main className="min-h-screen">
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl">
              Innovative solutions designed to transform your business and drive growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <a
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {product.image && (
                        <img
                          src={`${storageUrl}/${product.image}`}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.summary}
                      </p>
                      <span className="text-blue-600 font-medium inline-flex items-center">
                        Learn more
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}