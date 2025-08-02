import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database"; // mysql2 Pool instance (promise version)

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT setting_key, setting_value FROM site_settings"
    );

    // rows type: RowDataPacket[]
    // Map rows to object
    const settingsRows = rows as Array<{
      setting_key: string;
      setting_value: string;
    }>;

    const settings = {
      siteName: "",
      appStoreLink: "",
      playStoreLink: "",
      siteDescription: "",
      seoTitle: "",
      seoDescription: "",
      logo: "",
      favicon: "",
      heroImage: "",
      contactEmail: "",
      contactPhone: "",
      contactAddress: "",
      socialFacebook: "",
      socialTwitter: "",
      socialInstagram: "",
      socialLinkedin: "",
      googleAnalytics: "",
      metaKeywords: "",
      footerDescription: "",
      copyright: "",
      tagLine: "",
      download: "",
      rating: "",
      newsSource: "",
      heroLink: "",
    };

    const keyMapping: Record<string, keyof typeof settings> = {
      site_name: "siteName",
      app_store_link: "appStoreLink",
      play_store_link: "playStoreLink",
      site_description: "siteDescription",
      seo_title: "seoTitle",
      seo_description: "seoDescription",
      logo: "logo",
      favicon: "favicon",
      hero_image: "heroImage",
      contact_email: "contactEmail",
      contact_phone: "contactPhone",
      contact_address: "contactAddress",
      social_facebook: "socialFacebook",
      social_twitter: "socialTwitter",
      social_instagram: "socialInstagram",
      social_linkedin: "socialLinkedin",
      google_analytics: "googleAnalytics",
      meta_keywords: "metaKeywords",
      footer_description: "footerDescription",
      copyright: "copyright",
      tag_line: "tagLine",
      download: "download",
      rating: "rating",
      news_source: "newsSource",
      hero_link: "heroLink",
    };

    settingsRows.forEach((row) => {
      const frontendKey = keyMapping[row.setting_key];
      if (frontendKey) {
        settings[frontendKey] = row.setting_value || "";
      }
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const body = await request.json();

    const settingsMap: Array<[string, string]> = [
      ["site_name", body.siteName ?? ""],
      ["app_store_link", body.appStoreLink ?? ""],
      ["play_store_link", body.playStoreLink ?? ""],
      ["site_description", body.siteDescription ?? ""],
      ["seo_title", body.seoTitle ?? ""],
      ["seo_description", body.seoDescription ?? ""],
      ["logo", body.logo ?? ""],
      ["favicon", body.favicon ?? ""],
      ["hero_image", body.heroImage ?? ""],
      ["contact_email", body.contactEmail ?? ""],
      ["contact_phone", body.contactPhone ?? ""],
      ["contact_address", body.contactAddress ?? ""],
      ["social_facebook", body.socialFacebook ?? ""],
      ["social_twitter", body.socialTwitter ?? ""],
      ["social_instagram", body.socialInstagram ?? ""],
      ["social_linkedin", body.socialLinkedin ?? ""],
      ["google_analytics", body.googleAnalytics ?? ""],
      ["meta_keywords", body.metaKeywords ?? ""],
      ["footer_description", body.footerDescription ?? ""],
      ["download", body.download ?? ""],
      ["rating", body.rating ?? ""],
      ["news_source", body.newsSource ?? ""],
      ["hero_link", body.heroLink ?? ""],
      [
        "copyright",
        body.copyright ?? `© ${new Date().getFullYear()} Sarangsho`,
      ],
      ["tag_line", body.tagLine ?? "Swipe through the latest trusted news"],
    ];

    for (const [key, value] of settingsMap) {
      await connection.query(
        `
        INSERT INTO site_settings (setting_key, setting_value, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON DUPLICATE KEY UPDATE
          setting_value = VALUES(setting_value),
          updated_at = CURRENT_TIMESTAMP
        `,
        [key, value]
      );
    }

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
