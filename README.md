# Adyatech Solutions — Next.js Website

Converted from the original HTML/CSS/JS homepage to a production-ready Next.js 14 project.

## Project Structure

```
src/
└── app/
    ├── layout.tsx          # Root layout — fonts, metadata, html shell
    ├── page.tsx            # Homepage — assembles all section components
    ├── globals.css         # All CSS (design tokens, sections, responsive)
    └── components/
        ├── UtilityBar.tsx  # Top utility bar
        ├── Header.tsx      # Sticky header, nav dropdowns, theme toggle, mobile menu
        ├── Hero.tsx        # Hero section — mesh blobs, particles, cursor glow, rotator, slider
        ├── Sections1.tsx   # LegacyBand, Marquee, Manifesto/About, Industries
        ├── Sections2.tsx   # Services, Work/Portfolio (with filter), Process
        ├── Sections3.tsx   # Products, Alumnyo, Osciva, Impact (counters), GovtBand, TechStack
        └── Sections4.tsx   # Testimonials, Insights/Blog, BigCTA, Footer
public/
└── assets/logo/
    ├── adyatech-logo-light.png
    └── adyatech-logo-dark.png
```

## Features Converted

- ✅ All 20 sections from the original HTML
- ✅ Dark/light theme toggle with localStorage persistence
- ✅ Sticky scrolled header with glassmorphism
- ✅ Navigation dropdowns (hover)
- ✅ Mobile hamburger menu
- ✅ Hero animated gradient mesh blobs
- ✅ Hero floating particles
- ✅ Hero cursor-follow glow
- ✅ Hero word rotator (Instrument Serif italic)
- ✅ Hero parallax title on scroll
- ✅ Hero featured project slider (auto-rotate + manual dots)
- ✅ Infinite marquee client strip
- ✅ Work portfolio filter buttons
- ✅ Animated number counters (IntersectionObserver)
- ✅ Alumnyo floating dashboard cards
- ✅ Osciva pulsing AI orb
- ✅ All design tokens preserved (colors, fonts, spacing)
- ✅ Fully responsive (mobile breakpoints)

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server (if not using static export)
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying on VPS (Nginx + PM2)

### Build

```bash
npm run build
```

This generates a static `out/` folder (configured in next.config.js with `output: 'export'`).

### Serve with Nginx

```nginx
server {
    listen 80;
    server_name adyatech.com www.adyatech.com;
    root /var/www/adyatech/out;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

### Or: Run as Node server with PM2

Remove `output: 'export'` from `next.config.js`, then:

```bash
npm run build
pm2 start npm --name "adyatech" -- start
pm2 save
```

## Next Steps

1. Replace placeholder phone/address in UtilityBar.tsx and Footer.tsx
2. Add real portfolio images to `public/assets/portfolio/`
3. Connect contact form to your backend API or Resend
4. Connect newsletter to your ESP (Mailchimp, Brevo, etc.)
5. Add remaining pages: /about, /services, /portfolio, /blog, /contact, /careers
6. Add Laravel API for dynamic content (portfolio, blog posts)
