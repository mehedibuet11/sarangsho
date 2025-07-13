import bcrypt from "bcryptjs";
import mysql, { RowDataPacket } from "mysql2/promise";

// DB Config
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sarangsho-landing",
  port: Number(process.env.DB_PORT) || 3306,
  charset: "utf8mb4",
  timezone: "+00:00",
};

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function initializeDatabase() {
  // Create connection without DB first, to create DB if missing
  const initialConn = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
  });

  try {
    await initialConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await initialConn.end();
  }

  // Now get pool connection and create tables
  const conn = await pool.getConnection();
  try {
    const tables = [
      // blog_posts
      `CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content LONGTEXT NOT NULL,
        thumbnail LONGTEXT,
        status ENUM('draft', 'published') DEFAULT 'draft',
        seo_title VARCHAR(255),
        seo_description TEXT,
        tags TEXT,
        author VARCHAR(100) DEFAULT 'Admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        published_at TIMESTAMP NULL,
        INDEX idx_slug (slug),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // custom_pages
      `CREATE TABLE IF NOT EXISTS custom_pages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT NOT NULL,
        status ENUM('draft', 'published') DEFAULT 'draft',
        seo_title VARCHAR(255),
        seo_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // screenshots
      `CREATE TABLE IF NOT EXISTS screenshots (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url LONGTEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_sort_order (sort_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // site_settings
      `CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_setting_key (setting_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // app_features
      `CREATE TABLE IF NOT EXISTS app_features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100),
        gradient VARCHAR(100),
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_sort_order (sort_order),
        INDEX idx_is_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // admin_users
      `CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        INDEX idx_username (username),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    ];

    for (const sql of tables) {
      await conn.query(sql);
    }

    await seedInitialData(conn);
  } catch (err) {
    console.error("❌ DB init error:", err);
    throw err;
  } finally {
    conn.release();
  }
}

async function seedInitialData(conn: mysql.PoolConnection) {
  // Check admin user count
  const [adminRows] = await conn.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM admin_users WHERE username = ?",
    ["admin"]
  );
  const adminCount = adminRows[0]?.count || 0;
  if (!adminCount) {
    const hash = bcrypt.hashSync("admin123", 10);
    await conn.query(
      "INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)",
      ["admin", hash, "admin@sarangsho.com"]
    );
  }

  // Insert site settings with INSERT IGNORE
  const settings: [string, string][] = [
    ["site_name", "Sarangsho"],
    ["site_description", "Swipe through the latest trusted news"],
    ["seo_title", "Sarangsho - Latest Trusted News"],
    [
      "seo_description",
      "Stay informed with Sarangsho. Swipe through trusted news from verified sources.",
    ],
    ["contact_email", "hello@sarangsho.com"],
    ["contact_phone", "+1 (555) 123-4567"],
    ["contact_address", "123 News Street, Digital City, DC 12345"],
    ["social_facebook", ""],
    ["social_twitter", ""],
    ["social_instagram", ""],
    ["social_linkedin", ""],
    ["google_analytics", ""],
    ["meta_keywords", "news, journalism, mobile news, trusted sources"],
  ];

  for (const [key, value] of settings) {
    await conn.query(
      "INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)",
      [key, value]
    );
  }

  // App features count
  const [featureRows] = await conn.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM app_features"
  );
  const featureCount = featureRows[0]?.count || 0;

  if (!featureCount) {
    const features = [
      [
        "Swipe to Explore",
        "Navigate news with TikTok-style swiping.",
        "Smartphone",
        "from-blue-500 to-cyan-500",
        1,
      ],
      [
        "Discover by Category",
        "Browse news by topics.",
        "Search",
        "from-purple-500 to-pink-500",
        2,
      ],
      [
        "Global News Search",
        "Find news from anywhere.",
        "Zap",
        "from-green-500 to-teal-500",
        3,
      ],
      [
        "Trusted Sources Only",
        "Only verified news.",
        "Shield",
        "from-orange-500 to-red-500",
        4,
      ],
    ];

    for (const [title, description, icon, gradient, sort_order] of features) {
      await conn.query(
        "INSERT INTO app_features (title, description, icon, gradient, sort_order) VALUES (?, ?, ?, ?, ?)",
        [title, description, icon, gradient, sort_order]
      );
    }
  }

  // Screenshots count
  const [screenshotRows] = await conn.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM screenshots"
  );
  const screenshotCount = screenshotRows[0]?.count || 0;

  if (!screenshotCount) {
    const screenshots = [
      [
        "Home Feed",
        "Swipe through curated news",
        "/placeholder.svg?height=600&width=300",
        1,
      ],
      [
        "Categories",
        "Browse news by topic",
        "/placeholder.svg?height=600&width=300",
        2,
      ],
      [
        "Search",
        "Find specific news",
        "/placeholder.svg?height=600&width=300",
        3,
      ],
      [
        "Article View",
        "Read full articles",
        "/placeholder.svg?height=600&width=300",
        4,
      ],
      [
        "Bookmarks",
        "Save articles",
        "/placeholder.svg?height=600&width=300",
        5,
      ],
    ];

    for (const [title, description, image_url, sort_order] of screenshots) {
      await conn.query(
        "INSERT INTO screenshots (title, description, image_url, sort_order) VALUES (?, ?, ?, ?)",
        [title, description, image_url, sort_order]
      );
    }
  }
}

export async function executeQuery(query: string, params: any[] = []) {
  const conn = await pool.getConnection();
  try {
    const [results] = await conn.query(query, params);
    return results;
  } finally {
    conn.release();
  }
}

export async function executeTransaction(
  queries: { query: string; params?: any[] }[]
) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const results = [];
    for (const q of queries)
      results.push((await conn.query(q.query, q.params || []))[0]);
    await conn.commit();
    return results;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function closeDatabase() {
  await pool.end();
}

export default pool;
