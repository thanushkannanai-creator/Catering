# Shanvik Catering Events

A modern, responsive catering website built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Hero Section**: Full-width video background with animated text
- **Our Story**: Beautiful parallax image gallery and company history
- **Catering Services**: Animated service cards for Wedding, Corporate, and Private events
- **Menu Showcase**: Interactive carousel with multiple menu categories
- **Gallery**: Filterable image gallery with lightbox view and categories
- **Testimonials**: Client testimonials slider with Instagram integration
- **Blog**: Blog listing and detail pages
- **Contact Form**: Form with WhatsApp integration
- **Admin Dashboard**: Secure admin panel for content management
- **Responsive Design**: Mobile-first design with smooth animations
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Supabase (Database & Auth)
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Database Setup

The project uses Supabase for database and authentication. The schema migration file is located at:

```
supabase/migrations/001_initial_schema.sql
```

### Tables:
- `gallery_images` - Event photos organized by category
- `testimonials` - Client reviews and video testimonials
- `blog_posts` - Blog articles with SEO-friendly slugs
- `contact_inquiries` - Contact form submissions
- `menu_items` - Menu items by category

## Admin Panel

Access the admin dashboard at `/admin/login`

### Demo Credentials:
- Email: `admin@shanvikcateringevents.com`
- Password: `admin@ShanvikEventsCatering`

### Admin Features:
- Upload and manage gallery images
- Add/edit testimonials
- Create and publish blog posts
- View contact inquiries
- Manage menu items

## WhatsApp Integration

The contact form includes WhatsApp integration. When users check the "Connect via WhatsApp" option, it opens WhatsApp with a pre-filled message to: **+91 98406 50939**

## Pages

- `/` - Home page with all sections
- `/gallery` - Photo gallery with category filters
- `/blog` - Blog post listing
- `/blog/:slug` - Individual blog post
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard

## Deployment

### Recommended Platforms:
- **Frontend**: Vercel, Netlify, or Cloudflare Pages
- **Database**: Supabase (already configured)

### Environment Variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Customization

### Colors:
The project uses an amber color scheme. To change colors, update the Tailwind config:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {...}, // Your custom colors
    }
  }
}
```

### Content:
- Update copy in component files
- Replace placeholder images with actual photos
- Update contact information in Contact component
- Modify menu items and service descriptions

## Performance

- Lazy-loaded images
- Optimized video background with poster
- Code splitting with React Router
- Framer Motion for smooth animations
- Tailwind CSS for minimal bundle size

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Alt text for all images
- Proper color contrast ratios

## Contact

Phone: +91 98406 50939
Email: info@shanvikcateringevents.com
Instagram: @shanvikcateringevents

---

Made by Thanush, Santhosh, Kathick
