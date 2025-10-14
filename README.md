# Yizhou Chi's Personal Blog

[![Jekyll](https://img.shields.io/badge/Jekyll-4.0-red.svg)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modern personal blog built with Jekyll, featuring a clean design, responsive layout, and progressive web app capabilities.

🌐 **Live Site**: [https://cyzus.github.io](https://cyzus.github.io)

## ✨ Features

- 📱 Fully responsive design
- 🎨 Modern, clean UI with improved typography
- ⚡ Fast performance with service worker caching
- 🔍 SEO optimized
- 📝 Markdown-based content
- 🎯 Progressive Web App (PWA) support
- 🌙 Optimized for readability

## 🚀 Quick Start

### Prerequisites

- **Ruby** (>= 2.7.0) - [Installation Guide](https://www.ruby-lang.org/en/documentation/installation/)
- **Node.js** (>= 14.0.0) - [Installation Guide](https://nodejs.org/)
- **Bundler** - Install via `gem install bundler`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cyzus/cyzus.github.io.git
   cd cyzus.github.io
   ```

2. **Install Ruby dependencies**
   ```bash
   bundle install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Build and start the development server**
   ```bash
   npm run dev
   ```
   
   This will:
   - Build CSS from LESS files
   - Minify JavaScript
   - Start Jekyll server at `http://localhost:4000`
   - Watch for file changes

Alternatively, just start the server without rebuilding:
```bash
npm start
```

## 📝 Creating a New Post

1. Create a new file in the `_posts` directory with the format:
   ```
   YYYY-MM-DD-your-post-title.markdown
   ```

2. Add front matter at the top:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   subtitle: "Optional subtitle"
   date: YYYY-MM-DD HH:MM:SS
   author: "Your Name"
   header-img: "img/post-bg.jpg"
   catalog: true
   tags:
     - tag1
     - tag2
   ---
   ```

3. Write your content in Markdown below the front matter.

4. Preview locally with `npm start`

### Example Post

```markdown
---
layout: post
title: "My First Post"
subtitle: "Getting started with blogging"
date: 2025-10-14 12:00:00
author: "Yizhou Chi"
header-img: "img/home-bg.jpg"
catalog: true
tags:
    - blog
    - tutorial
---

## Hello World

This is my first blog post!
```

## 🛠️ Build Commands

- `npm start` - Start development server only
- `npm run dev` - Build assets + start server with watch mode
- `npm run build` - Full production build (CSS, JS, Jekyll, PWA)
- `npm run build:css` - Build and minify CSS from LESS
- `npm run build:js` - Minify JavaScript
- `npm run build:pwa` - Generate service worker

## 🎨 Customization

### Colors & Styling

Edit `less/variables.less` to change:
- Primary brand colors
- Typography settings
- Spacing and layout
- Shadow effects

Then rebuild with `npm run build:css`

### Site Configuration

Edit `_config.yml` to modify:
- Site title and description
- Social media links
- Analytics settings
- SEO keywords

### Images

Replace images in the `img/` directory:
- `home-bg.jpg` - Homepage header
- `404-bg.jpg` - 404 page background
- `contact-bg.jpg` - Contact page background

## 📦 Project Structure

```
├── _config.yml          # Jekyll configuration
├── _posts/              # Blog posts
├── _layouts/            # Page templates
├── _includes/           # Reusable components
├── less/                # LESS source files
├── css/                 # Compiled CSS (generated)
├── js/                  # JavaScript files
├── img/                 # Images and assets
├── pwa/                 # PWA manifest and icons
└── package.json         # Node dependencies & scripts
```

## 🚢 Deployment

This blog is automatically deployed to GitHub Pages when you push to the `main` branch.

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

GitHub Pages will automatically build and deploy your site within a few minutes.

## 🔧 Modern Improvements

This blog has been modernized with:
- ✅ Replaced Grunt with modern npm scripts
- ✅ Added PostCSS with Autoprefixer for better browser compatibility
- ✅ Modern CSS with improved typography and spacing
- ✅ Updated color scheme with refined palette
- ✅ Better code organization and build process
- ✅ Zero vulnerabilities in dependencies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Originally based on the [Hux Blog](https://github.com/Huxpro/huxpro.github.io) Jekyll theme, modernized and customized for personal use.

---

Made with ❤️ by [Yizhou Chi](https://github.com/cyzus)
