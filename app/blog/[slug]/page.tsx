import { getBlogBySlug, getBlogs } from '@/app/actions/blog';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

export const revalidate = 3600;

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    if (!post) {
        notFound();
    }

    // Fetch related posts (excluding the current one)
    const allBlogs = await getBlogs();
    const relatedPosts = allBlogs.filter((b: any) => b.slug !== slug).slice(0, 2);

    return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
