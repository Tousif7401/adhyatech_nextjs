import Link from "next/link";
import type { Article, BlogCategory } from "@/types/article";

type Props = {
    article: Article;
    categories: BlogCategory[];
};

export default function ArticleCard({
    article,
    categories,
}: Props) {
    return (
        <Link
            href={`/insights/${article.slug}`}
            className="insights-card"
        >
            <div className={article.image ? "" : "insights-card__media is-gold"}>
                {article.image && (
                    <img
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${article.image}`}
                        alt={article.heading}
                        style={{
                            width: "100%",
                            maxHeight: "300px",
                            objectFit: "contain",
                        }}
                    />
                )}

                {/* <div className="insights-card__icon">
                    {categories.find(c =>
                        article.category_ids?.includes(c.id.toString())
                    )?.title ?? "General"}
                </div> */}

                <span className="insights-card__category-badge">
                    {categories.find(c =>
                        article.category_ids?.includes(c.id.toString())
                    )?.title ?? "General"}
                </span>
            </div>


            <div className="insights-card__body">

                <div className="insights-card__meta">
                    {new Date(article.publish_date ?? "").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                    {" · "}
                    {Math.max(
                        1,
                        Math.ceil((article.content?.replace(/<[^>]+>/g, '').split(/\s+/).length || 0) / 200)
                    )} min read
                </div>


                <h3>
                    {article.heading}
                </h3>


                <p className="insights-card__excerpt">
                    {article.description}
                </p>


                <div className="insights-card__author-row">

                    <div className="insights-card__author-avatar">
                        VR
                    </div>

                    <strong>
                        Vijay Reddy
                    </strong>

                </div>

            </div>
        </Link>
    )
}