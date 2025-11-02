# AlphaTON Capital Website

A modern web application built with Next.js, Tailwind CSS, and Keystatic CMS.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Content Management](#-content-management)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Security Considerations](#-security-considerations)
- [Code Quality](#-code-quality)
- [Support & Resources](#-support--resources)

## 🚀 Tech Stack

- **Frontend**: Next.js 16.0.1 (App Router)
- **Styling**: Tailwind CSS 3.4.18
- **CMS**: Keystatic (Git-based, Vercel-native)
- **Language**: TypeScript 5.9.3
- **React**: 19.2.0
- **Email Service**: Resend 6.4.0
- **Deployment**: Vercel (recommended)

## ✅ Build Status

- ✅ **Build**: Passing (41 static pages generated)
- ✅ **TypeScript**: Strict mode enabled, no errors
- ✅ **Linting**: Configured via Next.js
- ✅ **Error Handling**: Production-ready with development-only logging
- ✅ **SEO**: Open Graph and Twitter Card metadata configured, robots.txt and sitemap.xml implemented
- ✅ **Security**: Rate limiting, CSP headers, HTML sanitization, input validation
- ✅ **Responsive**: Mobile-optimized design throughout
- ✅ **UX**: Loading states and error boundaries implemented

## 📁 Project Structure

```
AlphaTonCapital/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form handlers
│   │   ├── subscribe/      # Newsletter subscription
│   │   └── keystatic/     # CMS authentication
│   ├── branding/          # Branding guidelines page
│   ├── keystatic/         # CMS admin UI
│   ├── news/[slug]/      # News article pages (with loading.tsx)
│   ├── posts/            # Blog posts listing & detail (with loading.tsx)
│   ├── layout.tsx        # Root layout with SEO metadata
│   ├── page.tsx          # Homepage
│   ├── error.tsx         # Error boundary for route segments
│   ├── global-error.tsx  # Global error boundary
│   ├── not-found.tsx     # Custom 404 page
│   ├── robots.ts         # Dynamic robots.txt
│   ├── sitemap.ts        # Dynamic sitemap.xml
│   └── globals.css       # Global styles
├── middleware.ts          # Rate limiting middleware
├── components/            # React components
│   ├── modals/          # Modal components
│   ├── branding/        # Branding page components
│   ├── Header.tsx
│   ├── Hero.tsx         # Hero with plane animation
│   ├── WhatWeDo.tsx
│   ├── OurEdge.tsx
│   ├── InvestorRelations.tsx
│   ├── Leadership.tsx
│   ├── NewsSection.tsx
│   └── Footer.tsx
├── lib/                  # Utility functions
│   ├── keystatic.ts     # News articles utilities
│   ├── keystatic-posts.ts # Blog posts utilities
│   ├── markdoc-renderer.tsx # Markdoc rendering
│   └── SanitizedHTML.tsx # HTML sanitization component
├── content/              # CMS content (Git-managed)
│   ├── news/            # News articles (directory structure)
│   │   └── [slug]/     # Each article: index.yaml + content.mdoc
│   └── posts/           # Blog posts (directory structure)
├── public/               # Static assets
│   └── assets/          # Logos, icons, images, media kit
└── [config files]        # next.config.js, tsconfig.json, etc.
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation Steps

1. **Clone repository**
   ```bash
   git clone [repository-url]
   cd AlphaTonCapital
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `env.example` to `.env.local`
   - Fill in required values (see [Environment Variables](#-environment-variables) section)

4. **Start development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

## 🔐 Environment Variables

### Required Variables

Create `.env.local` with the following:

```env
# Resend API (for contact forms and newsletter)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=AlphaTON Capital <noreply@alphatoncapital.com>
RESEND_TO_EMAIL=info@alphatoncapital.com

# Keystatic CMS Authentication
KEYSTATIC_PASSWORD=your_secure_password_here
KEYSTATIC_SESSION_SECRET=generate_with_crypto_randomBytes_32

# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL=https://alphatoncapital.com
```

### Generating Session Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Get API key from dashboard
3. Verify sender domain for production
4. For testing, use `onboarding@resend.dev` (pre-verified)

### Environment Variable Descriptions

- **RESEND_API_KEY**: API key from Resend dashboard for sending emails
- **RESEND_FROM_EMAIL**: Sender email address (must be verified in Resend for production)
- **RESEND_TO_EMAIL**: Default recipient email (forms may override)
- **KEYSTATIC_PASSWORD**: Password for accessing CMS admin at `/keystatic`
- **KEYSTATIC_SESSION_SECRET**: Secure random string for session token signing (32+ characters)
- **NEXT_PUBLIC_SITE_URL**: Site URL used in metadata (Open Graph, Twitter Cards, etc.)

## 📝 Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗂️ Content Management (Keystatic)

### Access Admin UI

- **Development**: `http://localhost:3000/keystatic`
- **Production**: `https://alphatoncapital.com/keystatic`
- **Login**: Use the password set in `KEYSTATIC_PASSWORD`

### Content Types

#### News Articles

- **Location**: `content/news/[slug]/`
- **Use Case**: External press releases and news coverage
- **Fields**: 
  - Title (used to generate slug)
  - Date
  - Sources (array with name + URL) - can add multiple
  - Summary (optional)
  - Content (rich text editor)
  - Published (checkbox)
- **Display**: 
  - Homepage "In the News" section
  - Detail pages at `/news/[slug]` (internal articles only)

**Adding News Articles:**
1. Go to `https://alphatoncapital.com/keystatic` (production) or `http://localhost:3000/keystatic` (development)
2. Click "News Articles" → "Create entry"
3. Fill in the form and click "Save"
4. Article is saved in `content/news/[slug]/` with `index.yaml` and `content.mdoc`

#### Blog Posts

- **Location**: `content/posts/[slug]/`
- **Use Case**: Original company content
- **Fields**:
  - Title
  - Date
  - Excerpt
  - Content (rich text editor)
  - Featured Image (optional)
  - Published (checkbox)
- **Display**: 
  - Listing page at `/posts`
  - Detail pages at `/posts/[slug]`

**Adding Blog Posts:**
1. Go to `https://alphatoncapital.com/keystatic` (production) or `http://localhost:3000/keystatic` (development)
2. Click "Blog Posts" → "Create entry"
3. Fill in the form and click "Save"
4. Post is saved in `content/posts/[slug]/` with `index.yaml` and `content.mdoc`

### Content Structure

Content is stored in directory structure:
- **News**: `content/news/[slug]/index.yaml` + `content.mdoc`
- **Posts**: `content/posts/[slug]/index.yaml` + `content.mdoc`

### Content Workflow

1. Access Keystatic admin UI
2. Create/edit entries through form interface
3. Changes saved as files in Git
4. Commit and push to trigger deployment (on Vercel)

### Benefits

- ✅ FREE forever (no monthly costs)
- ✅ Version controlled (all changes in Git)
- ✅ No external services required
- ✅ Perfect Vercel integration
- ✅ Easy to edit via admin UI or directly in files

## 🔌 API Routes

### Contact Forms

#### `/api/contact/media` (POST)

Handles media contact form submissions.

- **Body**: `{ fullName: string, email: string, message: string }`
- **Validation**: Email format, required fields
- **Response**: Sends email via Resend to `info@alphatoncapital.com`

#### `/api/contact/investor` (POST)

Handles investor relations form submissions.

- **Body**: `{ fullName: string, email: string, message: string }`
- **Validation**: Email format, required fields
- **Response**: Sends email via Resend to `ir@alphatoncapital.com`

#### `/api/subscribe` (POST)

Handles newsletter subscriptions.

- **Body**: `{ email: string }`
- **Validation**: Email format
- **Response**: 
  - Sends confirmation email to subscriber
  - Sends notification email to admin

### Keystatic Authentication

#### `/api/keystatic/auth` (POST)

Handles Keystatic CMS authentication.

- **Body**: `{ password: string }`
- **Validation**: Matches `KEYSTATIC_PASSWORD`
- **Response**: Creates secure HTTP-only session cookies

### Media Kit

#### `/api/media-kit` (GET)

Serves the media kit zip file for download.

- **Response**: Downloads `public/assets/media_kit.zip`

## 📄 Page Routes

### Static Pages
- `/` - Homepage with hero, sections, news, and footer
- `/branding` - Branding guidelines and assets
- `/posts` - Blog posts listing

### Dynamic Pages (SSG)
- `/news/[slug]` - News article detail (only internal articles)
  - Loading state: `app/news/[slug]/loading.tsx`
- `/posts/[slug]` - Blog post detail
  - Loading state: `app/posts/[slug]/loading.tsx`

### SEO & Error Pages
- `/robots.txt` - Dynamic robots.txt (generated from `app/robots.ts`)
- `/sitemap.xml` - Dynamic sitemap (generated from `app/sitemap.ts`)
- `/404` - Custom not-found page (`app/not-found.tsx`)

### Admin Pages
- `/keystatic` - CMS admin UI
- `/keystatic/login` - CMS login page

## 🎨 Styling & Design

### Tailwind CSS

- **Configuration**: `tailwind.config.ts`
- **Custom Colors**: 
  - `alphaton-dark` - rgb(10,10,10)
  - `alphaton-purple` - rgb(43,30,59)
  - `alphaton-blue` - rgb(62,123,250)
  - `alphaton-purple-light` - rgb(110,69,226)
- **Custom Gradients**: 
  - `gradient-hero` - Vertical gradient for hero section
  - `gradient-cta` - Diagonal gradient for CTA buttons
  - `gradient-investor` - Vertical gradient for investor section
- **Responsive Breakpoints**: sm, md, lg, xl

### Global Styles

- CSS Reset included in `app/globals.css`
- Custom cursor implementation
- Mobile optimizations

### Fonts

- **Primary Font**: Red Hat Display (Google Fonts)
- Loaded in `app/layout.tsx`

## 🛡️ Security Considerations

### Implemented Security Measures

- ✅ **HTTP-only cookies** for Keystatic sessions
- ✅ **Secure cookies** in production (HTTPS only)
- ✅ **Rate limiting** on API routes (10 requests/minute per IP via `middleware.ts`)
- ✅ **Content Security Policy (CSP)** headers with strict directives
- ✅ **Security headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- ✅ **HTML sanitization**: DOMPurify for client-side + basic server-side sanitization
- ✅ **Form input validation**: Email format, required fields, length limits (client & server-side)
  - Full Name: max 100 chars
  - Email: max 255 chars
  - Message: max 5000 chars
- ✅ **Environment variable validation** in API routes
- ✅ **Development-only error logging** (all console.error calls wrapped)
- ✅ **Input sanitization** in email templates

### Rate Limiting Details

- **Implementation**: `middleware.ts` with in-memory storage
- **Limit**: 10 requests per minute per IP address
- **Scope**: Applies to all `/api/*` routes (excludes Keystatic routes)
- **Response**: Returns 429 status with Retry-After header
- **Note**: For production at scale, consider Redis/Upstash/Vercel Edge Config

### CSRF Protection

- Next.js provides built-in CSRF protection for same-origin POST requests
- Forms submit to same-origin API routes, which are protected by default
- Explicit CSRF tokens can be added if needed, but not critical for this use case

### Security Headers

All security headers are configured in `next.config.js`:
- Content-Security-Policy with strict directives
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy configured

### Regular Maintenance

- ✅ Dependencies: Run `npm audit` regularly (currently 0 vulnerabilities)

## 🐛 Error Handling

### Current Implementation

- ✅ **Error boundaries**: `app/error.tsx` (route-level) and `app/global-error.tsx` (global)
- ✅ **Custom 404 page**: `app/not-found.tsx` with branded design
- ✅ **API routes**: Return appropriate HTTP status codes
- ✅ **Error logging**: Development-only (all `console.error` calls wrapped)
- ✅ **Graceful fallbacks**: Missing content handled gracefully
- ✅ **Try-catch blocks**: All async operations protected
- ✅ **Loading states**: Skeleton loading for dynamic routes (`app/news/[slug]/loading.tsx`, `app/posts/[slug]/loading.tsx`)

### Error Logging Locations

All error logging is development-only:
- ✅ `components/NewsSection.tsx`
- ✅ `app/media-kit/route.ts`
- ✅ `app/posts/page.tsx`
- ✅ `lib/keystatic-posts.ts`
- ✅ `lib/markdoc-renderer.tsx`
- ✅ All API routes
- ✅ Error boundaries (error.tsx, global-error.tsx)

## 📦 Dependencies

### Production

- `next` (16.0.1) - React framework
- `react` (19.2.0) - UI library
- `react-dom` (19.2.0) - React DOM renderer
- `@keystatic/core` (0.5.48) - CMS core
- `@keystatic/next` (5.0.4) - Next.js integration
- `resend` (6.4.0) - Email service
- `dompurify` - HTML sanitization for XSS protection
- `js-yaml` (4.1.0) - YAML parsing

### Development

- `typescript` (5.9.3) - Type checking
- `tailwindcss` (3.4.18) - CSS framework
- `autoprefixer` (10.4.21) - CSS processing
- `postcss` (8.5.6) - CSS transformation

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - Add all variables from `env.example`:
     - `RESEND_API_KEY` - For contact forms and newsletter
     - `RESEND_FROM_EMAIL` - Sender email (must be verified in Resend)
     - `RESEND_TO_EMAIL` - Recipient email
     - `KEYSTATIC_PASSWORD` - CMS admin password
     - `KEYSTATIC_SESSION_SECRET` - Secure random string (32+ chars)
     - `NEXT_PUBLIC_SITE_URL` - Production site URL

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your admin UI will be available at `https://alphatoncapital.com/keystatic`

### Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)

### Access Admin UI in Production

- Visit `https://alphatoncapital.com/keystatic` to manage content
- Changes are committed to Git and trigger new deployments
- No additional services or databases needed!

### Manual Deployment

```bash
npm run build
npm run start
```

## 📦 Assets

Local assets are stored in `public/assets/`:

- **Logos**: `public/assets/logos/` - Company logo variants
- **Icons**: `public/assets/icons/` - Favicons and UI icons
- **Partners**: `public/assets/partners/` - Partner/investor logos
- **Leadership**: `public/assets/leadership/` - Team member photos
- **Graphics**: `public/assets/graphics/` - SVG illustrations
- **Media Kit**: `public/assets/media_kit/` - Branding assets (downloadable via `/media-kit`)

See `public/assets/README.md` for detailed asset organization.

## 🔍 Code Quality

### Strengths

- ✅ TypeScript strict mode enabled
- ✅ Consistent error handling patterns
- ✅ Clean component structure
- ✅ Responsive design throughout
- ✅ SEO metadata configured
- ✅ Accessibility considerations (ARIA labels)
- ✅ Production-ready error logging

### Code Quality Status

- ✅ All critical security measures implemented
- ✅ Error boundaries and error handling in place
- ✅ Rate limiting configured
- ✅ Some type assertions (`as any`) in library files (acceptable for Keystatic integration)

## 🧪 Testing

### Manual Testing Checklist

- [ ] All contact forms submit successfully
- [ ] Newsletter subscription works
- [ ] CMS admin UI accessible and functional
- [ ] News articles display correctly
- [ ] Blog posts render properly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] SEO metadata displays correctly
- [ ] Open Graph images load

### Automated Testing (Future Recommendations)

- Consider adding:
  - Unit tests for utility functions
  - Integration tests for API routes
  - E2E tests for critical user flows

## 📚 Key Files Reference

### Configuration Files

- `next.config.js` - Next.js configuration (redirects, images, experiments, security headers)
- `middleware.ts` - Rate limiting middleware
- `tsconfig.json` - TypeScript configuration (strict mode enabled)
- `tailwind.config.ts` - Tailwind CSS configuration
- `keystatic.config.ts` - CMS configuration
- `.gitignore` - Git ignore rules
- `env.example` - Environment variable template

### Core Application Files

- `app/layout.tsx` - Root layout with SEO metadata
- `app/page.tsx` - Homepage
- `app/error.tsx` - Error boundary for route segments
- `app/global-error.tsx` - Global error boundary
- `app/not-found.tsx` - Custom 404 page
- `app/robots.ts` - Dynamic robots.txt generator
- `app/sitemap.ts` - Dynamic sitemap.xml generator
- `middleware.ts` - Rate limiting middleware
- `components/Hero.tsx` - Hero section with plane animation
- `lib/keystatic.ts` - News articles utilities
- `lib/keystatic-posts.ts` - Blog posts utilities
- `lib/markdoc-renderer.tsx` - Markdoc content rendering with HTML sanitization
- `lib/SanitizedHTML.tsx` - Client-side HTML sanitization component

## 📞 Support & Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Keystatic Docs](https://keystatic.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Resend Docs](https://resend.com/docs)

### Internal Resources

- `env.example` - Environment variable template with descriptions
- `public/assets/README.md` - Asset organization guide

## ✅ Production Readiness

### Completed Security & Performance Features

All critical production items have been implemented:

1. ✅ **Error Boundaries** - Route-level and global error boundaries with user-friendly UI
2. ✅ **Custom 404 Page** - Branded not-found page
3. ✅ **HTML Sanitization** - DOMPurify + server-side sanitization for XSS protection
4. ✅ **Form Input Limits** - Client and server-side validation with length limits
5. ✅ **Environment Variable Validation** - Production checks in API routes
6. ✅ **SEO Files** - Dynamic robots.txt and sitemap.xml
7. ✅ **Rate Limiting** - 10 requests/minute per IP on API routes
8. ✅ **Security Headers** - Comprehensive CSP and security headers
9. ✅ **Loading States** - Skeleton loading for dynamic routes

### Future Enhancements (Optional)

- Analytics integration (Google Analytics, Plausible, etc.)
- Error tracking service (Sentry, LogRocket)
- Performance monitoring (Vercel Analytics)
- Enhanced rate limiting (Redis/Upstash for distributed systems)
- Explicit CSRF tokens (optional - Next.js provides basic protection)

## 🎯 Quick Start for New Developers

1. Clone repository
2. Run `npm install`
3. Copy `env.example` to `.env.local` and fill in values
4. Run `npm run dev`
5. Visit `http://localhost:3000` (development) or `https://alphatoncapital.com` (production)
6. Access CMS at `http://localhost:3000/keystatic` (development) or `https://alphatoncapital.com/keystatic` (production)
7. Read this README for detailed information

## 🎨 Features

- **Animated Hero Section** - Plane animation with multi-layer effects
- **Contact Forms** - Media relations, investor relations, and newsletter subscription (with input validation)
- **News System** - External news articles with source linking
- **Blog System** - Internal blog posts with rich content
- **Branding Page** - Complete branding guidelines and assets
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **SEO Optimized** - Comprehensive metadata, Open Graph, Twitter Cards, robots.txt, and sitemap.xml
- **Security Features** - Rate limiting, CSP headers, HTML sanitization, input validation
- **Error Handling** - Error boundaries, custom 404 page, graceful fallbacks
- **Loading States** - Skeleton loading animations for better UX

## 📄 License

ISC

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: Current date
