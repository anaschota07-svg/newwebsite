# SimpleWebToolsBox - Deployment Guide

## 🚀 Quick Deploy to Vercel

The easiest way to deploy this Next.js app is using Vercel:

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and configure everything
5. Click "Deploy"

## 📝 Before Deploying

### 1. Update Domain in Files

Replace `simplewebtoolsbox.com` with your actual domain in:
- `app/layout.tsx` (metadata baseUrl)
- `app/sitemap.ts` (baseUrl)
- `app/robots.ts` (sitemap URL)
- `README.md`

### 2. Add Google AdSense

After getting approved:

1. Add your AdSense code to `app/layout.tsx` in the `<head>` section
2. Replace ad placeholders in components with actual AdSense code
3. Update `app/layout.tsx` metadata with your Google verification code

Example AdSense script:
```tsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
  crossOrigin="anonymous"
></script>
```

### 3. Set Up Analytics (Optional)

Add Google Analytics 4:

```tsx
// In app/layout.tsx <head>
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

## 🔧 Environment Variables

Create `.env.local` file if needed:

```env
# Add any environment variables here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📊 Performance Optimization Checklist

✅ Images optimized (use Next.js Image component)
✅ Code splitting enabled (Next.js default)
✅ CSS optimized with Tailwind
✅ Fonts optimized (using next/font)
✅ Metadata for SEO
✅ Sitemap generated
✅ Robots.txt configured

## 🧪 Testing Before Deployment

```bash
# Build and test locally
npm run build
npm start

# Check for build errors
# Test all pages
# Verify dark/light theme works
# Test all tools functionality
# Check mobile responsiveness
```

## 🌍 Custom Domain Setup

### On Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate to be generated (automatic)

### DNS Configuration:
Add these records to your domain:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 📈 Post-Deployment

1. Submit sitemap to Google Search Console
2. Monitor with Google Analytics
3. Apply for Google AdSense (if not already approved)
4. Test all functionality on production
5. Set up monitoring (Vercel provides built-in analytics)

## 🔄 Updating Content

### Adding New Tools:
1. Add tool data to `data/tools/toolsData.ts`
2. Create component in `components/tools/`
3. Add to `toolComponents` in `app/tools/[slug]/page.tsx`
4. Add content in `toolContent` object

### Adding Blog Posts:
1. Add post data to `data/blog/blogData.ts`
2. Add content to `blogContent` in `app/blog/[slug]/page.tsx`

## 🐛 Troubleshooting

### Build Errors:
- Check all imports are correct
- Ensure all required files exist
- Run `npm install` to update dependencies

### Styling Issues:
- Clear `.next` folder and rebuild
- Check Tailwind config is correct
- Verify all CSS classes exist

### Performance Issues:
- Use Lighthouse to identify bottlenecks
- Optimize images
- Check for unnecessary re-renders

## 📞 Support

For issues or questions:
- Check Next.js documentation
- Review Vercel deployment docs
- Open an issue on GitHub

---

Good luck with your deployment! 🚀
