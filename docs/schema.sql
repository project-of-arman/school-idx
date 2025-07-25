-- Main school information
CREATE TABLE school_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255)
);

-- About school section for homepage
CREATE TABLE about_school (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

-- Features for about school page and homepage section
CREATE TABLE school_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Important link groups for homepage
CREATE TABLE important_link_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    data_ai_hint VARCHAR(255),
    sort_order INT DEFAULT 0
);

-- Individual links for the important link groups
CREATE TABLE important_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT,
    text VARCHAR(255) NOT NULL,
    href VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (group_id) REFERENCES important_link_groups(id) ON DELETE CASCADE
);

-- Navigation links
CREATE TABLE nav_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  href VARCHAR(255),
  parent_id INT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  icon VARCHAR(255) NULL,
  FOREIGN KEY (parent_id) REFERENCES nav_links(id) ON DELETE CASCADE
);


-- =================================================================
-- SAMPLE DATA INSERTS
-- =================================================================

-- School Info Sample
INSERT INTO school_info (name, address, logo_url) VALUES
('মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', 'কাফ্রিখাল, মিঠাপুকুর, রংপুর।', 'https://placehold.co/80x80.png');

-- About School Sample
INSERT INTO about_school (title, description, image_url) VALUES
('আমাদের সম্পর্কে', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা।', 'https://placehold.co/400x500.png');

-- School Features Sample
INSERT INTO school_features (icon, title, description) VALUES
('History', 'আমাদের ইতিহাস', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় প্রতিষ্ঠিত হয়েছিল ১৯৯০ সালে। প্রতিষ্ঠার পর থেকে আমরা জ্ঞানের আলো ছড়িয়ে যাচ্ছি এবং হাজারো শিক্ষার্থীর भविष्य গড়ে তুলেছি। আমাদের রয়েছে দীর্ঘদিনের গৌরবময় ইতিহাস।'),
('Target', 'আমাদের লক্ষ্য ও উদ্দেশ্য', 'আমাদের মূল লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধে উদ্বুদ্ধ করে একজন আদর্শ নাগরিক হিসেবে গড়ে তোলা। আমরা সৃজনশীলতা ও মননশীলতার বিকাশে বিশ্বাসী।'),
('BookOpen', 'একাডেমিক কার্যক্রম', 'আমরা জাতীয় শিক্ষাক্রম অনুসরণ করে থাকি। প্রাথমিক থেকে উচ্চ মাধ্যমিক পর্যন্ত আমাদের শিক্ষা কার্যক্রম পরিচালিত হয়। সহশিক্ষা কার্যক্রমের অংশ হিসেবে রয়েছে বিতর্ক, খেলাধুলা, এবং সাংস্কৃতিক চর্চা।'),
('Users', 'অভিজ্ঞ শিক্ষক মণ্ডলী', 'আমাদের প্রতিষ্ঠানে রয়েছেন একদল অভিজ্ঞ, প্রশিক্ষণপ্রাপ্ত এবং নিবেদিতপ্রাণ শিক্ষক। তারা শিক্ষার্থীদের সঠিক পথপ্রদর্শক হিসেবে কাজ করেন।'),
('Building', 'অবকাঠামো', 'আমাদের রয়েছে একটি সুবিশাল ক্যাম্পাস, আধুনিক শ্রেণীকক্ষ, সমৃদ্ধ লাইব্রেরি, বিজ্ঞানাগার এবং খেলার মাঠ। শিক্ষার্থীদের জন্য সকল সুযোগ-সুবিধা নিশ্চিত করা হয়েছে।'),
('Award', 'অর্জনসমূহ', 'বিগত বছরগুলোতে আমাদের শিক্ষার্থীরা বিভিন্ন জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণ করে অসংখ্য পুরস্কার অর্জন করেছে, যা আমাদের জন্য অত্যন্ত গৌরবের।');

-- Important Link Groups Sample
INSERT INTO important_link_groups (title, image, data_ai_hint, sort_order) VALUES
('শিক্ষা বোর্ড', 'https://placehold.co/110x110.png', 'education board', 1),
('অন্যান্য', 'https://placehold.co/110x110.png', 'books library', 2);

-- Important Links Sample (for group 1)
INSERT INTO important_links (group_id, text, href, sort_order) VALUES
(1, 'ঢাকা শিক্ষা বোর্ড', '#', 1),
(1, 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর', '#', 2),
(1, 'বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো', '#', 3),
(1, 'পাঠদান ও স্বীকৃতি', '/recognition', 4);

-- Important Links Sample (for group 2)
INSERT INTO important_links (group_id, text, href, sort_order) VALUES
(2, 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড', '#', 1),
(2, 'শিক্ষক বাতায়ন', '#', 2),
(2, 'মুক্তপাঠ', '#', 3);

-- Nav Links Sample
INSERT INTO nav_links (id, title, href, parent_id, sort_order, icon) VALUES
(1, 'হোম', '/', NULL, 1, 'Home'),
(2, 'স্কুল সম্পর্কিত', '/school-details', NULL, 2, NULL),
(3, 'কমিটি', '/committee', NULL, 3, NULL),
(4, 'ভর্তি নির্দেশিকা', '/admission-guidelines', NULL, 4, NULL),
(5, 'ফলাফল', '/results', NULL, 5, NULL),
(6, 'সকল ফরমস', '/forms', NULL, 6, NULL),
(7, 'যোগাযোগ ও ফিডব্যাক', '/contact', NULL, 7, NULL),
(8, 'গ্যালারি', NULL, NULL, 8, NULL);

INSERT INTO nav_links (title, href, parent_id, sort_order) VALUES
('ছবি গ্যালারি', '/gallery', 8, 1),
('ভিডিও গ্যালারি', '/#video-gallery', 8, 2);
