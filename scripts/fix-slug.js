const path = require('path');
const fs = require('fs');

// Fix permalink for posts using index.md in post_asset_folder
// When using index.md, hexo derives slug from the full path (e.g. "freelancer/index").
// This script strips the trailing "/index" from the slug so permalink is correct.
hexo.extend.filter.register('post_permalink', function (data) {
  const { slug } = data;
  if (slug && slug.endsWith('/index')) {
    data.slug = slug.slice(0, -6);
  }
  return data;
}, 1); // Priority 1 — run before the default post_permalink filter

// Fix image paths for posts using index.md in post_asset_folder
// When using index.md, hexo's asset_dir points to .../index/ instead of the parent folder,
// causing image paths to be resolved incorrectly (e.g., /office.png instead of /2023/03/18/freelancer/office.png).
// We fix content, excerpt, and more so that both article pages and listing pages have correct paths.
hexo.extend.filter.register('after_post_render', function (data) {
  const { content, full_source } = data;
  if (!full_source || !full_source.endsWith('/index.md')) return data;

  const postDir = path.dirname(full_source);
  const postPath = data.path.replace(/index\.html?$/, '');

  const fixImages = (html) => {
    if (!html) return html;
    return html.replace(/<img src="\/([^/"]+)"([^>]*)>/g, (match, filename, rest) => {
      const filePath = path.join(postDir, filename);
      if (fs.existsSync(filePath)) {
        return `<img src="/${postPath}${filename}"${rest}>`;
      }
      return match;
    });
  };

  data.content = fixImages(content);
  if (data.excerpt) data.excerpt = fixImages(data.excerpt);
  if (data.more) data.more = fixImages(data.more);

  return data;
});

// Copy asset files to public directory for posts using index.md
// Hexo's post_asset_folder doesn't handle index.md correctly, so we manually copy assets.
hexo.extend.filter.register('after_generate', function () {
  const Post = this.model('Post');
  const posts = Post.toArray();

  posts.forEach(post => {
    const src = post.full_source;
    if (!src || !src.endsWith('/index.md')) return;

    const postDir = path.dirname(src);
    const postPath = post.path.replace(/index\.html?$/, '');

    // Read all files in the post directory (non-recursive)
    let files;
    try {
      files = fs.readdirSync(postDir);
    } catch (e) {
      return;
    }

    files.forEach(file => {
      if (file === 'index.md') return;
      const filePath = path.join(postDir, file);
      if (!fs.statSync(filePath).isFile()) return;

      const content = fs.readFileSync(filePath);
      const destPath = postPath + file;
      this.route.set(destPath, content);
    });
  });
});