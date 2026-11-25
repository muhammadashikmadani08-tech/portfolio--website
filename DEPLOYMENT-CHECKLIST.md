# Deployment Checklist — Portfolio Website

Deploy-এর আগে প্রতিটি লাইনে টিক দাও।

## Before deploy — Content

- [ ] `assets/js/config.js`-এ আসল নাম ঠিক আছে
- [ ] `role` / পেশা আসলটা বসানো হয়েছে (উদাহরণ মুছে ফেলা হয়েছে)
- [ ] `bio` নিজের ভাষায় লেখা হয়েছে
- [ ] আসল ইমেইল বসানো হয়েছে (`you@example.com` আর নেই)
- [ ] GitHub লিংক ঠিক আছে
- [ ] Facebook লিংক ঠিক আছে, অথবা খালি রাখা হয়েছে
- [ ] Services — নিজের সার্ভিসগুলো বসানো হয়েছে
- [ ] Projects — নিজের প্রজেক্টগুলো বসানো হয়েছে (বা উদাহরণ মুছে ফেলা হয়েছে)
- [ ] Stats — আসল সংখ্যা বসানো হয়েছে (উদাহরণ সংখ্যা নয়)
- [ ] Tools — নিজের টুলগুলো বসানো হয়েছে
- [ ] `assets/images/profile-photo.png` — আসল ছবি আছে

## Before deploy — Security / Secrets

- [ ] Code-এ কোথাও আসল API key / password / token নেই
- [ ] `.env` নামে কোনো আসল ফাইল নেই / upload হচ্ছে না
- [ ] `.gitignore`-এ `.env` আছে
- [ ] `.env.example`-এ শুধু fake উদাহরণ আছে
- [ ] Contact form-এ ভুল ইমেইল দিলে validation মেসেজ আসে

## GitHub upload

- [ ] GitHub account আছে
- [ ] Repository তৈরি হয়েছে (নাম মনে আছে: _______________)
- [ ] সব ফাইল/ফোল্ডার upload হয়েছে (`index.html`, `assets/`, `admin/`, `README.md`)
- [ ] লুকানো ফাইল (`.gitignore`, `.nojekyll`) আছে কি না দেখা হয়েছে
- [ ] Commit হয়েছে

## Hosting (GitHub Pages)

- [ ] Settings → Pages খোলা হয়েছে
- [ ] Source: Deploy from a branch
- [ ] Branch: `main`, Folder: `/ (root)`, Save করা হয়েছে
- [ ] লাইভ ঠিকানা পাওয়া গেছে: ________________________________________
- [ ] Environment variables: কিছুই লাগে না — কিছু যোগ করা হয়নি (Formspree ছাড়া)

## Optional — only if used

- [ ] Formspree: Form ID `config.js`-এ বসানো হয়েছে (না ব্যবহার করলে skip)
- [ ] Custom domain: DNS CNAME বসানো হয়েছে + Pages-এ domain লেখা হয়েছে + Enforce HTTPS চালু (না থাকলে skip)
- [ ] Netlify/Vercel: Build command খালি, Publish directory `.` (GitHub Pages ব্যবহার করলে skip)

## After deploy — Test

- [ ] লাইভ লিংক খুলছে
- [ ] কম্পিউটারে ডিজাইন ঠিক আছে
- [ ] মোবাইলে মেনু (☰) খুলছে ও লিংক কাজ করছে
- [ ] ছবি দেখা যাচ্ছে (hero + About)
- [ ] Services দেখা যাচ্ছে
- [ ] Projects ফিল্টার কাজ করছে (All + প্রতিটি category)
- [ ] Contact form validation কাজ করছে
- [ ] Contact form থেকে mailto draft / Formspree কাজ করছে
- [ ] GitHub / ইমেইল লিংক কাজ করছে
- [ ] ভুল URL-এ 404 পেজ দেখাচ্ছে

## After every update

- [ ] `config.js` বদলে GitHub-এ push করা হয়েছে
- [ ] ১–২ মিনিট অপেক্ষা করে লাইভ সাইটে বদল দেখা হয়েছে
