# Muhammad Ashik Madani — Personal Portfolio Website

একটি সম্পূর্ণ স্ট্যাটিক পোর্টফোলিও ওয়েবসাইট। কোনো build step, backend, database বা secret ছাড়াই ফ্রিতে deploy করা যায়।

> **গুরুত্বপূর্ণ:** পেশা, সার্ভিস, প্রজেক্ট, stats এবং ইমেইল — এগুলোর অনেকগুলো এখনো **উদাহরণ (example)** হিসেবে আছে, কারণ শুধু নাম ও আসল ছবি পাওয়া গেছে। নিজের আসল তথ্য `assets/js/config.js`-এ বসিয়ে নাও। README-এর শেষে কী বদলাতে হবে, তার তালিকা আছে।

---

## 1. Architecture — কী কী লাগবে, কী লাগবে না

### প্রয়োজনীয় (Required) — সব ফ্রি

| Service | কাজ | Free tier |
|---|---|---|
| **GitHub** | Code রাখা (repository), version control | Free — unlimited public/private repos |
| **GitHub Pages** | Website লাইভ করা (hosting) | Free — 1 GB storage, 100 GB bandwidth/month, HTTPS সহ |
| **তোমার ব্রাউজার** | Code বদলানো, GitHub-এ upload, Pages চালু করা | — |

### Optional (চাইলে ব্যবহার করবে, না করলেও চলবে)

| Service | কাজ | Free tier / সীমা |
|---|---|---|
| **Netlify / Vercel / Cloudflare Pages** | GitHub Pages-এর বদলে hosting (একটাই বেছে নাও) | Free tier আছে; bandwidth/build-minute সীমা থাকে, বর্তমান সীমা তাদের সাইটে দেখে নাও |
| **Custom domain** (যেমন: `ashikmadani.com`) | নিজের ডোমেইন নাম | **Free নয়** — ডোমেইন কিনতে হয় (বছরে টাকা লাগে)। না থাকলে GitHub-এর ফ্রি ঠিকানা ব্যবহার করো |
| **Formspree** | Contact form-এর মেসেজ ইমেইলে পাওয়া | Free tier: 50 submission/month (বর্তমান সীমা formspree.io-তে দেখে নাও)। না ব্যবহার করলে ফর্ম mailto draft হিসেবে কাজ করবে |

### প্রয়োজন নেই — তাই ব্যবহার করা হয়নি

| Service | কেন লাগবে না |
|---|---|
| Backend (Node.js / Express) | সাইটে শুধু তথ্য দেখানো হয়, সার্ভারে কিছু save হয় না |
| Database (Supabase / Firebase) | কোনো login, user data বা dynamic data নেই |
| Authentication / Login | Admin panel সার্ভার ছাড়া local-only (নিচে দেখো) |
| API / API key / `.env` secret | কোনো external API call নেই, তাই কোনো secret নেই |
| Storage / Email service | ছবি repo-তেই আছে; ইমেইল mailto draft দিয়ে হয় |

### Architecture (সহজ ভাষায়)

```
Visitor (Browser)
      |
      |  HTTPS (ফ্রি, hosting দেয়)
      v
GitHub Pages / Netlify / Vercel  ←  Static files: index.html + CSS + JS + photo
      |
      |  git push (তুমি code পাঠাও)
      v
GitHub Repository  ←  তুমি এখানে config.js বদলাও
      |
      +-- admin/index.html (local-only: browser-এ বদলে config.js download করো,
          তারপর GitHub-এ push করলে লাইভ সাইট বদলে যাবে)
```

**Connection কীভাবে হয়:**
1. GitHub repo → Hosting: Hosting-এ GitHub account connect করলে সে repo থেকে ফাইল নিয়ে সাইট বানায়। GitHub Pages-এ কোনো আলাদা connect লাগে না — একই GitHub account-ই hosting।
2. Custom domain → Hosting: Domain provider-এর DNS-এ CNAME/A রেকর্ড বসাতে হয় (Step 7 দেখো)। Domain না থাকলে এই ধাপ skip করো।
3. Formspree → Email: Formspree-এ form তৈরি করে যে Form ID দেবে, সেটা `config.js`-এ বসালে ফর্ম সেখানে যাবে। এটা secret নয়।
4. Environment variables: এই প্রজেক্টে **কোনো environment variable লাগে না**। `.env.example` শুধু উদাহরণ হিসেবে রাখা হয়েছে।

### Technology — কেন HTML/CSS/JavaScript?

React/Vite-এর বদলে plain HTML/CSS/JavaScript বেছে নেওয়া হয়েছে, কারণ:
- কোনো build command লাগে না — ফাইল upload করলেই সাইট চলে।
- GitHub Pages-এ সরাসরি কাজ করে, Node.js install করতে হয় না।
- Beginner-এর জন্য সবচেয়ে সহজ: একটা ফাইল (`config.js`) বদলালেই সব বদলে যায়।
- কোনো dependency নেই, তাই ভাঙার ঝুঁকি কম।

---

## 2. Project Structure

```
portfolio-website/
├── index.html                  # মূল পেজ (Home, Services, About, Projects, Process, Contact)
├── 404.html                    # ভুল লিংকে দেখানোর পেজ
├── robots.txt                  # Search engine-এর জন্য
├── _headers                    # Security headers (Netlify / Cloudflare Pages-এ কাজ করে)
├── netlify.toml                # Netlify-এর জন্য (optional)
├── vercel.json                 # Vercel-এর জন্য (optional)
├── .nojekyll                   # GitHub Pages-কে বলে: ফাইল যেমন আছে তেমন serve করো
├── .gitignore                  # .env ও local ফাইল GitHub-এ যাবে না
├── .env.example                # FAKE উদাহরণ — আসল secret নেই, লাগেও না
├── README.md                   # এই গাইড
├── DEPLOYMENT-CHECKLIST.md     # Deploy-এর আগে/পরে চেকলিস্ট
├── assets/
│   ├── css/
│   │   └── style.css           # পুরো ডিজাইন (সবুজ + হলুদ, responsive)
│   ├── js/
│   │   ├── config.js           # ★ কন্ট্রোল প্যানেল: নাম, সার্ভিস, প্রজেক্ট এখানে বদলাও
│   │   └── script.js           # মেনু, ফিল্টার, ফর্ম validation, mailto draft
│   └── images/
│       ├── profile-photo.png   # আসল ছবি
│       └── favicon.svg         # ব্রাউজার ট্যাবের ছোট আইকন
└── admin/
    └── index.html              # Local-only admin panel (browser-এ preview + config.js download)
```

---

## 3. নিজের তথ্য বদলানো (সবচেয়ে সহজ ধাপ)

1. `assets/js/config.js` খোলো।
2. `name`, `role`, `location`, `bio`, `email` বদলাও।
3. `services`, `projects`, `tools`, `stats` — নিজেরগুলো বসাও। উদাহরণগুলো মুছে ফেলো।
4. ছবি বদলাতে চাইলে `assets/images/profile-photo.png` ফাইলটি একই নামে replace করো।
5. অথবা `admin/index.html` খুলে ফর্মে লিখে **Download updated config.js** চাপো, তারপর সেই ফাইল দিয়ে পুরনো `config.js` replace করো।

> Admin panel সম্পর্কে সত্য কথা: এটা সার্ভার ছাড়া, তাই এতে বদলানো কিছু সরাসরি লাইভ সাইটে যাবে না। Download করা `config.js` GitHub-এ push করলেই লাইভ সাইট বদলাবে। কোনো password নেই, কারণ এখানে কোনো secret রাখা হয় না।

---

## 4. Deployment Guide — Beginner-Friendly (GitHub Pages, ফ্রি)

### Step 1 — GitHub account / repository তৈরি

1. https://github.com খোলো → **Sign up** করে account বানাও (ফ্রি)। আগে account থাকলে **Sign in** করো।
2. ডান ওপরের **+** → **New repository** চাপো।
3. **Repository name:** `portfolio-website` লেখো (বা পছন্দের নাম)।
4. **Public** বেছে নাও (GitHub Pages ফ্রিতে public repo-তে সবচেয়ে সহজ)।
5. **Add a README file**-এ টিক দিও না (এই প্রজেক্টের README আগেই আছে)।
6. **Create repository** চাপো।

### Step 2 — Project GitHub-এ upload

**সহজ উপায় (ব্রাউজার দিয়ে, Git install ছাড়া):**

1. নতুন repo পেজে **uploading an existing file** লিংকে চাপো।
2. এই প্রজেক্টের সব ফাইল/ফোল্ডার (`index.html`, `assets/`, `admin/`, `README.md`, `.gitignore` ইত্যাদি) drag-and-drop করো।
   - ⚠️ `.env.example` ও `.gitignore` — এগুলো dot (`.`) দিয়ে শুরু, লুকানো ফাইল। Upload করার সময় এগুলোও আছে কি না দেখে নাও। `.env` নামে কোনো আসল ফাইল থাকলে upload করবে না — এই প্রজেক্টে সেটা নেই।
3. নিচে **Commit changes** চাপো।

**Git দিয়ে (চাইলে):**

```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git
git push -u origin main
```

`YOUR-USERNAME`-এর জায়গায় তোমার GitHub username বসাও।

### Step 3 — Hosting connect (GitHub Pages)

1. Repo পেজে **Settings** (ওপরের ট্যাব) → বাম মেনুতে **Pages** চাপো।
2. **Build and deployment → Source:** `Deploy from a branch` বেছে নাও।
3. **Branch:** `main` আর folder: `/ (root)` বেছে নাও → **Save** চাপো।
4. কিছুক্ষণ অপেক্ষা করো। ওপরেই তোমার লাইভ ঠিকানা দেখাবে, যেমন:
   `https://YOUR-USERNAME.github.io/portfolio-website/`

এটাই তোমার ফ্রি লাইভ লিংক। Netlify/Vercel ব্যবহার করতে চাইলে Step 3-এর বদলে: সেই সাইটে GitHub দিয়ে login → **Add new site → Import from Git** → repo বেছে নাও → Build command খালি রাখো, Publish directory `.` রাখো → Deploy চাপো।

### Step 4 — Build settings

GitHub Pages-এর জন্য **কোনো build settings লাগে না** — কারণ এটা plain HTML/CSS/JS।

| Setting | Value |
|---|---|
| Build command | *(খালি রাখো)* |
| Publish directory | `/` (root) বা `.` |
| Branch | `main` |

Netlify/Vercel-এও একই: Build command খালি, Publish directory `.`।

### Step 5 — Environment variables যোগ করা

**এই প্রজেক্টে কোনো environment variable লাগে না।** কিছুই যোগ করতে হবে না।

শুধু Formspree ব্যবহার করলে:
1. https://formspree.io-তে ফ্রি account বানাও → **New Form** → ইমেইল দাও।
2. যে Form ID দেবে (যেমন `abcdwxyz`), সেটা `assets/js/config.js`-এ `formspreeFormId: "abcdwxyz"`-এ বসাও।
3. Commit + push করো। এটা secret নয়, তাই `config.js`-এ রাখা নিরাপদ।

### Step 6 — Database connect করা

**Database লাগে না, তাই কিছুই connect করতে হবে না।** কোনো Supabase/Firebase account লাগবে না।

### Step 7 — Domain / DNS connect করা (Optional — না থাকলে skip করো)

Domain না থাকলে এই ধাপ পুরো skip করো, GitHub-এর ফ্রি ঠিকানাই ব্যবহার করো।

Domain থাকলে:
1. Domain provider-এর (যেমন GoDaddy / Namecheap) DNS settings খোলো।
2. GitHub Pages-এর নির্দেশনা অনুযায়ী CNAME রেকর্ড বসাও: Host `@` বা `www`, Value `YOUR-USERNAME.github.io`।
3. GitHub repo → **Settings → Pages → Custom domain**-এ তোমার ডোমেইন লেখো → **Save**।
4. **Enforce HTTPS**-এ টিক দাও। DNS ছড়াতে কয়েক ঘণ্টা লাগতে পারে।

### Step 8 — Deploy

GitHub Pages-এ আলাদা Deploy বোতাম নেই — **`main` branch-এ push করলেই auto-deploy হয়।** প্রতিবার `config.js` বা অন্য ফাইল বদলে push করলে ১–২ মিনিটের মধ্যে লাইভ সাইট আপডেট হবে।

### Step 9 — Website test করা

1. লাইভ লিংক খোলো (Step 3-এর ঠিকানা)।
2. মোবাইল ও কম্পিউটার — দুইভাবেই দেখো: মেনু, ছবি, Services, Projects ফিল্টার ঠিক আছে কি না।
3. Contact form-এ ভুল ইমেইল দিয়ে দেখো — validation মেসেজ আসে কি না। সঠিক তথ্য দিয়ে দেখো — mailto draft / Formspree কাজ করে কি না।
4. `admin/` পেজ খুলে দেখো (শুধু preview-এর জন্য)।
5. কোনো লিংক ভাঙা আছে কি না দেখো (GitHub, ইমেইল)।

---

## 5. Security

- ✅ কোনো API key / secret frontend code-এ নেই। `.env.example`-এ শুধু fake উদাহরণ আছে।
- ✅ `.env` `.gitignore`-এ আছে — ভুল করেও আসল `.env` GitHub-এ যাবে না।
- ✅ Contact form-এ validation আছে: নাম ২+ অক্ষর, সঠিক ইমেইল format, মেসেজ ১০+ অক্ষর, সর্বোচ্চ ২০০০ অক্ষর।
- ✅ User input HTML হিসেবে বসানো হয় না — `script.js`-এ সব লেখা escape করা হয়, তাই `<script>` লিখলেও তা code হিসেবে চলবে না।
- ✅ কোনো `eval()`, কোনো third-party script, কোনো tracking নেই।
- ✅ HTTPS: GitHub Pages / Netlify / Vercel — সবাই ফ্রি HTTPS দেয়। Custom domain-এ **Enforce HTTPS** চালু রাখো।
- ✅ Rate limiting: সাইটে login/backend নেই, তাই server-side rate limit দরকার নেই। Formspree ব্যবহার করলে তার free-tier submission limit-ই rate limit হিসেবে কাজ করে।
- ⚠️ Admin panel-এ কোনো login নেই, কারণ এটা শুধু local preview-এর জন্য। এতে কখনো secret লিখবে না।

---

## 6. Free-tier সীমাবদ্ধতা (সত্য কথা)

- **GitHub Pages:** 1 GB storage, 100 GB bandwidth/month, 10 builds/hour। ব্যক্তিগত পোর্টফোলিওর জন্য যথেষ্ট।
- **Formspree (optional):** Free tier-এ মাসে 50 submission (সীমা বদলাতে পারে — formspree.io-তে দেখে নাও)।
- **Netlify / Vercel / Cloudflare Pages (optional):** Free tier-এ bandwidth ও build-minute সীমা আছে।
- **Custom domain:** ফ্রি নয়, ডোমেইন কিনতে হয়।
- **Admin panel:** সার্ভার ছাড়া, তাই live edit হয় না — config.js download + push করতে হয়।

---

## 7. Deployment Checklist

সম্পূর্ণ চেকলিস্ট `DEPLOYMENT-CHECKLIST.md` ফাইলে আছে। সংক্ষেপে: তথ্য বদলানো হয়েছে → কোনো secret নেই → GitHub-এ upload → Pages চালু → লাইভ লিংক test → মোবাইলে test → ফর্ম test।
