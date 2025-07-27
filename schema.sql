
CREATE TABLE `gallery_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image_url` longtext,
  `sort_order` int DEFAULT '0',
  `data_ai_hint` varchar(255) DEFAULT 'school event',
  PRIMARY KEY (`id`)
);

CREATE TABLE `site_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_title` varchar(255) DEFAULT 'Default Site Title',
  `meta_description` text,
  `meta_keywords` text,
  `favicon_url` varchar(255) DEFAULT '/favicon.ico',
  PRIMARY KEY (`id`)
);

-- It's a good practice to insert a default row
INSERT INTO `site_settings` (`id`, `site_title`, `meta_description`, `meta_keywords`, `favicon_url`) VALUES
(1, 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', 'Official website for মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', 'school, education, bangladesh', '/favicon.ico');
