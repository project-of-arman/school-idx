
-- This is a reference for the database schema.
-- You can run this file against your MySQL database to create the necessary tables.

-- Notices Table
CREATE TABLE IF NOT EXISTS notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date VARCHAR(100) NOT NULL,
  fileUrl VARCHAR(255),
  description TEXT
);


-- Sidebar Widgets Table
CREATE TABLE IF NOT EXISTS sidebar_widgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    widget_type ENUM('profile', 'links', 'image_link') NOT NULL,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    image_url VARCHAR(255),
    link_url VARCHAR(255),
    link_text VARCHAR(100),
    content TEXT, -- JSON content for links
    sort_order INT DEFAULT 0
);


-- About School Table
CREATE TABLE IF NOT EXISTS about_school (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);


-- School Features Table
CREATE TABLE IF NOT EXISTS school_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);


-- Insert some mock data for notices
INSERT INTO notices (title, date, fileUrl, description) VALUES
('ভর্তি পরীক্ষার ফলাফল প্রকাশ', '২০ জুলাই, ২০২৪', '#', '২০২৪-২৫ শিক্ষাবর্ষের ভর্তি পরীক্ষার ফলাফল প্রকাশিত হয়েছে।'),
('বার্ষিক ক্রীড়া প্রতিযোগিতার সময়সূচী', '১৮ জুলাই, ২০২৪', '#', 'প্রতিষ্ঠানের বার্ষিক ক্রীড়া প্রতিযোগিতা আগামী ২৫শে জুলাই অনুষ্ঠিত হবে।'),
('অভিভাবক সমাবেশ সংক্রান্ত বিজ্ঞপ্তি', '১৫ জুলাই, ২০২৪', '#', 'সকল শ্রেণীর শিক্ষার্থীদের অভিভাবকদের নিয়ে একটি গুরুত্বপূর্ণ সভা আগামী ২২শে জুলাই অনুষ্ঠিত হবে।');

-- Insert mock data for sidebar widgets
INSERT INTO sidebar_widgets (widget_type, title, subtitle, image_url, link_url, link_text, content, sort_order) VALUES
('profile', 'চেয়ারম্যান মহোদয়', 'প্রফেসর মোঃ তৌহিদুল ইসলাম', 'https://dinajpureducationboard.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/officer_list/f9cf0e70_e4af_4764_8abe_83a9633483c9/Professor%20Md.%20Towhidul%20Islam.jpeg', NULL, NULL, NULL, 1),
('profile', 'সচিব', 'প্রফেসর নূর মোঃ আব্দুর রাজ্জাক', 'https://images.unsplash.com/photo-1640583818579-740430212d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8YmFuZ2xhZGVzaGklMjB0ZWFjaGVyfGVufDB8fHx8MTc1MzQxNDQ5MHww&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, NULL, 2),
('links', 'অভ্যন্তরীণ ই-সেবাসমূহ', NULL, NULL, '#', 'সকল', '[{"text": "ই-নথি", "url": "#"}, {"text": "DBTP", "url": "#"}, {"text": "Sonali Sheba", "url": "#"}]', 3),
('image_link', 'myGov', NULL, 'http://dinajpureducationboard.portal.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/page/034226d9_29a7_4461_9495_22f2284e363a/myGov.png', '#', NULL, NULL, 4),
('image_link', 'Digital Service', NULL, 'http://dinajpureducationboard.portal.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/page/89f2a71f_8e3c_487c_a5a8_a78c1c5a7114/2022/10/doptor-bn-25-10-22.jpg', '#', NULL, NULL, 5),
('image_link', 'National Portal', NULL, 'https://dinajpureducationboard.gov.bd/sites/default/files/files/bmeb.portal.gov.bd/page/f35745b2_55a9_4633_afe5_a2ccd180add8/National-portal_bn.gif', '#', NULL, NULL, 6),
('links', 'গুরুত্বপূর্ণ লিঙ্ক সমূহ', NULL, NULL, NULL, NULL, '[{"text": "জনপ্রশাসন মন্ত্রণালয়", "url": "#"}, {"text": "শিক্ষা মন্ত্রনালয়", "url": "#"}]', 7),
('image_link', 'Internal E-Service', NULL, 'https://dinajpureducationboard.gov.bd/sites/default/files/files/bmeb.portal.gov.bd/page/f35745b2_55a9_4633_afe5_a2ccd180add8/internal_eservice2.gif', '#', NULL, NULL, 8);


-- Insert mock data for about_school
INSERT INTO about_school (id, title, description, image_url) VALUES
(1, 'আমাদের সম্পর্কে', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা।', 'https://placehold.co/400x500.png');

-- Insert mock data for school_features
INSERT INTO school_features (icon, title, description) VALUES
('History', 'আমাদের ইতিহাস', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় প্রতিষ্ঠিত হয়েছিল ১৯৯০ সালে।'),
('Target', 'আমাদের লক্ষ্য ও উদ্দেশ্য', 'আমাদের মূল লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধে উদ্বুদ্ধ করে একজন আদর্শ নাগরিক হিসেবে গড়ে তোলা।'),
('BookOpen', 'একাডেমিক কার্যক্রম', 'আমরা জাতীয় শিক্ষাক্রম অনুসরণ করে থাকি।'),
('Users', 'অভিজ্ঞ শিক্ষক মণ্ডলী', 'আমাদের প্রতিষ্ঠানে রয়েছেন একদল অভিজ্ঞ, প্রশিক্ষণপ্রাপ্ত এবং নিবেদিতপ্রাণ শিক্ষক।'),
('Building', 'অবকাঠামো', 'আমাদের রয়েছে একটি সুবিশাল ক্যাম্পাস, আধুনিক শ্রেণীকক্ষ, সমৃদ্ধ লাইব্রেরি, বিজ্ঞানাগার এবং খেলার মাঠ।'),
('Award', 'অর্জনসমূহ', 'বিগত বছরগুলোতে আমাদের শিক্ষার্থীরা বিভিন্ন জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণ করে অসংখ্য পুরস্কার অর্জন করেছে।');


-- Table for important link groups
CREATE TABLE IF NOT EXISTS important_link_groups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  data_ai_hint VARCHAR(255),
  sort_order INT DEFAULT 0
);

-- Table for individual important links
CREATE TABLE IF NOT EXISTS important_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  text VARCHAR(255) NOT NULL,
  href VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (group_id) REFERENCES important_link_groups(id) ON DELETE CASCADE
);

-- Mock data for important link groups
INSERT INTO important_link_groups (id, title, image, data_ai_hint, sort_order) VALUES
(1, 'শিক্ষা বোর্ড', 'https://placehold.co/110x110.png', 'education board', 1),
(2, 'অন্যান্য', 'https://placehold.co/110x110.png', 'books library', 2);

-- Mock data for important links
INSERT INTO important_links (group_id, text, href, sort_order) VALUES
(1, 'ঢাকা শিক্ষা বোর্ড', '#', 1),
(1, 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর', '#', 2),
(1, 'বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো', '#', 3),
(1, 'পাঠদান ও স্বীকৃতি', '/recognition', 4),
(2, 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড', '#', 1),
(2, 'শিক্ষক বাতায়ন', '#', 2),
(2, 'মুক্তপাঠ', '#', 3);
