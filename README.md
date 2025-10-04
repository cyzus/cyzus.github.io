# My Personal Blog

This is the source code for my personal blog using Hux Blog's Jekyll theme, built with Jekyll and hosted on GitHub Pages.

## Creating a New Post

1.  **Create a new file** in the `_posts` directory.
2.  **Name the file** using the format `YYYY-MM-DD-your-post-title.markdown`.
3.  **Add the following front matter** to the top of the file:

    ```yaml
    ---
    layout: post
    title: "Your Post Title"
    date: YYYY-MM-DD HH:MM:SS +0000
    tags: [tag1, tag2]
    ---
    ```

4.  **Write your post** in Markdown below the front matter.

**Example:**

`_posts/2025-10-04-hello-world.markdown`

```markdown
---
layout: post
title: "Hello World"
date: 2025-10-04 10:00:00 +0000
tags: [greeting, example]
---

This is my first post!
```

## Local Development

To preview your changes locally before deploying, you'll need to have the following dependencies installed:

*   [Ruby](https://www.ruby-lang.org/en/) and [Bundler](https://bundler.io/)
*   [Node.js](https://nodejs.org/) and [Grunt](https://gruntjs.com/)

Once you have the dependencies installed, follow these steps:

1.  **Install Ruby Dependencies:**
    ```bash
    bundle install
    ```

2.  **Install Node.js Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Local Server:**
    ```bash
    npm start
    ```
    This will start a local server at `http://localhost:4000`.

## Deployment

This blog is hosted on GitHub Pages. To deploy any changes, simply push your commits to the `main` branch:

```bash
git push origin main
```

GitHub Pages will automatically build and deploy your site.
