-- Create the 'sidebar_widgets' table to hold dynamic content for the sidebar.
CREATE TABLE IF NOT EXISTS `sidebar_widgets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `widget_type` ENUM('profile', 'links', 'image_link') NOT NULL,
  `title` VARCHAR(255),
  `subtitle` VARCHAR(255),
  `image_url` VARCHAR(2048),
  `link_url` VARCHAR(2048),
  `link_text` VARCHAR(255),
  `content` TEXT,
  `sort_order` INT DEFAULT 0
);

-- Create the 'about_school' table to hold the main content for the "About Us" section.
CREATE TABLE IF NOT EXISTS `about_school` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(2048) NOT NULL
);

-- Create the 'school_features' table to hold the feature cards on the "School Details" page.
CREATE TABLE IF NOT EXISTS `school_features` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `icon` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL
);

-- Create the 'important_link_groups' table.
CREATE TABLE IF NOT EXISTS `important_link_groups` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `image` VARCHAR(2048) NOT NULL,
  `data_ai_hint` VARCHAR(255),
  `sort_order` INT DEFAULT 0
);

-- Create the 'important_links' table.
CREATE TABLE IF NOT EXISTS `important_links` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `href` VARCHAR(2048) NOT NULL,
  `sort_order` INT DEFAULT 0,
  FOREIGN KEY (group_id) REFERENCES important_link_groups(id) ON DELETE CASCADE
);

-- Create the 'school_info' table to hold general site information.
CREATE TABLE IF NOT EXISTS `school_info` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `logo_url` VARCHAR(2048) NOT NULL
);


-- You can run the following INSERT statements to populate your tables with initial data.
-- Make sure to adjust the values to your liking.

-- Example data for 'sidebar_widgets'
-- INSERT INTO `sidebar_widgets` (`widget_type`, `title`, `subtitle`, `image_url`, `link_url`, `link_text`, `content`, `sort_order`) VALUES
-- ('profile', 'চেয়ারম্যান মহোদয়', 'প্রফেসর মোঃ তৌহিদুল ইসলাম', 'https://dinajpureducationboard.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/officer_list/f9cf0e70_e4af_4764_8abe_83a9633483c9/Professor%20Md.%20Towhidul%20Islam.jpeg', NULL, NULL, NULL, 1),
-- ('profile', 'সচিব', 'প্রফেসর নূর মোঃ আব্দুর রাজ্জাক', 'https://images.unsplash.com/photo-1640583818579-740430212d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8YmFuZ2xhZGVzaGklMjB0ZWFjaGVyfGVufDB8fHx8MTc1MzQxNDQ5MHww&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, NULL, 2),
-- ('links', 'অভ্যন্তরীণ ই-সেবাসমূহ', NULL, NULL, '#', 'সকল', '[{"text": "ই-নথি", "url": "#"}, {"text": "DBTP", "url": "#"}]', 3),
-- ('image_link', 'myGov', NULL, 'https://dinajpureducationboard.gov.bd/sites/default/files/files/bmeb.portal.gov.bd/page/f35745b2_55a9_4633_afe5_a2ccd180add8/mygov_bn.png', '#', NULL, NULL, 4),
-- ('image_link', 'Digital Service', NULL, 'https://dinajpureducationboard.gov.bd/sites/default/files/files/bmeb.portal.gov.bd/page/f35745b2_55a9_4633_afe5_a2ccd180add8/digital_service_bn.png', '#', NULL, NULL, 5),
-- ('image_link', 'National Portal', NULL, 'https://dinajpureducationboard.gov.bd/sites/default/files/files/bmeb.portal.gov.bd/page/f35745b2_55a9_4633_afe5_a2ccd180add8/National-portal_bn.gif', '#', NULL, NULL, 6),
-- ('links', 'গুরুত্বপূর্ণ লিঙ্ক সমূহ', NULL, NULL, NULL, NULL, '[{"text": "জনপ্রশাসন মন্ত্রণালয়", "url": "#"}, {"text": "শিক্ষা মন্ত্রনালয়", "url": "#"}]', 7),
-- ('image_link', 'Internal E-Service', NULL, 'https://dinajpureducationboard.gov.bd/sites/default/files/files/bmeb.portal.gov.bd/page/f35745b2_55a9_4633_afe5_a2ccd180add8/internal_eservice2.gif', '#', NULL, NULL, 8);


-- Example data for 'about_school'
-- INSERT INTO `about_school` (`title`, `description`, `image_url`) VALUES
-- ('আমাদের সম্পর্কে', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা।', 'https://placehold.co/400x500.png');


-- Example data for 'school_features'
-- INSERT INTO `school_features` (`icon`, `title`, `description`) VALUES
-- ('History', 'আমাদের ইতিহাস', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় প্রতিষ্ঠিত হয়েছিল ১৯৯০ সালে।'),
-- ('Target', 'আমাদের লক্ষ্য ও উদ্দেশ্য', 'আমাদের মূল লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধে উদ্বুদ্ধ করে একজন আদর্শ নাগরিক হিসেবে গড়ে তোলা।');


-- Example data for 'important_link_groups' and 'important_links'
-- INSERT INTO `important_link_groups` (`title`, `image`, `data_ai_hint`, `sort_order`) VALUES
-- ('শিক্ষা বোর্ড', 'https://placehold.co/110x110.png', 'education board', 1),
-- ('অন্যান্য', 'https://placehold.co/110x110.png', 'books library', 2);

-- INSERT INTO `important_links` (`group_id`, `text`, `href`, `sort_order`) VALUES
-- (1, 'ঢাকা শিক্ষা বোর্ড', '#', 1),
-- (1, 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর', '#', 2),
-- (2, 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড', '#', 1);

-- Example data for 'school_info'
-- INSERT INTO `school_info` (`name`, `address`, `logo_url`) VALUES
-- ('মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', 'কাফ্রিখাল, মিঠাপুকুর, রংপুর।', 'https://placehold.co/80x80.png');
