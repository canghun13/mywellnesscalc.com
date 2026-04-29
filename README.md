# DailyWellnessTools.com

Free, science-backed health calculators. Built as a static site for GitHub Pages deployment.

---

## 📁 Site Structure

```
/
├── index.html                    ← Homepage
├── about.html                    ← About page
├── privacy-policy.html           ← Privacy policy (required for AdSense)
├── sitemap.xml                   ← SEO sitemap
├── robots.txt                    ← SEO robots file
├── tools/
│   ├── bmi-calculator.html       ✅ Complete
│   ├── calorie-calculator.html   ✅ Complete
│   ├── water-intake.html         ✅ Complete
│   ├── sleep-calculator.html     ✅ Complete
│   ├── if-calculator.html        ✅ Complete
│   ├── macro-calculator.html     ✅ Complete
│   ├── body-fat-calculator.html  ✅ Complete
│   ├── ideal-weight.html         ✅ Complete
│   └── running-pace.html         ✅ Complete
└── blog/
    ├── index.html                ✅ Complete
    └── intermittent-fasting-beginners.html  ✅ Complete
```

---

## 🚀 GitHub Pages Deployment Steps

### 1. Create GitHub Repository
```bash
# Create a new repo named: dailywellnesstools.com (or any name)
# Go to github.com → New repository → Public
```

### 2. Upload Files
```bash
git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dailywellnesstools.com.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to your repo → Settings → Pages
- Source: Deploy from a branch
- Branch: `main` / `root`
- Save → site will be live at `https://YOUR_USERNAME.github.io/dailywellnesstools.com`

### 4. Connect Custom Domain
- Buy domain (Namecheap / Cloudflare recommended)
- In GitHub Pages settings: enter `dailywellnesstools.com` as custom domain
- In your DNS provider, add:
  ```
  Type: A     Name: @    Value: 185.199.108.153
  Type: A     Name: @    Value: 185.199.109.153
  Type: A     Name: @    Value: 185.199.110.153
  Type: A     Name: @    Value: 185.199.111.153
  Type: CNAME Name: www  Value: YOUR_USERNAME.github.io
  ```
- Check "Enforce HTTPS" in GitHub Pages settings

---

## 💰 Monetization Setup

### Google AdSense
1. Go to https://adsense.google.com → Apply for AdSense
2. Add verification code to `<head>` of `index.html`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>
   ```
3. Replace the `<div class="ad-banner">` placeholders with real AdSense ad units
4. Wait for approval (typically 2–4 weeks; requires real content)

**AdSense placement in this site:**
- Homepage: 728×90 leaderboard (top + bottom)
- Tool pages: 300×250 sidebar (×2)
- Blog posts: 300×250 sidebar + in-content

### iHerb Affiliate Program
1. Sign up: https://ca.iherb.com/info/affiliates
2. Get your referral code (e.g., `XYZ1234`)
3. Replace `YOUR_CODE` in all affiliate links:
   ```
   Find: rcode=YOUR_CODE
   Replace: rcode=XYZ1234
   ```
   Files to update: bmi-calculator.html, calorie-calculator.html, water-intake.html, sleep-calculator.html, if-calculator.html, macro-calculator.html, body-fat-calculator.html

### Other Affiliate Options
- **MyFitnessPal** (app): https://www.myfitnesspal.com/affiliate
- **Fitbit / Garmin**: Amazon Associates for fitness trackers
- **Amazon Associates**: https://affiliate-program.amazon.com

---

## 📊 SEO Checklist

- [x] Unique title + meta description on every page
- [x] Canonical URLs on every page
- [x] sitemap.xml generated
- [x] robots.txt configured
- [x] Privacy policy page (required for AdSense)
- [x] Schema markup: Add JSON-LD to tool pages (optional but helpful)
- [ ] Google Search Console: Submit sitemap after launch
  - https://search.google.com/search-console
  - Add property → submit `https://dailywellnesstools.com/sitemap.xml`
- [ ] Google Analytics: Add GA4 tracking code to all pages

### Google Analytics (GA4) — add to every page `<head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 📅 Content Roadmap (suggested)

### Month 1–2: Foundation
- [x] 9 core calculator tools
- [x] 1 full blog post
- [ ] 4 more blog posts (see blog/index.html for planned posts)
- [ ] Submit to Google Search Console
- [ ] Apply for AdSense

### Month 3–4: Growth
- [ ] Add 3 more tools (pregnancy calculator, alcohol metabolism, stress quiz)
- [ ] 6 more blog posts
- [ ] Begin iHerb affiliate link optimization

### Month 5–12: Monetization Focus
- [ ] A/B test ad placements
- [ ] Add email capture (optional: Mailchimp free tier)
- [ ] Build backlinks via free tool submissions (HealthLine, etc.)
- [ ] Expand to Spanish (duplicate pages + translate)

---

## 🔧 Updating the Site

Since this is pure HTML/CSS/JS with no build system:

1. Edit the HTML file directly
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: add new blog post"
   git push
   ```
3. GitHub Pages auto-deploys in ~60 seconds

---

## 📝 Blog Post Template

Copy `blog/intermittent-fasting-beginners.html` and:
1. Update `<title>`, `<meta description>`, `<link rel="canonical">`
2. Replace article content
3. Update breadcrumb text
4. Add to `blog/index.html`
5. Add to `sitemap.xml`

---

## 💡 Notes

- All calculations run client-side (JavaScript) — no server needed
- No user data is stored or transmitted
- iHerb affiliate links are marked with "Partner" badge (FTC compliance)
- All pages include "Not medical advice" disclaimer
