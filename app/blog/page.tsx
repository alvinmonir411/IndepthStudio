import { getBlogs } from '@/app/actions/blog';
import BlogClient from './BlogClient';

export const revalidate = 3600;

export default async function BlogPage() {
    const posts = await getBlogs();

    return <BlogClient posts={posts} />;
}
