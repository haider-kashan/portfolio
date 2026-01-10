# ⚡ Kashan Haider | Full Stack Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-orange?style=for-the-badge&logo=pnpm&logoColor=white)

  <br />
  <br />

  <img src="https://via.placeholder.com/800x400.png?text=Portfolio+Preview+(Coming+Soon)" alt="Portfolio Screenshot" width="100%">

  <p align="center">
    A high-performance personal portfolio website built with Next.js 16 and Sanity.io.
    <br />
    <br />
    <a href="#"><strong>🔴 View Live Demo (Coming Soon) »</strong></a>
    <br />
    <br />
    <a href="https://github.com/haider-kashan/portfolio/issues">Report Bug</a>
    ·
    <a href="https://github.com/haider-kashan/portfolio/issues">Request Feature</a>
  </p>
</div>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Performance](#performance)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## 🔭 Overview

This repository hosts the source code for my personal portfolio. It is designed to be a showcase of modern web development practices, focusing on **performance**, **accessibility**, and **dynamic content management**.

Unlike static portfolios, this site uses a "Headless CMS" architecture. This means I can update my projects, blogs, and experience details instantly via Sanity Studio without touching a single line of code or redeploying the site.

---

## 🛠️ Built With

This project leverages the latest features of the React ecosystem:

- **[Next.js 16](https://nextjs.org/)** - The React Framework for the Web (App Router).
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development.
- **[Sanity.io](https://www.sanity.io/)** - Headless CMS for managing structured content.
- **[TypeScript](https://www.typescriptlang.org/)** - For type safety and better developer experience.

---

## ✨ Features

- **🎨 Modern UI/UX:** Clean, dark-themed aesthetic with responsive layouts.
- **🚀 Dynamic Content:** Projects and About sections are fetched in real-time from Sanity.
- **⚡ Server Side Rendering (SSR):** Optimized for SEO and fast initial page loads.
- **📱 Fully Responsive:** optimized for Mobile, Tablet, and Desktop.
- **🖼️ Image Optimization:** Uses `next/image` with Sanity's image CDN.

---

## 🚀 Getting Started

To run this project locally, follow these steps.

### Prerequisites

You need Node.js installed. I use **pnpm** for package management because it is faster and more efficient.

- **Install pnpm (if you don't have it):**

Installation

```bash
npm install -g pnpm
```

Clone the repository

```bash
git clone https://github.com/haider-kashan/portfolio.git
```

Navigate to the project folder

```bash
cd portfolio
```

Install dependencies

```bash
pnpm install
```

Run the development server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

---

## 🚀 Deployment

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, etc.) in the Vercel dashboard.
4. Click **Deploy**.

---

## 🔑 Environment Variables

This project uses Sanity.io. To run it locally, you must create a .env.local file in the root directory and add the following keys:

Code snippet

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
Note: You can find your Project ID in your Sanity Dashboard.
```

---

## 📂 Project Structure

```bash
.
├── app/                # Next.js App Router
│ ├── (portfolio)/      # Main portfolio routes (Route Group)
│ │ ├── page.tsx        # Homepage
│ │ └── ...             # Legal pages (Privacy, Terms)
│ ├── (sanity)/studio/  # Sanity Studio CMS embedded route
│ ├── actions/          # Server Actions (Contact form, Draft mode)
│ └── globals.css       # Global styles & Tailwind directives
├── components/         # React Components
│ ├── sections/         # Major page sections (Hero, About, Projects)
│ ├── ui/               # Reusable UI atoms (Buttons, Cards, Animated elements)
│ ├── FloatingDock.tsx  # Navigation components
│ └── ThemeProvider.tsx # Dark/Light mode context
├── sanity/             # Sanity CMS Configuration
│ ├── schemaTypes/      # Data models (Projects, Experience, Blogs)
│ ├── lib/              # Sanity client & image url builder
│ ├── env.ts            # Environment variable validation
│ └── structure.ts      # Custom Studio desk structure
├── hooks/              # Custom React Hooks
├── public/             # Static assets (images, icons)
├── biome.json          # Linter and Formatter configuration
├── next.config.ts      # Next.js configuration
├── sanity-cli.ts       # Sanity CLI configuration
└── pnpm-lock.yaml      # Dependency lock file
```

---

## ⚡ Performance

I focused heavily on Core Web Vitals. Here are the Lighthouse scores for the live build:(To be updated)

<div align="center">

![Performance](https://img.shields.io/badge/Performance-100-success?style=for-the-badge&logo=lighthouse&logoColor=white)
![Accessibility](https://img.shields.io/badge/Accessibility-100-success?style=for-the-badge&logo=accessibility&logoColor=white)
![Best_Practices](https://img.shields.io/badge/Best_Practices-100-success?style=for-the-badge&logo=google&logoColor=white)
![SEO](https://img.shields.io/badge/SEO-100-success?style=for-the-badge&logo=google-search-console&logoColor=white)

</div>

---

## 🤝 Contact

**Kashan Haider**

- **GitHub:** [haider-kashan](https://github.com/haider-kashan)
- **LinkedIn:** [Kashan Haider](www.linkedin.com/in/haider-kashan)
- **Email:** [kashanhaider0209@gmail.com](mailto:kashanhaider0209@gmail.com)

---

## 🙏 Acknowledgements

Resources and people that inspired this project:

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sonny Sangha](https://www.youtube.com/c/SonnySangha) (For the inspiration)
- [Tailwind UI](https://tailwindui.com)
