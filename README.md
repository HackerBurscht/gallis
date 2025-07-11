TODO:
- Newsbadge -> Overlay-Styling

- Bilder
- Speisekarte (PDF)
- Gallery-sslideshow-Bug mobile
- ultrawide monitors


# ✅ Website Deployment Checklist

## 1. Code & Functionality
- [x] All pages load correctly (no 404s or errors)
- [x] Forms work and validate correctly
- [ ] No broken links (internal or external)
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Console is free of JavaScript errors
- [ ] Third-party services (APIs, payments, embeds) are integrated and tested

## 2. Performance Optimization
- [ ] Images are optimized (compressed without quality loss)
- [ ] CSS/JS is minified
- [x] Lazy loading is enabled for large assets
- [ ] Code splitting and tree shaking (if using frameworks like React/Vue)
- [ ] CDN is configured for static assets (if needed)
- [ ] Lighthouse or PageSpeed scores are acceptable

## 3. SEO & Metadata
- [x] Title tags and meta descriptions for all pages
- [x] Open Graph and Twitter meta tags for social sharing
- [x] Sitemap.xml is generated and linked in robots.txt
- [x] Robots.txt is present and configured correctly
- [ ] Canonical tags are set to avoid duplicate content
- [ ] H1-H6 hierarchy is logical

## 4. Security
- [ ] HTTPS is enforced (SSL/TLS installed)
- [ ] Environment variables are not exposed
- [ ] Input validation & sanitization is in place
- [ ] Admin/dashboard is secure and requires authentication
- [ ] CORS is configured correctly (especially for APIs)
- [ ] Dependencies are up-to-date (no known vulnerabilities)

## 5. Analytics & Monitoring
- [ ] Google Analytics (or alternative) is installed
- [ ] Error logging (e.g., Sentry) is set up
- [ ] Performance monitoring is in place
- [ ] Uptime monitoring configured

## 6. Accessibility (a11y)
- [ ] Images have alt text
- [ ] Forms have associated labels
- [ ] Keyboard navigation is supported
- [ ] ARIA attributes used where needed
- [ ] Contrast ratios meet WCAG standards


## 8. Deployment Readiness
- [ ] Domain name is pointed to the correct server
- [ ] Hosting configuration (e.g., Nginx, Apache, Vercel, Netlify) is correct
- [ ] Build tools (Webpack, Next.js, etc.) configured for production
- [ ] CI/CD pipeline tested (if used)
- [ ] Fallback 404 page and custom error pages configured

## 9. Legal and Compliance
- [ ] Cookie consent banner (if needed)
- [ ] Privacy policy & terms of service pages
- [x] GDPR compliance (for EU audiences)

