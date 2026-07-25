// Insights/blog data — replace with API fetch in Phase 3.
// Article body uses simple HTML strings (server-rendered safely with dangerouslySetInnerHTML
// in the detail page). In Phase 3 this can become Markdown from the Laravel API.

export type Article = {
  slug: string
  title: string
  titleEm?: string  // italic emphasis word(s) in title
  excerpt: string
  category: 'AI' | 'Web Dev' | 'Process' | 'Industry' | 'Engineering'
  publishedAt: string  // ISO date
  readMinutes: number
  authorName: string
  authorRole: string
  authorInitials: string
  authorBio?: string
  mediaTone: 'gold' | 'slate' | 'cream' | 'charcoal' | 'teal'
  icon: string
  isFeatured?: boolean
  toc?: { id: string; label: string }[]
  body: string  // HTML
}

export const articles: Article[] = [
  {
    slug: 'rag-actually-works-in-production',
    title: 'What RAG actually looks like when it works in',
    titleEm: 'production.',
    excerpt: 'We have shipped six RAG systems for paying customers in the last eighteen months. None of them look anything like the Twitter demos. Here is what actually matters.',
    category: 'AI',
    publishedAt: '2026-05-12',
    readMinutes: 11,
    authorName: 'Vijay Reddy',
    authorRole: 'Founder · Adyatech',
    authorInitials: 'VR',
    authorBio: 'Founder of Adyatech Solutions LLP. Building software with a small senior team in Ballari since 2009. Currently obsessed with making AI useful for businesses that have actual customers.',
    mediaTone: 'gold',
    icon: 'AI',
    isFeatured: true,
    toc: [
      { id: 'demo-vs-reality', label: 'The demo vs the reality' },
      { id: 'retrieval-is-the-hard-part', label: 'Retrieval is the hard part' },
      { id: 'evals-or-you-are-flying-blind', label: 'Evals or you are flying blind' },
      { id: 'cost-and-latency-are-product-decisions', label: 'Cost and latency are product decisions' },
      { id: 'what-we-would-do-differently', label: 'What we would do differently' },
    ],
    body: `<p>Every consulting call about AI starts the same way these days. Someone has seen a demo. The demo was beautiful. They want that demo, but for their company. They have docs, contracts, support tickets, a product catalog — whatever — and they want a chatbot that knows about it.</p>

<p>The demo, almost always, was made by hooking up OpenAI's API to a vector database and a few hundred PDFs. It took an afternoon. It is also nothing like a production RAG system.</p>

<h2 id="demo-vs-reality">The demo vs <em>the reality</em></h2>

<p>Here is what a demo RAG system does well:</p>
<ul>
<li>Answers obvious questions about content that was clearly written down in one place</li>
<li>Hallucinates confidently when it cannot find the answer</li>
<li>Costs nothing to run because no one is using it</li>
<li>Has no concept of permissions, freshness, or accountability</li>
</ul>

<p>Here is what a customer actually wants:</p>
<ul>
<li>Answers questions where the answer is spread across five documents that contradict each other</li>
<li>Says "I don't know" when it doesn't know, instead of inventing answers</li>
<li>Costs less than the person it is replacing</li>
<li>Respects who is allowed to see what</li>
<li>Tells them when its source documents are outdated</li>
<li>Logs every answer so a human can verify and correct it</li>
</ul>

<p>The gap between these two lists is where 90% of the work lives. The model is the easy part. Retrieval, evals, permissions, and feedback loops are where you spend the next eight weeks.</p>

<h2 id="retrieval-is-the-hard-part">Retrieval is <em>the hard part</em></h2>

<p>Pick the right chunks and even a small model gives you good answers. Pick the wrong chunks and even Claude Opus will confidently misinform you, because that's what's in the context.</p>

<p>What we have learned the hard way:</p>

<h3>Chunking is content-specific</h3>

<p>The default LangChain recursive text splitter is fine for blog posts. It is terrible for contracts (where a clause might be 300 words and meaningless without the preceding definitions) and worse for tables (which it shreds). Every RAG project we have done has needed custom chunking logic per document type. For Northwind Legal we wrote a clause-aware chunker that respects contract section boundaries. For a hospital we wrote one that preserves drug-dose tables intact.</p>

<h3>Pure semantic search misses obvious matches</h3>

<p>Embeddings are good at meaning. They are surprisingly bad at proper nouns, part numbers, and dates. "Show me the SOW for project Atlas signed in March" should return the SOW for project Atlas, but pure cosine similarity often surfaces three unrelated documents that talk about "Atlas" or "March" abstractly. Hybrid search (semantic + BM25) closed this gap in every project we've done. It's not optional.</p>

<h3>Rerankers earn their keep</h3>

<p>Pull 30 candidates with hybrid search, then rerank with Cohere or a cross-encoder, then send the top 5 to the model. This three-stage pattern was the single biggest accuracy lift we got on the Civic Bank churn explanation system. The reranker catches false positives that retrieval can't distinguish.</p>

<div class="callout"><strong>What this means in practice:</strong> if your RAG implementation is "embed everything, top-K from a vector DB, send to LLM" — your accuracy ceiling is around 60–70%. Hybrid retrieval plus reranking gets you to 85%+ on most domains. The difference between those numbers is the difference between a demo and a product.</div>

<h2 id="evals-or-you-are-flying-blind">Evals or you are <em>flying blind</em></h2>

<p>The thing nobody warns you about: once your RAG system is in production, every prompt change, every chunking tweak, every retrieval parameter is now risky. You will spend the rest of the project asking "did I just make this worse?" — and you cannot answer without evals.</p>

<p>Our minimum eval setup for any production RAG project:</p>
<ul>
<li>50–200 hand-labeled question-answer pairs from real users (not synthetic)</li>
<li>Automated retrieval metrics: recall@k, MRR</li>
<li>LLM-judge accuracy scoring on a held-out set, with human spot-checks weekly</li>
<li>A dashboard showing accuracy drift week-over-week</li>
</ul>

<p>It feels like overkill until your first regression. Then it feels like the cheapest thing you ever built.</p>

<h2 id="cost-and-latency-are-product-decisions">Cost and latency are <em>product decisions</em></h2>

<p>A RAG call that takes 8 seconds is fine for an internal research tool. It is a disaster for a customer-facing chatbot. A call that costs $0.20 is fine when a lawyer is using it. It is unviable for a support agent answering 10,000 questions a day.</p>

<p>We decide cost-and-latency targets <strong>before</strong> we pick the model. Then we work backwards: how much context can we afford? How many retrievals? Do we need a cheap classifier in front to route easy queries to a small model? On the Helio Health voice booking system we used a tiny model to classify intent (book / cancel / question / handoff) and only routed the "question" branch through full RAG. Average cost dropped 70% and we kept the accuracy on the path that mattered.</p>

<h2 id="what-we-would-do-differently">What we would <em>do differently</em></h2>

<p>If we were starting fresh on a RAG project today:</p>

<ol>
<li><strong>Build the eval set first.</strong> Even before retrieval. Even before picking a model. The eval set forces you to define what "good" looks like in concrete terms, and it pays back ten times over.</li>
<li><strong>Use hybrid retrieval from day one.</strong> Don't wait for accuracy problems to discover that pure vector search isn't enough.</li>
<li><strong>Add the reranker before adding more documents.</strong> Bigger corpora make weak retrieval worse, not better.</li>
<li><strong>Plan for feedback loops in the UI.</strong> A thumbs up/down button and a "this answer was wrong" path. Without this you cannot improve the system over time.</li>
<li><strong>Be ruthless about scope.</strong> "Answer any question about our company" is a project that never finishes. "Help an RM understand why this customer was flagged" is a project that ships.</li>
</ol>

<p>If you're building something like this and want to talk it through, <a href="/contact">drop us a note</a>. We've made most of the mistakes and we're happy to share which ones to skip.</p>`,
  },
  {
    slug: 'why-we-still-use-joomla-in-2026',
    title: 'Why we still use Joomla in',
    titleEm: '2026.',
    excerpt: 'Yes, really. Here is the boring, unfashionable truth about which CMS we reach for when a college needs a real website to last ten years.',
    category: 'Web Dev',
    publishedAt: '2026-04-28',
    readMinutes: 8,
    authorName: 'Vijay Reddy',
    authorRole: 'Founder · Adyatech',
    authorInitials: 'VR',
    mediaTone: 'cream',
    icon: 'JS',
    body: `<p>This post will get me yelled at on Twitter. That's fine.</p>

<p>We build a lot of websites for colleges, government departments, and small institutions in tier-2 India. For those clients, Joomla — yes, that Joomla, the one nobody talks about — is still the right call more often than not. Here is why, and when it isn't.</p>

<h2>The brief most agencies <em>get wrong</em></h2>

<p>A typical college's brief looks like: "we want a modern website." What they actually need is a website that the same admin assistant who learned Joomla in 2014 can update for the next eight years, that costs ₹2,000/year to host on a cPanel shared plan, that has 40 to 80 static pages plus events, news, and a few forms, and that doesn't break the first time a freshly hired Node.js developer touches it.</p>

<p>Recommending Next.js for that brief is professional negligence. So is recommending a fully custom Laravel CMS. The client is going to fire the agency and the website will be abandoned within two years. We've inherited about thirty such projects.</p>

<h2>What Joomla still does <em>better</em> than the alternatives</h2>

<ul>
<li><strong>It runs on every cPanel host on earth.</strong> No serverless, no Docker, no CI/CD. The college's IT person already knows how to install it.</li>
<li><strong>The component+template+module architecture maps cleanly to how non-technical editors think.</strong> Pages, sections, sidebar widgets. The mental model is good.</li>
<li><strong>Multilingual is built in.</strong> WordPress needs paid plugins. Next.js needs custom routing. Joomla has it.</li>
<li><strong>Permissions/ACL is actually fine-grained.</strong> Different roles, different sections, different workflows — all without writing code.</li>
<li><strong>Modern templates with Helix Framework + SP Page Builder Pro give you a respectable editing experience.</strong> Not Webflow, but better than 2014 Joomla.</li>
</ul>

<h2>When Joomla is the wrong call</h2>

<p>I want to be honest about this. Joomla is wrong for:</p>

<ul>
<li>Anything with significant interactivity — pick Next.js / React / Vue</li>
<li>E-commerce of any complexity — Shopify, WooCommerce, or custom</li>
<li>Single-page apps or dashboards — definitely not</li>
<li>SaaS products — please, no</li>
<li>Sites that need extremely tight performance budgets (Core Web Vitals at the limit)</li>
<li>Anywhere your team is full of JS-first developers who will revolt at PHP</li>
</ul>

<p>But for a 60-page institutional site that needs to last a decade, with content editors who are not engineers, on hosting that costs less than a coffee per month — Joomla wins. Quietly, unfashionably, but it wins.</p>

<h2>What we have learned <em>shipping</em> Joomla in 2026</h2>

<ol>
<li>Stay on Joomla 5.x. Joomla 3 hosting still exists but the security posture is now bad.</li>
<li>Use Helix as the base template framework. SP Page Builder Pro for visual editing. Both from JoomShaper, both worth the license fee.</li>
<li>Rewrite the CSS. Default Helix CSS is heavy and dated. Our college builds typically include a 600-line custom.css that replaces most of it.</li>
<li>Strip extensions ruthlessly. A Joomla install with 30 active extensions is slow and a security risk. We aim for under ten.</li>
<li>Build the editor experience deliberately. Custom modules with clear instructions. We assume the next editor has never logged in before.</li>
</ol>

<p>None of this is glamorous. It will not get retweeted. But it ships sites that are still online — and being updated by their original clients — eight years later. Which, for a college website, is the only metric that matters.</p>`,
  },
  {
    slug: 'fixed-bid-vs-time-and-materials',
    title: 'Fixed-bid vs T&M: the conversation nobody wants to',
    titleEm: 'have.',
    excerpt: 'After 16 years of running a dev shop, we have come to think both pricing models are broken in different ways. Here is what we use instead.',
    category: 'Process',
    publishedAt: '2026-04-14',
    readMinutes: 7,
    authorName: 'Vijay Reddy',
    authorRole: 'Founder · Adyatech',
    authorInitials: 'VR',
    mediaTone: 'slate',
    icon: 'PP',
    body: `<p>Two pricing models dominate custom software. Both are dishonest in their own way.</p>

<h2>Fixed bid is dishonest about <em>scope</em></h2>

<p>The client wants certainty. The agency wants to win the deal. Both pretend the scope is knowable upfront — even though every project of any size discovers half its requirements during execution. So the agency low-balls the bid, then pads the contract with change-request clauses that make every "small tweak" cost extra. The relationship becomes adversarial by week three.</p>

<h2>Time and materials is dishonest about <em>incentive</em></h2>

<p>The longer it takes, the more the agency gets paid. The agency knows this. The client knows the agency knows this. So the client demands timesheets, status meetings, and detailed breakdowns — adding 15% overhead to every hour worked. Trust evaporates. The project drags.</p>

<h2>What we actually do</h2>

<p>For most projects we use what we call <strong>capped-phase pricing</strong>:</p>

<ul>
<li>We agree on a phase — usually two to six weeks — with a concrete deliverable</li>
<li>We give a fixed price for that phase, with a 10% buffer that we eat if we overrun</li>
<li>At the end of the phase, we both decide whether to continue, change direction, or stop</li>
<li>No long-form contracts. Each phase is its own small commitment.</li>
</ul>

<p>This works because:</p>

<ul>
<li><strong>Scope is bounded enough to estimate well.</strong> Two to six weeks is small enough that we have done the same work before. Sixteen weeks is not.</li>
<li><strong>The client never has more than a phase of risk.</strong> If we are bad, they leave after ₹3 lakhs, not ₹30 lakhs.</li>
<li><strong>Our incentive is to ship.</strong> The faster we finish a phase, the faster we start the next one. We make more, not less, by going fast.</li>
<li><strong>We can decline scope creep without drama.</strong> "Great idea — let's plan it as a phase 4."</li>
</ul>

<h2>When we still do fixed bid</h2>

<p>Government tenders. Some enterprise procurement processes. Anything where the buyer simply cannot legally pay any other way. In those cases we pad the price by 30% and accept that the project will be less fun.</p>

<h2>When we still do T&M</h2>

<p>Long-running maintenance. Embedded engagements where we are functioning as part of the client's team. Anything where the scope genuinely is unknowable and will evolve over months.</p>

<h2>The signal we look for</h2>

<p>When a client insists on fixed bid and refuses to consider phased work, it's usually because they have been burned before. Fair enough. But sometimes it's because they want to lock us into a number before discovering what they actually need. That second one is the bad signal — and it's almost always followed by a painful project.</p>

<p>Pricing models reveal trust. The clients we work best with are the ones willing to start small and grow the engagement as it goes well.</p>`,
  },
  {
    slug: 'shipping-for-tier-2-india',
    title: 'Shipping software for tier-2',
    titleEm: 'India.',
    excerpt: 'Most software advice assumes Bangalore. We build for clients in Ballari, Hubballi, Mysuru, and a dozen other cities. The constraints are different.',
    category: 'Industry',
    publishedAt: '2026-03-30',
    readMinutes: 9,
    authorName: 'Vijay Reddy',
    authorRole: 'Founder · Adyatech',
    authorInitials: 'VR',
    mediaTone: 'teal',
    icon: 'IN',
    body: `<p>I have read approximately 8,000 essays about building software in India. Maybe ten of them have been useful to us. The rest are written by people in Bangalore, San Francisco, or Bangalore-via-San-Francisco, and assume that:</p>

<ul>
<li>The client has a CTO who reads Hacker News</li>
<li>Internet bandwidth is fine everywhere</li>
<li>Talent is available for the cost of one or two lakhs per month</li>
<li>"Cloud-native" is a normal default</li>
<li>The client's team can review your work asynchronously over Linear and Slack</li>
</ul>

<p>None of these are reliably true outside metros. Here's what is actually true when you build for tier-2 clients.</p>

<h2>Clients buy from <em>people</em>, not pitches</h2>

<p>Our clients in Ballari, Davangere, and Hospet have almost never hired us through a website form. They hire us because we showed up at their office, took their problem seriously, came back two weeks later with a concrete plan, and didn't disappear when the project got hard. The CRM is a phone book. The sales cycle is dinners.</p>

<p>For a long time I thought this was charming and a little inefficient. Then I noticed something — these clients <strong>stay</strong>. We have clients we've worked with for eleven years. We've built three versions of the same college's website over a decade. That's not a sales cycle. That's a relationship.</p>

<h2>Mobile-first is <em>actually</em> first</h2>

<p>Our college clients see 85%+ mobile traffic. Some over 95%. Many of their users are on cheap Android phones with patchy 4G. Page weight matters in a way that it does not in San Francisco.</p>

<p>What this means concretely:</p>
<ul>
<li>Hero images are 60kb, not 600kb. We're not shipping a 4MB JPEG.</li>
<li>Custom fonts are subsetted. Latin-only when there's no Indic content; Latin+Devanagari otherwise.</li>
<li>JavaScript bundles cap at ~120kb for marketing sites.</li>
<li>We build and test on a throttled 3G profile, not just our office WiFi.</li>
</ul>

<h2>Hosting reality</h2>

<p>Vercel is wonderful. It is also irrelevant to most of our work. Our clients have:</p>
<ul>
<li>A cPanel shared hosting plan from BigRock or HostGator they bought five years ago</li>
<li>Maybe an AWS Lightsail VPS if they're sophisticated</li>
<li>An IT contractor who comes by twice a year</li>
</ul>

<p>We build for that. Joomla on cPanel. Laravel on Lightsail. Static Next.js exports that drop into cPanel like any other site. We don't recommend infrastructure they can't maintain.</p>

<h2>Payment integrations</h2>

<p>Stripe is the default in most tech blogs. Stripe is also unavailable in India. We use Razorpay, PayU, or Cashfree. UPI is non-negotiable — about 60% of donations and small transactions go via UPI now. International cards (less than 5% in our experience for institutional clients) are an afterthought, not the default.</p>

<h2>Hiring is hard, in a different way</h2>

<p>In Bangalore the problem is salary inflation. In Ballari the problem is finding senior developers at all. We have solved this by being patient — we train, we promote internally, we hire one senior per year and grow them. Our average team tenure is over four years, which is unusual in this industry.</p>

<p>The flip side: every hire is a long-term decision. We can't fire-and-replace. So we are unusually careful about culture fit during hiring. This sounds soft until you realize the alternative is replacing a key engineer in a town where there are maybe twelve qualified candidates.</p>

<h2>What I would <em>tell</em> a young dev shop</h2>

<p>Build trust before you build software. Show up in person if you can. Charge fairly but don't compete on price. Pick a niche — for us it's institutional clients (colleges, government, mid-size businesses) — and become unignorably good at it. Don't chase metros. There's enough work in your own city if you're willing to do it well.</p>

<p>Sixteen years in, we are still here. Most agencies that started when we did are not.</p>`,
  },
  {
    slug: 'voice-ai-for-indic-languages',
    title: 'Voice AI in Indic languages: where it actually',
    titleEm: 'breaks.',
    excerpt: 'We shipped a Kannada and Hindi voice booking system for a hospital network. Here is what worked, what did not, and what nobody mentions in the demos.',
    category: 'AI',
    publishedAt: '2026-03-15',
    readMinutes: 10,
    authorName: 'Vijay Reddy',
    authorRole: 'Founder · Adyatech',
    authorInitials: 'VR',
    mediaTone: 'charcoal',
    icon: 'VA',
    body: `<p>Last year we deployed a voice booking system for Helio Health, a four-hospital network serving northern Karnataka. It handles inbound appointment calls in Kannada, Hindi, and English. The system now manages 60% of bookings end-to-end. Here is what we learned.</p>

<h2>The frontier-model performance gap is <em>real</em></h2>

<p>If you have only built English voice agents, you might assume Indic language support is "almost there." It isn't. There is a real, measurable accuracy gap between English and Kannada or Hindi for both speech-to-text (STT) and text-to-speech (TTS), and the gap is bigger for accented or code-mixed speech.</p>

<p>For Helio, an English-only Whisper baseline gave us about 92% word accuracy on clean speech. Kannada on the same model: about 71%. With code-mixing ("doctor available hai kya tomorrow?") it dropped further.</p>

<h2>What actually <em>worked</em></h2>

<h3>Custom STT tuning</h3>

<p>We licensed Deepgram and fine-tuned with about 18 hours of labeled Helio call recordings. This alone took Kannada accuracy from 71% to 86%. Domain-specific words (doctor names, specialty terms, locality names like "Vidyaranyapura") were the biggest wins.</p>

<h3>Aggressive prompting in Claude</h3>

<p>Once the speech became text, we used Claude as the conversation manager. Two prompting tactics mattered:</p>

<ul>
<li>Instruct the model that it might be receiving low-confidence transcriptions, and to ask for clarification rather than guessing if uncertainty is high</li>
<li>Provide a phonetic alternate list — if the user says something close to "Dr. Sharma" but the STT returned "Dr. Sherma," Claude considers both</li>
</ul>

<h3>Strict intent classification</h3>

<p>Before sending anything to Claude, a small intent classifier (essentially a fine-tuned small model) decides whether the call is a booking, a cancellation, a routine question, or something complex enough to need a human. About 30% of calls go to the human handoff branch — and the system is honest about that.</p>

<h2>What did <em>not</em> work</h2>

<h3>Pure LLM-based STT correction</h3>

<p>We tried letting Claude clean up bad transcriptions before processing. It worked sometimes. But the cases where it didn't, it confidently invented plausible-sounding wrong words. Bad ASR + LLM correction = confidently wrong, which is worse than honestly uncertain.</p>

<h3>Single multilingual TTS voice</h3>

<p>We initially used one TTS voice that could handle all three languages. It sounded uncanny in Kannada — like someone who learned Kannada from a textbook but had never spoken it. We switched to language-specific voices (still cloned from real speakers, with permission) and patient satisfaction scores improved noticeably.</p>

<h3>Optimizing for "natural" conversation</h3>

<p>We thought callers would prefer free-form dialogue. They didn't. Patients found very structured, almost-IVR-like flows easier when they were stressed (which most callers to a hospital are). The voice agent now asks one clear question at a time and confirms aggressively. Less elegant, more usable.</p>

<h2>The operational stuff nobody warns you about</h2>

<ul>
<li><strong>Logging conversations is a legal question.</strong> India's DPDP Act requires consent and limits retention. We log only with explicit consent at call start and purge after 14 days unless the patient asks otherwise.</li>
<li><strong>Latency budgets are tight on telephony.</strong> Anything over 2 seconds of silence feels broken. We pre-generate "I'm checking that for you" filler audio while waiting on slow API calls.</li>
<li><strong>Handoff has to be perfect.</strong> When the bot transfers to a human, the human gets full call context as a Slack message. Without this, the patient has to repeat everything and trust in the system collapses.</li>
<li><strong>Weekly tuning is forever.</strong> Every week we sample 100 calls, review failures, update the prompt or fine-tune. There is no "we shipped it" moment for voice AI in production.</li>
</ul>

<h2>What we would build differently</h2>

<p>If we started over, we would invest more upfront in the eval set. We initially measured "did the patient successfully book an appointment?" — which is what you eventually want, but it's lagging by minutes. We now have intermediate evals at every step (STT confidence, intent accuracy, slot-filling correctness, confirmation accuracy). Failures get caught one step earlier in the funnel, which is much easier to debug.</p>

<p>If you're thinking about voice AI for an Indic-language use case, the short version is: it works, but it's a real engineering effort. Treat the demos as wishful thinking and budget accordingly.</p>`,
  },
  {
    slug: 'when-to-use-flutter-vs-native',
    title: 'When to use Flutter vs',
    titleEm: 'native.',
    excerpt: 'We have shipped about 18 mobile apps. Roughly half in Flutter, the rest in Swift or Kotlin. Here is how we decide which is right.',
    category: 'Engineering',
    publishedAt: '2026-02-22',
    readMinutes: 7,
    authorName: 'Vijay Reddy',
    authorRole: 'Founder · Adyatech',
    authorInitials: 'VR',
    mediaTone: 'gold',
    icon: 'MO',
    body: `<p>Every mobile project starts with the same question: native or cross-platform? Most teams either pick one and use it for everything, or they let the framework wars on Twitter decide for them. Both are mistakes.</p>

<h2>The simple version</h2>

<p>Use Flutter when:</p>
<ul>
<li>You need iOS and Android, and your team is small (1-3 mobile devs)</li>
<li>Your app is mostly content, lists, forms, and CRUD — basically anything that's not a game</li>
<li>You want to iterate fast and don't mind the design feeling slightly "Flutter-ish" by default</li>
<li>You have a tight budget — the cost difference is typically 30-50% less than two native codebases</li>
</ul>

<p>Use native (Swift or Kotlin) when:</p>
<ul>
<li>You need deep platform integration — widgets, complications, Live Activities, deep linking with Universal Links, App Clips, advanced background tasks</li>
<li>You're shipping ARKit, RealityKit, or anything that uses platform-specific frameworks</li>
<li>You need every millisecond of performance — high-fps animations, real-time audio/video processing, games</li>
<li>You're a one-platform company (iOS-only or Android-only is genuinely fine in many B2B contexts in India)</li>
</ul>

<h2>What people get <em>wrong</em></h2>

<p>"Flutter looks cheap." Out of the box, yes. With deliberate styling, no. The Helio patient app is Flutter and most users assume it's native iOS. The trick is to not use Material Design defaults on iOS — implement the native-feeling components yourself or use a library that does. It takes a couple of weeks of upfront work and then it's fine.</p>

<p>"Flutter performance is bad." This was true four years ago. It is not true now for the apps most businesses build. We have Flutter apps doing 60fps complex list scrolling, animated charts, and offline-first data sync without issue. If you're rendering a game or doing video effects, that's different.</p>

<p>"Native is too expensive for B2C apps." It depends on the team. A senior iOS developer and a senior Android developer working in parallel can ship faster than two mid-level Flutter developers. Talent matters more than framework choice for medium-sized apps.</p>

<h2>The Flutter-specific lessons</h2>

<p>Things we've learned the hard way:</p>

<ul>
<li><strong>State management is a hill to climb.</strong> Provider, Riverpod, Bloc, GetX — each has religious followers and real downsides. We use Riverpod and have been happy. Pick one and don't switch mid-project.</li>
<li><strong>Native platform integrations need a native developer.</strong> Anything that touches the keychain, secure enclave, biometrics, or background processes will eventually need someone who actually knows Swift or Kotlin. Budget for this.</li>
<li><strong>Releases are still platform-specific.</strong> App Store review, Play Store review, signing, provisioning — Flutter doesn't make any of this easier. Plan for both stores' rules.</li>
<li><strong>Dart is fine.</strong> It's not exciting, but it's stable, fast, and easy to hire for now. The language is not the reason Flutter projects fail.</li>
</ul>

<h2>Where we land</h2>

<p>For most of our client work — apps that serve as the mobile face of a business — we default to Flutter. For products where the mobile experience itself is the product, or where deep OS integration matters, we still go native. We've never once regretted picking Flutter for the right project, and we've never once regretted picking native for the right project either. The framework wars on Twitter are about identity. Pick the tool that fits the job.</p>`,
  },
]

export const articleCategories = ['All', 'AI', 'Web Dev', 'Process', 'Industry', 'Engineering'] as const

export function getFeaturedArticle() {
  return articles.find(a => a.isFeatured) || articles[0]
}

export function getNonFeaturedArticles() {
  const featured = getFeaturedArticle()
  return articles.filter(a => a.slug !== featured.slug)
}

export function getArticleBySlug(slug: string) {
  return articles.find(a => a.slug === slug)
}

export function getRelatedArticles(currentSlug: string, count = 3) {
  return articles.filter(a => a.slug !== currentSlug).slice(0, count)
}

export function formatDate(iso: string) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
