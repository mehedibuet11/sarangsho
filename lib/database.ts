// import mysql, { Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
// import bcrypt from "bcryptjs";

// const dbConfig = {
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "sarangsho-landing",
//   port: Number(process.env.DB_PORT) || 3306,
//   charset: "utf8mb4",
//   timezone: "+00:00",
// };

// let pool: Pool;

// function createPool(): Pool {
//   if (!pool) {
//     pool = mysql.createPool({
//       ...dbConfig,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//     });
//     console.log("✅ MySQL pool initialized");
//   }
//   return pool;
// }

// const db = createPool();

// // ✅ Initialize Database (create if not exists)
// export async function initializeDatabase(): Promise<void> {
//   const connection = await mysql.createConnection({
//     host: dbConfig.host,
//     user: dbConfig.user,
//     password: dbConfig.password,
//     port: dbConfig.port,
//   });

//   try {
//     await connection.query(
//       `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
//     );
//     console.log("✅ Database ensured:", dbConfig.database);
//   } finally {
//     await connection.end();
//   }

//   const conn = await db.getConnection();
//   try {
//     const tableQueries = [
//       // blog_posts
//       `CREATE TABLE IF NOT EXISTS blog_posts (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         slug VARCHAR(255) UNIQUE NOT NULL,
//         excerpt TEXT,
//         content LONGTEXT NOT NULL,
//         thumbnail LONGTEXT,
//         status ENUM('draft', 'published') DEFAULT 'draft',
//         seo_title VARCHAR(255),
//         seo_description TEXT,
//         tags TEXT,
//         author VARCHAR(100) DEFAULT 'Admin',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         published_at TIMESTAMP NULL,
//         INDEX idx_slug (slug),
//         INDEX idx_status (status),
//         INDEX idx_created_at (created_at)
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

//       // custom_pages
//       `CREATE TABLE IF NOT EXISTS custom_pages (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         slug VARCHAR(255) UNIQUE NOT NULL,
//         content LONGTEXT NOT NULL,
//         status ENUM('draft', 'published') DEFAULT 'draft',
//         seo_title VARCHAR(255),
//         seo_description TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         INDEX idx_slug (slug),
//         INDEX idx_status (status)
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

//       // screenshots
//       `CREATE TABLE IF NOT EXISTS screenshots (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         description TEXT,
//         image_url LONGTEXT,
//         sort_order INT DEFAULT 0,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         INDEX idx_sort_order (sort_order)
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

//       // site_settings
//       `CREATE TABLE IF NOT EXISTS site_settings (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         setting_key VARCHAR(100) UNIQUE NOT NULL,
//         setting_value TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         INDEX idx_setting_key (setting_key)
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

//       // app_features
//       `CREATE TABLE IF NOT EXISTS app_features (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         description TEXT NOT NULL,
//         icon VARCHAR(100),
//         gradient VARCHAR(100),
//         sort_order INT DEFAULT 0,
//         is_active BOOLEAN DEFAULT 1,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         INDEX idx_sort_order (sort_order),
//         INDEX idx_is_active (is_active)
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

//       // admin_users
//       `CREATE TABLE IF NOT EXISTS admin_users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         password_hash VARCHAR(255) NOT NULL,
//         email VARCHAR(255),
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         last_login TIMESTAMP NULL,
//         INDEX idx_username (username),
//         INDEX idx_email (email)
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
//     ];

//     for (const sql of tableQueries) {
//       await conn.query(sql);
//     }

//     await seedInitialData(conn);
//     console.log("✅ All tables ensured and seeded");
//   } catch (error) {
//     console.error("❌ Database initialization error:", error);
//     throw error;
//   } finally {
//     conn.release();
//   }
// }

// // ✅ Seed Default Data
// async function seedInitialData(conn: PoolConnection) {
//   // Ensure admin user
//   const [adminRows] = await conn.query<RowDataPacket[]>(
//     "SELECT COUNT(*) AS count FROM admin_users WHERE username = ?",
//     ["admin"]
//   );
//   if (!adminRows[0]?.count) {
//     const hash = bcrypt.hashSync("admin123", 10);
//     await conn.query(
//       "INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)",
//       ["admin", hash, "admin@sarangsho.com"]
//     );
//   }

//   // Default site settings
//   const settings: [string, string][] = [
//     ["site_name", "Sarangsho"],
//     ["site_description", "Swipe through the latest trusted news"],
//     ["seo_title", "Sarangsho - Latest Trusted News"],
//     [
//       "seo_description",
//       "Stay informed with Sarangsho. Swipe through trusted news from verified sources.",
//     ],
//     ["contact_email", "hello@sarangsho.com"],
//     ["contact_phone", "+1 (555) 123-4567"],
//     ["contact_address", "123 News Street, Digital City, DC 12345"],
//     ["meta_keywords", "news, journalism, mobile news, trusted sources"],
//   ];

//   for (const [key, value] of settings) {
//     await conn.query(
//       "INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)",
//       [key, value]
//     );
//   }

//   // Default features
//   const [featureRows] = await conn.query<RowDataPacket[]>(
//     "SELECT COUNT(*) AS count FROM app_features"
//   );
//   if (!featureRows[0]?.count) {
//     const features = [
//       ["Swipe to Explore", "Navigate news with TikTok-style swiping.", "Smartphone", "from-blue-500 to-cyan-500", 1],
//       ["Discover by Category", "Browse news by topics.", "Search", "from-purple-500 to-pink-500", 2],
//       ["Global News Search", "Find news from anywhere.", "Zap", "from-green-500 to-teal-500", 3],
//       ["Trusted Sources Only", "Only verified news.", "Shield", "from-orange-500 to-red-500", 4],
//     ];
//     for (const [title, description, icon, gradient, sort_order] of features) {
//       await conn.query(
//         "INSERT INTO app_features (title, description, icon, gradient, sort_order) VALUES (?, ?, ?, ?, ?)",
//         [title, description, icon, gradient, sort_order]
//       );
//     }
//   }
// }

// // ✅ Helper Query Functions
// export async function executeQuery<T = any>(
//   query: string,
//   params: any[] = []
// ): Promise<T> {
//   const conn = await db.getConnection();
//   try {
//     const [results] = await conn.query(query, params);
//     return results as T;
//   } finally {
//     conn.release();
//   }
// }

// export async function executeTransaction<T = any>(
//   queries: { query: string; params?: any[] }[]
// ): Promise<T[]> {
//   const conn = await db.getConnection();
//   try {
//     await conn.beginTransaction();
//     const results: T[] = [];
//     for (const q of queries) {
//       const [result] = await conn.query(q.query, q.params || []);
//       results.push(result as T);
//     }
//     await conn.commit();
//     return results;
//   } catch (error) {
//     await conn.rollback();
//     throw error;
//   } finally {
//     conn.release();
//   }
// }

// // ✅ Close pool gracefully
// export async function closeDatabase() {
//   if (pool) {
//     await pool.end();
//     console.log("🔒 Database pool closed");
//   }
// }

// export default db;

import bcrypt from "bcryptjs";
import mysql, { Pool, PoolConnection, RowDataPacket } from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sarangsho-landing",
  port: Number(process.env.DB_PORT) || 3306,
  charset: "utf8mb4",
  timezone: "+00:00",
};

// ✅ global cache (dev/hot reload + multi workers safe-ish)
declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: Pool | undefined;
}

function getPool(): Pool {
  // reuse in dev
  if (process.env.NODE_ENV !== "production" && global.__mysqlPool) {
    return global.__mysqlPool;
  }

  const pool =
    global.__mysqlPool ??
    mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

  if (process.env.NODE_ENV !== "production") {
    global.__mysqlPool = pool;
  }

  return pool;
}

// ❗️NO top-level createPool() call anymore
// const db = createPool();  ❌ removed

// ✅ Only for internal usage
async function getConn() {
  const pool = getPool();
  return pool.getConnection();
}

// ✅ Build phase guard (prevents accidental build-time init)
function isBuildPhase() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

// ✅ Initialize Database (create if not exists)
export async function initializeDatabase(): Promise<void> {
  // If someone mistakenly triggers init during build, skip
  if (isBuildPhase()) return;

  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    console.log("✅ Database ensured:", dbConfig.database);
  } finally {
    await connection.end();
  }

  const conn = await getConn();
  try {
    const tableQueries = [
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

      `CREATE TABLE IF NOT EXISTS screenshots (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url LONGTEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_sort_order (sort_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_setting_key (setting_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

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

    for (const sql of tableQueries) {
      await conn.query(sql);
    }

    await seedInitialData(conn);
    console.log("✅ All tables ensured and seeded");
  } finally {
    conn.release();
  }
}

// ✅ Seed Default Data
async function seedInitialData(conn: PoolConnection) {
  const [adminRows] = await conn.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM admin_users WHERE username = ?",
    ["admin"],
  );

  if (!adminRows[0]?.count) {
    const hash = bcrypt.hashSync("admin123", 10);
    await conn.query(
      "INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)",
      ["admin", hash, "admin@sarangsho.com"],
    );
  }

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
    ["meta_keywords", "news, journalism, mobile news, trusted sources"],
  ];

  for (const [key, value] of settings) {
    await conn.query(
      "INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)",
      [key, value],
    );
  }

  const [featureRows] = await conn.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM app_features",
  );

  if (!featureRows[0]?.count) {
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
        [title, description, icon, gradient, sort_order],
      );
    }
  }
}

// ✅ Helper Query Functions
export async function executeQuery<T = any>(
  query: string,
  params: any[] = [],
): Promise<T> {
  const conn = await getConn();
  try {
    const [results] = await conn.query(query, params);
    return results as T;
  } finally {
    conn.release();
  }
}

export async function executeTransaction<T = any>(
  queries: { query: string; params?: any[] }[],
): Promise<T[]> {
  const conn = await getConn();
  try {
    await conn.beginTransaction();
    const results: T[] = [];
    for (const q of queries) {
      const [result] = await conn.query(q.query, q.params || []);
      results.push(result as T);
    }
    await conn.commit();
    return results;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

// ✅ Close pool gracefully
export async function closeDatabase() {
  const pool =
    process.env.NODE_ENV !== "production" ? global.__mysqlPool : undefined;
  if (pool) {
    await pool.end();
    global.__mysqlPool = undefined;
    console.log("🔒 Database pool closed");
  }
}

// ✅ Optional default export (pool) if you need it elsewhere
export default getPool;
