import Image from "next/image";
import { Team } from "@/types/team";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface TeamProps {
    members: Team[];
}

export default function TeamSection({ members }: TeamProps) {

    return (
        <section className="team-section theme-light" id="leadership">
            <div className="container">
                <div className="team-head">
                    <span className="eyebrow">The team · 04</span>

                    <h2 className="section-title">
                        The people who <em>sign every commit</em>.
                    </h2>

                    <p
                        className="lede"
                        style={{ margin: "24px auto 0" }}
                    >
                        Senior engineers, designers and AI practitioners.
                        No subcontractors, no offshore factories.
                        Every project is shipped by someone whose name you know.
                    </p>
                </div>

                <div className="team-grid">
                    {members.map((member) => {
                        const initials = member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase();

                        return (
                            <div
                                key={member.id}
                                className="team-card"
                            >
                                {member.photo ? (
                                    <Image
                                        src={`${storageUrl}/${member.photo}`}
                                        alt={member.name}
                                        width={90}
                                        height={90}
                                        className="team-avatar team-avatar--image"
                                    />
                                ) : (
                                    <div className="team-avatar">
                                        {initials}
                                    </div>
                                )}

                                <h3>{member.name}</h3>

                                <div className="team-role">
                                    {member.designation}
                                </div>

                                <p className="team-bio">
                                    {member.bio}
                                </p>

                                {/* {(member.linkedin ||
                                    member.twitter ||
                                    member.github) && (
                                        <div className="team-social">
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="LinkedIn"
                                                    className="social-btn"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                        <rect x="2" y="9" width="4" height="12"></rect>
                                                        <circle cx="4" cy="4" r="2"></circle>
                                                    </svg>
                                                </a>
                                            )}

                                            {member.twitter && (
                                                <a
                                                    href={member.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Twitter"
                                                    className="social-btn"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                                    </svg>
                                                </a>
                                            )}

                                            {member.github && (
                                                <a
                                                    href={member.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="GitHub"
                                                    className="social-btn"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    )} */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}