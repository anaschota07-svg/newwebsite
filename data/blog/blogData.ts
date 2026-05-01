import { getAllPosts } from '@/lib/blog/posts'

export type { BlogPost } from '@/lib/blog/posts'
export {
  BLOG_AUTHOR,
  normalizeBlogAuthor,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  getAllPosts,
} from '@/lib/blog/posts'

/** Resolved list of posts (same order as navigation). Prefer `getAllPosts()` at call sites. */
export function getBlogPostsSnapshot() {
  return getAllPosts()
}
