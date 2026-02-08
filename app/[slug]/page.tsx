import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import db, { initializeDatabase } from "@/lib/database";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Initialize database
initializeDatabase();

const getCustomPage = async (slug: string) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM custom_pages WHERE slug = ? AND status = 'published'`,
      [slug]
    );

    return (rows as any[])[0] || null;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
};

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const page = await getCustomPage(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.seo_title || page.title,
    description: page.seo_description,
  };
}

export default async function CustomPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  console.log("Fetching page with slug:", params.slug);
  const page = await getCustomPage(params.slug);
  console.log("Page result:", page);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <header className="bg-white border-b pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {page.title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>

      <Footer />
    </div>
  );
}
