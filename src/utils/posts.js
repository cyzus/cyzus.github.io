import fm from 'front-matter';

const markdownFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });
const markdownFilesMarkdown = import.meta.glob('../posts/*.markdown', { query: '?raw', import: 'default', eager: true });

export function getAllPosts() {
  const allFiles = { ...markdownFiles, ...markdownFilesMarkdown };
  
  const posts = Object.entries(allFiles).map(([path, content]) => {
    const { attributes, body } = fm(content);
    const filename = path.split('/').pop();
    const slug = filename.replace(/\.md$/, '').replace(/\.markdown$/, '');
    return {
      slug,
      ...attributes,
      body
    };
  });
  
  return posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}

export function getPostBySlug(slug) {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.slug === slug);
}
