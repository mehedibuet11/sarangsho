// src/components/blog-section.tsx
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  published_at: string;
  slug: string;
}

// ✅ Fetch posts on the server with caching for 30 seconds
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/published`, {
      next: { revalidate: 30 }, // revalidate every 30s (ISR)
    });

    if (!res.ok) throw new Error("Failed to fetch blog posts");

    const data = await res.json();
    return data.posts || [];
  } catch (err) {
    console.error("Blog fetch error:", err);
    return [];
  }
}

export async function BlogSection() {
  const blogPosts = await getBlogPosts();

  return (
    <section id="blog" className="blog-section py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our thoughts on journalism, technology, and the
            future of news consumption.
          </p>
        </div>

        {blogPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.slug}`}>
                      <span className="inline-flex items-center group text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button size="lg" variant="outline" className="px-8">
                  View All Articles
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-600">
              Check back soon for our latest insights and articles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
