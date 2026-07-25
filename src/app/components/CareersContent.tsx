import Link from "next/link";
import { CareerResponse } from "@/types/career";

interface Props {
    data: CareerResponse;
}

export default function CareersContent({ data }: Props) {
    const { perks, jobs } = data;

    return (
        <>
            {/* Perks */}
            <section className="careers-perks theme-light">
                <div className="container">
                    <div className="perks-head">
                        <span className="eyebrow">Why Adyatech · 01</span>

                        <h2 className="section-title">
                            What you'll <em>actually get</em>.
                        </h2>
                    </div>

                    <div className="perks-grid">
                        {perks.map((perk, index) => (
                            <div key={perk.id} className="perk">
                                <div className="perk__icon">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <h3>{perk.title}</h3>

                                <p>{perk.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Jobs */}
            <section className="jobs-section" id="open-roles">
                <div className="container">

                    <div
                        className="jobs-head"
                        style={{ textAlign: "center" }}
                    >
                        <span className="eyebrow">
                            Open roles · 02
                        </span>

                        <h2 className="section-title">
                            {jobs.length} Open Role{jobs.length !== 1 ? "s" : ""}.{" "}
                            <em>Join our team.</em>
                        </h2>

                        <p
                            className="lede"
                            style={{ margin: "24px auto 0" }}
                        >
                            We hire for craft, not for resumes. Even if you don't
                            see your exact role, write to us at{" "}
                            <a
                                href="mailto:careers@adyatech.com"
                                style={{
                                    color: "var(--brand-red)",
                                    textDecoration: "underline",
                                }}
                            >
                                careers@adyatech.com
                            </a>
                            .
                        </p>
                    </div>

                    <div className="job-list">
                        {jobs.map((job) => {
                            const applyLink =
                                job.apply_url ??
                                `mailto:${job.apply_email || "careers@adyatech.com"}?subject=${encodeURIComponent(
                                    `Application: ${job.title}`
                                )}`;

                            return (
                                <div
                                    key={job.id}
                                    className="job-card"
                                >
                                    <div>
                                        <div className="job-card__title">
                                            {job.title}

                                            {job.featured && (
                                                <span
                                                    style={{
                                                        marginLeft: 10,
                                                        fontSize: 11,
                                                        padding: "4px 8px",
                                                        borderRadius: 999,
                                                        background: "#ffe8d6",
                                                        color: "#c2410c",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Featured
                                                </span>
                                            )}
                                        </div>

                                        <div className="job-card__meta">
                                            <span>{job.location}</span>

                                            <span>{job.employment_type}</span>

                                            <span>{job.experience}</span>

                                            {job.salary && (
                                                <span>{job.salary}</span>
                                            )}

                                            {job.vacancies > 1 && (
                                                <span>
                                                    {job.vacancies} Vacancies
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <a
                                        href={applyLink}
                                        className="job-card__cta"
                                        target={
                                            job.apply_url
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            job.apply_url
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                    >
                                        Apply →
                                    </a>
                                </div>
                            );
                        })}
                    </div>

                    {jobs.length === 0 && (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "60px 0",
                            }}
                        >
                            <h3>No openings available right now.</h3>

                            <p style={{ marginTop: 10 }}>
                                We're always interested in meeting talented
                                people.
                            </p>

                            <Link
                                href="mailto:careers@adyatech.com"
                                className="btn btn-primary"
                            >
                                Send Your Resume
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}