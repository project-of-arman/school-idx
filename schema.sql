-- Drop the existing table to ensure a clean slate
DROP TABLE IF EXISTS `site_settings`;

-- Create the table for site-wide settings
CREATE TABLE `site_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_title` varchar(255) DEFAULT 'Your School Name',
  `meta_description` text,
  `meta_keywords` text,
  `favicon_url` longtext,
  PRIMARY KEY (`id`)
);

-- Insert a default row of settings so the admin page can update it.
INSERT INTO `site_settings` (`id`, `site_title`, `meta_description`, `meta_keywords`, `favicon_url`) VALUES
(1, 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', 'Official website for মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', 'school, education, bangladesh', '/favicon.ico');