-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 161.248.189.80    Database: mehedi_sarangsho
-- ------------------------------------------------------
-- Server version	11.8.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `idx_username` (`username`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin','$2b$10$74Z9hJBoOKcJ.1Cu6n/5mepKlr/ef2apXwW67vybTaNqWjpsCY5ny','admin@sarangsho.com','2025-08-12 18:34:15',NULL);
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_features`
--

DROP TABLE IF EXISTS `app_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `gradient` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_features`
--

LOCK TABLES `app_features` WRITE;
/*!40000 ALTER TABLE `app_features` DISABLE KEYS */;
INSERT INTO `app_features` VALUES (14,'Global News Search','Find news from anywhere.','Zap','from-green-500 to-teal-500',3,1,'2025-08-12 18:35:52'),(18,'Trusted Sources Only','Only verified news.','Shield','from-orange-500 to-red-500',4,1,'2025-08-12 18:35:53'),(19,'Trusted Sources Only','Only verified news.','Shield','from-orange-500 to-red-500',4,1,'2025-08-12 18:35:53'),(20,'Trusted Sources Only','Only verified news.','Shield','from-orange-500 to-red-500',4,1,'2025-08-12 18:35:53');
/*!40000 ALTER TABLE `app_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext NOT NULL,
  `thumbnail` longtext DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `author` varchar(100) DEFAULT 'Admin',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `published_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (1,'Title ','title','Demo ','<p class=\"text-xl text-gray-600 leading-relaxed\">Swipe through the latest trusted news from verified sources worldwide.</p>\n<p class=\"text-lg text-gray-500\">Swipe through the latest trusted news</p>','','published','','','','Admin','2025-09-13 13:39:47','2025-09-13 13:39:47','2025-09-13 17:39:47');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_pages`
--

DROP TABLE IF EXISTS `custom_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_pages`
--

LOCK TABLES `custom_pages` WRITE;
/*!40000 ALTER TABLE `custom_pages` DISABLE KEYS */;
INSERT INTO `custom_pages` VALUES (1,'Privacy Policy','privacy-policy','<h2 class=\"mb-4\">Privacy Policy</h2>\n<p>At Sarangsho, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our app and services. By using Sarangsho, you consent to the practices described in this Privacy Policy.</p>\n<h5 class=\"mt-4\">1. Information We Collect</h5>\n<p>We collect the information you choose to share with us to provide a better, more personalized experience. This may include details like your name, email, or phone number if you provide them during registration, as well as any feedback or content you submit while using the app. We also gather information automatically to help us understand how Sarangsho is being used &mdash; such as device type, general location, app usage patterns, and occasional error reports &mdash; which helps us maintain and improve the service.</p>\n<h5 class=\"mt-4\">2. How We Use Your Information</h5>\n<p>We use the information we collect to make Sarangsho more useful and engaging. This includes delivering and improving our content, personalizing your experience, sending you updates if you\'ve opted in, and understanding how our app is being used so we can enhance its features and security.</p>\n<h5 class=\"mt-4\">3. How We Share Your Information</h5>\n<p>We respect your privacy and do not trade or sell your personal data to anyone. In limited circumstances, we may share necessary data with trusted partners who help us operate and improve Sarangsho &mdash; such as hosting providers, analytics services, or customer support platforms. If required by law or in connection with a merger or business transfer, your information may also be disclosed as appropriate.</p>\n<h5 class=\"mt-4\">4. Data Security</h5>\n<p>We take reasonable steps to keep your information safe, including using technical and organizational measures to prevent unauthorized access or misuse. However, please be aware that no digital system can be completely secure.</p>\n<h5 class=\"mt-4\">5. Your Rights</h5>\n<p>Depending on your location, you may have rights regarding your personal data &mdash; such as accessing or correcting it, requesting deletion, or objecting to certain types of data use. If you\'d like to make a request, please contact us at&nbsp;<a href=\"mailto:sarangsho.office@gmail.com\">sarangsho.office@gmail.com</a>.</p>\n<h5 class=\"mt-4\">6. Cookies &amp; Tracking</h5>\n<p>To improve functionality and understand how Sarangsho is being used, we may use cookies or similar tools. These help keep you logged in and provide insights into how the app performs. You can manage your preferences through your device settings.</p>\n<h5 class=\"mt-4\">7. Third-Party Links</h5>\n<p>Sarangsho may include links to other websites or services. We don&rsquo;t control their content or policies, so we recommend reviewing their privacy practices before engaging with them.</p>\n<h5 class=\"mt-4\">8. Advertisements and Third-Party Services</h5>\n<p>Sarangsho may display advertisements or offer content provided by third-party partners. These partners may use cookies, device identifiers, or similar technologies to show relevant ads and measure their performance. While we do not directly share your personally identifiable information with advertisers, certain data such as general usage patterns or non-personal identifiers may be used to personalize ad experiences. Please note that clicking on an ad may take you to a third-party website or service, and we are not responsible for their privacy practices. We encourage you to review their policies separately.</p>\n<h5 class=\"mt-4\">9. Push Notifications</h5>\n<p>With your permission, Sarangsho may send you push notifications to inform you about important updates, new features, or relevant content. You can manage or disable these notifications anytime through your device settings.</p>\n<h5 class=\"mt-4\">10. Service Providers</h5>\n<p>We may engage third-party service providers to help us operate, analyze, and enhance our services. These providers may handle tasks like data storage, customer support, or system analytics on our behalf, and they are required to follow strict confidentiality and security measures.</p>\n<h5 class=\"mt-4\">11. Analytics</h5>\n<p>To better understand user behavior and improve our services, we use analytics tools that may collect non-personal data about how users interact with Sarangsho. This information helps us make informed decisions about app features and user experience.</p>\n<h5 class=\"mt-4\">12. Children&rsquo;s Privacy</h5>\n<p>Sarangsho offers certain general knowledge features that may be suitable for younger audiences; however, some content &mdash; particularly news items &mdash; may not be appropriate for children. As such, Sarangsho is designed for users aged 13 and above. We do not knowingly collect personal information from children under 13. If we become aware that such data has been collected, we will take steps to delete it promptly. Parents or guardians who believe their child has provided personal information can contact us to request its removal.</p>\n<h5 class=\"mt-4\">13. Changes to This Policy</h5>\n<p>We may occasionally update this Privacy Policy. If we make significant changes, we&rsquo;ll notify you through the app or by other means you&rsquo;ve provided. Your continued use of Sarangsho means you accept the updated terms.</p>\n<h5 class=\"mt-4\">14. Governing Law</h5>\n<p>This Privacy Policy is governed by the laws of Bangladesh. Any dispute, controversy, or claim arising out of or in connection with the use, disclosure, or protection of your information shall be resolved through arbitration in accordance with the applicable laws of Bangladesh. The arbitration shall be conducted in Dhaka, Bangladesh, in the English or Bengali language, and the decision of the arbitrator(s) shall be final and binding. This policy applies to all users of Sarangsho, regardless of their nationality, location, or place of residence.</p>\n<h5 class=\"mt-4\">15. Contact Us</h5>\n<p>If you have any questions or concerns about this policy, feel free to reach out to us:<br>📧&nbsp;<a href=\"mailto:sarangsho.office@gmail.com\">sarangsho.office@gmail.com</a><br>🌐&nbsp;<a href=\"https://www.saranghso.com/\" target=\"_blank\" rel=\"noopener noreferrer\">www.saranghso.com</a></p>\n<p class=\"text-muted mt-5\">Last Updated: May 18, 2025</p>','published','Sarangsho Privacy Policy','Sarangsho Privacy Policy','2025-08-12 19:46:47','2025-08-12 19:46:47'),(2,'Terms and Conditions','terms-and-conditions','<h2 class=\"mb-4\">Terms and Conditions</h2>\n<p>These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Sarangsho mobile application (&ldquo;App&rdquo;), which is a sister concern of Terse Narrative and is licensed and operated by Terse Narrative (&ldquo;Terse Narrative&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo;, or &ldquo;Us&rdquo;). By accessing, downloading, or using the App, you agree to comply with these Terms and our Privacy Policy, which together form a binding agreement between you and Terse Narrative. If you do not agree to these Terms, you should immediately stop using the App.</p>\n<hr>\n<h5>1. Services Overview</h5>\n<p>Sarangsho provides:<br>&bull; Summarized news and current events.<br>&bull; Curated general knowledge content for job seekers and competitive exam aspirants.<br>&bull; Educational and informational content designed for quick and effective consumption.</p>\n<p>The summaries and knowledge content are curated by our editorial team and a dedicated AI system particularly designed for news and information. We do not claim ownership of original news sources. At present, Sarangsho does not require user registration to access summarized content. However, creating an account may be necessary to unlock certain features, such as saving articles for later reference, sharing and other personalized functions.</p>\n<hr>\n<h5>2. Eligibility</h5>\n<p>You must be at least 13 years old to use this App. By using Sarangsho, you affirm that you are either 13 or older, or you have the consent of a parent or legal guardian if required by law.</p>\n<hr>\n<h5>3. User Obligations</h5>\n<p>By using the App, you agree:<br>&bull; Not to misuse our services, attempt to hack, alter, or interfere with the App.<br>&bull; Not to copy, scrape, or replicate our summaries or general knowledge content for commercial purposes without permission.<br>&bull; To use the content for personal, non-commercial use unless authorized.<br>&bull; To use the App only for lawful purposes and in compliance with all applicable local, national, and international laws and regulations.<br>&bull; Not to attempt to reverse engineer, decompile, disassemble, or derive the source code of the App, or exploit it for commercial purposes without our explicit written consent.</p>\n<hr>\n<h5>4. Content Rights and Ownership</h5>\n<p>All logos, branding, original summaries, and general knowledge compilations on Sarangsho are either owned by or licensed to Terse Narrative. We respect copyright laws and attribute original sources where applicable. If you believe any content violates your copyright, please contact us at&nbsp;<a href=\"mailto:sarangsho.office@gmail.com\">sarangsho.office@gmail.com</a>.</p>\n<hr>\n<h5>5. Sponsored Content and Third-Party Links</h5>\n<p>Sarangsho may display advertisements or sponsored content within the App. These will be clearly marked as &ldquo;sponsored&rdquo; or &ldquo;ads&rdquo; and may originate from third-party companies. While we strive to present relevant and non-intrusive advertisements, Sarangsho does not control or take responsibility for the content, accuracy, or claims made in such third-party promotions. Additionally, Sarangsho may include links to external websites or third-party content. We are not responsible for the availability or accuracy of these sources, and accessing them is at the user\'s own risk.</p>\n<hr>\n<h5>6. Privacy</h5>\n<p>Your use of Sarangsho is also governed by our Privacy Policy. We are committed to protecting your personal information and ensuring transparency in how we collect, use, and store data. We do not share your personal information with third parties without your consent, except as required by law. To learn more, please read our full Privacy Policy.</p>\n<hr>\n<h5>7. Limitation of Liability</h5>\n<p>Sarangsho provides content for informational purposes only. We do not guarantee the accuracy, completeness, or usefulness of any information on the App. You agree to use the App at your own risk. To the fullest extent permitted by law, Terse Narrative and its affiliates are not liable for any direct or indirect damages arising from your use of the App.</p>\n<hr>\n<h5>8. Changes to Terms</h5>\n<p>We may update these Terms from time to time. If changes are material, we will notify you via the App or email. Continued use of the App after such updates constitutes your agreement to the revised Terms.</p>\n<hr>\n<h5>9. Termination</h5>\n<p>We reserve the right to suspend or terminate your access to the App at our discretion, without prior notice, for violations of these Terms or misuse of the Services.</p>\n<hr>\n<h5>10. Content Removal</h5>\n<p>Sarangsho retains the right to remove or modify any content available on the App at its sole discretion, at any time, without prior notice. This includes (but is not limited to):<br>&bull; Content that originates from third-party sources and has been deleted or removed by the original publisher.<br>&bull; Content that Sarangsho deems outdated, inaccurate, or no longer aligned with the goals or standards of the platform.<br>&bull; Content subject to legal, editorial, or user policy concerns. We reserve the right to act independently or in response to takedown requests to ensure the quality, legality, and relevance of the content presented to our users.</p>\n<hr>\n<h5>11. Governing Law and Jurisdiction</h5>\n<p>These Terms shall be governed by and construed in accordance with the laws of the People&rsquo;s Republic of Bangladesh, without regard to its conflict of law principles. In the event of any dispute, controversy, or claim arising out of or relating to these Terms or your use of the App, both parties agree to first attempt to resolve the matter amicably through good-faith negotiations. Any dispute arising from your use of the App or these Terms shall be resolved through binding arbitration in accordance with the Arbitration Act, 2001 of Bangladesh. The arbitration will take place in Dhaka.</p>\n<hr>\n<h5>12. Contact Us</h5>\n<p>For questions or concerns about these Terms, contact:<br>Sarangsho Team<br>Email:&nbsp;<a href=\"mailto:sarangsho.office@gmail.com\">sarangsho.office@gmail.com</a></p>\n<div class=\"text-muted mt-4\">Last Updated: May 18, 2025</div>','published','Terms and Conditions','Terms and Conditions of Sarangsho','2025-08-12 19:47:39','2025-08-12 19:47:39');
/*!40000 ALTER TABLE `custom_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screenshots`
--

DROP TABLE IF EXISTS `screenshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screenshots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` longtext DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screenshots`
--

LOCK TABLES `screenshots` WRITE;
/*!40000 ALTER TABLE `screenshots` DISABLE KEYS */;
INSERT INTO `screenshots` VALUES (16,'Article View','Read full articles','https://res.cloudinary.com/dtvj4pxnb/image/upload/v1760212494/sarangsho/id6yqldy7fs5lu3tzagg.png',4,'2025-08-12 18:35:54'),(17,'Article View','Read full articles','/placeholder.svg?height=600&width=300',4,'2025-08-12 18:35:54'),(19,'Article View','Read full articles','/placeholder.svg?height=600&width=300',4,'2025-08-12 18:35:54'),(23,'Article View','Read full articles','/placeholder.svg?height=600&width=300',4,'2025-08-12 18:35:54'),(26,'Green','Green','https://res.cloudinary.com/dtvj4pxnb/image/upload/v1755028122/sarangsho/tzqdkkw5twnjo0bxnave.png',5,'2025-08-12 19:48:45'),(27,'Demo','Demo','https://res.cloudinary.com/dtvj4pxnb/image/upload/v1755028164/sarangsho/rntjgqqjp0eqljj1s0n0.png',6,'2025-08-12 19:49:26');
/*!40000 ALTER TABLE `screenshots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`),
  KEY `idx_setting_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=1935 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES (1,'site_name','Sarangsho','2025-08-12 18:34:15','2025-09-13 13:46:43'),(7,'site_description','Swipe through the latest trusted news','2025-08-12 18:35:48','2025-09-13 13:46:43'),(12,'seo_title','Sarangsho - Latest Trusted News','2025-08-12 18:35:49','2025-09-13 13:46:43'),(17,'seo_description','Stay informed with Sarangsho. Swipe through trusted news from verified sources.','2025-08-12 18:35:49','2025-09-13 13:46:43'),(22,'contact_email','hello@sarangsho.com','2025-08-12 18:35:49','2025-09-13 13:46:43'),(27,'contact_phone','01521412457','2025-08-12 18:35:50','2025-09-13 13:46:43'),(32,'contact_address','123 News Street, Digital City, DC 12345','2025-08-12 18:35:50','2025-09-13 13:46:43'),(37,'social_facebook','','2025-08-12 18:35:50','2025-09-13 13:46:43'),(42,'social_twitter','','2025-08-12 18:35:50','2025-09-13 13:46:43'),(47,'social_instagram','','2025-08-12 18:35:51','2025-09-13 13:46:43'),(52,'social_linkedin','','2025-08-12 18:35:51','2025-09-13 13:46:43'),(57,'google_analytics','','2025-08-12 18:35:51','2025-09-13 13:46:43'),(62,'meta_keywords','news, journalism, mobile news, trusted sources','2025-08-12 18:35:51','2025-09-13 13:46:43'),(900,'app_store_link','','2025-08-12 19:27:53','2025-09-13 13:46:43'),(901,'play_store_link','','2025-08-12 19:27:53','2025-09-13 13:46:43'),(905,'logo','https://res.cloudinary.com/dtvj4pxnb/image/upload/v1755026853/sarangsho/uyor6bv1sz3cph012pxf.png','2025-08-12 19:27:53','2025-09-13 13:46:43'),(906,'favicon','https://res.cloudinary.com/dtvj4pxnb/image/upload/v1755026867/sarangsho/xpodij96vvghaymf3vdp.png','2025-08-12 19:27:53','2025-09-13 13:46:43'),(907,'hero_image','https://res.cloudinary.com/dtvj4pxnb/image/upload/v1755028216/sarangsho/kguq2ewafwvypynbjy59.gif','2025-08-12 19:27:53','2025-09-13 13:46:43'),(917,'footer_description','','2025-08-12 19:27:53','2025-09-13 13:46:43'),(918,'download','90K','2025-08-12 19:27:53','2025-09-13 13:46:43'),(919,'rating','100K','2025-08-12 19:27:53','2025-09-13 13:46:43'),(920,'news_source','90K','2025-08-12 19:27:53','2025-09-13 13:46:43'),(921,'hero_link','','2025-08-12 19:27:53','2025-09-13 13:46:43'),(922,'copyright','','2025-08-12 19:27:53','2025-09-13 13:46:43'),(923,'tag_line','','2025-08-12 19:27:53','2025-09-13 13:46:43');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-12  2:52:52
