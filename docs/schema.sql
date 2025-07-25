-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- About School Table
CREATE TABLE IF NOT EXISTS about_school (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    data_ai_hint VARCHAR(255)
);

-- School Features Table
CREATE TABLE IF NOT EXISTS school_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0
);

-- School Info Table
CREATE TABLE IF NOT EXISTS school_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    logo_url VARCHAR(255)
);

-- Important Link Groups Table
CREATE TABLE IF NOT EXISTS important_link_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    data_ai_hint VARCHAR(255),
    sort_order INT DEFAULT 0
);

-- Important Links Table
CREATE TABLE IF NOT EXISTS important_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT,
    text VARCHAR(255) NOT NULL,
    href VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (group_id) REFERENCES important_link_groups(id) ON DELETE CASCADE
);

-- Navigation Links Table
CREATE TABLE IF NOT EXISTS nav_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    href VARCHAR(255),
    icon VARCHAR(255),
    parent_id INT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (parent_id) REFERENCES nav_links(id) ON DELETE CASCADE
);

-- Notices Table
CREATE TABLE IF NOT EXISTS notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  fileUrl VARCHAR(255),
  description TEXT
);

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255) NOT NULL,
  videoUrl VARCHAR(255) NOT NULL,
  description TEXT,
  dataAiHint VARCHAR(255)
);


-- #############################################################################
-- Sample Data (optional)
-- #############################################################################

-- Insert sample school_info
INSERT INTO school_info (name, address, logo_url) VALUES ('মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', 'কাফ্রিখাল, মিঠাপুকুর, রংপুর।', 'https://placehold.co/80x80.png');

-- Insert sample about_school
INSERT INTO about_school (title, description, image_url, data_ai_hint) VALUES ('আমাদের সম্পর্কে', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা। একটি অভিজ্ঞ শিক্ষক মণ্ডলী, আধুনিক শ্রেণীকক্ষ এবং সমৃদ্ধ লাইব্রেরি নিয়ে আমাদের পথচলা। আমরা বিশ্বাস করি, সঠিক পরিচর্যা এবং অনুকূল পরিবেশ পেলে প্রতিটি শিক্ষার্থীই তার সুপ্ত প্রতিভা বিকশিত করতে পারে।\r\n\r\n', 'https://dinajpureducationboard.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/officer_list/f9cf0e70_e4af_4764_8abe_83a9633483c9/Professor%20Md.%20Towhidul%20Islam.jpeg', 'school building');


-- Insert sample school_features
INSERT INTO school_features (icon, title, description, sort_order) VALUES
('History', 'আমাদের ইতিহাস', 'শিক্ষা অঙ্গন প্রতিষ্ঠিত হয়েছিল ১৯৯০ সালে। প্রতিষ্ঠার পর থেকে আমরা জ্ঞানের আলো ছড়িয়ে যাচ্ছি এবং হাজারো শিক্ষার্থীর भविष्य গড়ে তুলেছি। আমাদের রয়েছে দীর্ঘদিনের গৌরবময় ইতিহাস।\r\n\r\n', 0),
('Target', 'আমাদের লক্ষ্য ও উদ্দেশ্য', 'আমাদের মূল লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধে উদ্বুদ্ধ করে একজন আদর্শ নাগরিক হিসেবে গড়ে তোলা। আমরা সৃজনশীলতা ও মননশীলতার বিকাশে বিশ্বাসী।\r\n\r\n', 1),
('History', 'আমাদের ইতিহাস', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় প্রতিষ্ঠিত হয়েছিল ১৯৯০ সালে।', 0),
('Target', 'আমাদের লক্ষ্য ও উদ্দেশ্য', 'আমাদের মূল লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধে উদ্বুদ্ধ করে একজন আদর্শ নাগরিক হিসেবে গড়ে তোলা।', 0),
('BookOpen', 'একাডেমিক কার্যক্রম', 'আমরা জাতীয় শিক্ষাক্রম অনুসরণ করে থাকি।', 0);


-- Insert sample important_link_groups and links
INSERT INTO important_link_groups (title, image, data_ai_hint, sort_order) VALUES
('বিদ্যালয় সংক্রান্ত আদেশ', 'https://dinajpureducationboard.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/front_service_box/02688086_81fb_4a79_90ad_f435538f8d6d/scholarship.png', 'school orders', 1),
('নাম ও বয়স সংশোধন সংক্রান্ত', 'https://dinajpureducationboard.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/front_service_box/7c4909e0_609f_472a_b56c_c686e54532d7/images%20(1).png', 'name and age management', 2),
('পরীক্ষা সংক্রান্ত\r\n', 'https://dinajpureducationboard.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/front_service_box/d0310f06_67e3_4d24_9027_736d8a2a1ce9/Examination_ex.png', 'exam essentials ', 3);

INSERT INTO important_links (group_id, text, href, sort_order) VALUES
(1, 'ঢাকা শিক্ষা বোর্ড', '#', 1),
(1, 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর', '#', 2),
(1, 'বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো', '#', 3),
(1, 'পাঠদান ও স্বীকৃতি', '/recognition', 4),
(2, 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড', '#', 1),
(2, 'শিক্ষক বাতায়ন', '#', 2),
(2, 'মুক্তপাঠ', '#', 3),
(3, 'জেএসসি পরীক্ষা', 'https://dinajpureducationboard.gov.bd/', 1),
(3, 'এসএসসি পরীক্ষা', 'https://dinajpureducationboard.gov.bd/', 2),
(3, 'এইচএসসি পরীক্ষা', 'https://dinajpureducationboard.gov.bd/', 3);

-- Insert sample nav_links
INSERT INTO nav_links (id, title, href, icon, parent_id, sort_order) VALUES
(1, 'হোম', '/', 'Home', NULL, 1),
(2, 'স্কুল সম্পর্কিত', '/school-details', NULL, NULL, 2),
(3, 'কমিটি', '/committee', NULL, NULL, 3),
(4, 'ভর্তি নির্দেশিকা', '/admission-guidelines', NULL, NULL, 4),
(5, 'ফলাফল', '/results', NULL, NULL, 5),
(6, 'সকল ফরমস', '/forms', NULL, NULL, 6),
(7, 'যোগাযোগ ও ফিডব্যাক', '/contact', NULL, NULL, 7),
(8, 'গ্যালারি', NULL, NULL, NULL, 8);

INSERT INTO nav_links (id, title, href, icon, parent_id, sort_order) VALUES
(9, 'ছবি গ্যালারি', '/gallery', NULL, 8, 1),
(10, 'ভিডিও গ্যালারি', '/#video-gallery', NULL, 8, 2);

-- Insert sample notices
INSERT INTO notices (title, date, fileUrl, description) VALUES
('ভর্তি পরীক্ষার ফলাফল প্রকাশ', '২০ জুলাই, ২০২৪', '#', '২০২৪-২৫ শিক্ষাবর্ষের ভর্তি পরীক্ষার ফলাফল প্রকাশিত হয়েছে। উত্তীর্ণ শিক্ষার্থীদের তালিকা এবং ভর্তির পরবর্তী নির্দেশনা জানতে পারবেন συνημμένο ফাইল থেকে।'),
('বার্ষিক ক্রীড়া প্রতিযোগিতার সময়সূচী', '১৮ জুলাই, ২০২৪', '#', 'প্রতিষ্ঠানের বার্ষিক ক্রীড়া প্রতিযোগিতা আগামী ২৫শে জুলাই অনুষ্ঠিত হবে। বিস্তারিত সময়সূচী জানতে পারবেন συνημμένο ফাইল থেকে।'),
('অভিভাবক সমাবেশ সংক্রান্ত বিজ্ঞপ্তি', '১৫ জুলাই, ২০২৪', '#', 'সকল শ্রেণীর শিক্ষার্থীদের অভিভাবকদের নিয়ে একটি গুরুত্বপূর্ণ সভা আগামী ২২শে জুলাই অনুষ্ঠিত হবে। আপনাদের উপস্থিতি একান্ত কাম্য।'),
('গ্রীষ্মকালীন ছুটির নোটিশ', '১০ জুলাই, ২০২৪', '#', 'আগামী ১লা আগস্ট থেকে ১৫ই আগস্ট পর্যন্ত গ্রীষ্মকালীন ছুটি উপলক্ষে প্রতিষ্ঠান বন্ধ থাকবে। ১৬ই আগস্ট থেকে যথারীতি ক্লাস চলবে।'),
('বিজ্ঞান মেলার আয়োজন', '০৫ জুলাই, ২০২৪', '#', 'আগামী ১০ই আগস্ট তারিখে বিদ্যালয়ে একটি বিজ্ঞান মেলার আয়োজন করা হয়েছে। আগ্রহী শিক্ষার্থীদের প্রকল্প জমা দেওয়ার জন্য অনুরোধ করা হলো।');

-- Insert sample videos
INSERT INTO videos (id, title, thumbnail, videoUrl, description, dataAiHint) VALUES
('1', 'বার্ষিক সাংস্কৃতিক অনুষ্ঠান', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'আমাদের প্রতিষ্ঠানের বার্ষিক সাংস্কৃতিক অনুষ্ঠানের মনোমুগ্ধকর কিছু মুহূর্ত।', 'school event'),
('2', 'স্বাধীনতা দিবস উদযাপন', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'মহান স্বাধীনতা দিবস উপলক্ষে আয়োজিত বিশেষ অনুষ্ঠানের কিছু অংশ।', 'independence day'),
('3', 'বৃক্ষরোপণ কর্মসূচি', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'পরিবেশ রক্ষায় আমাদের শিক্ষার্থীদের স্বতঃস্ফূর্ত অংশগ্রহণ।', 'tree plantation'),
('4', 'বিজ্ঞান মেলা', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'শিক্ষার্থীদের উদ্ভাবনী প্রকল্পের প্রদর্শনী।', 'science fair'),
('5', 'ক্রীড়া প্রতিযোগিতা', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'বার্ষিক ক্রীড়া প্রতিযোগিতার উত্তেজনাপূর্ণ মুহূর্ত।', 'sports day'),
('6', 'নবীন বরণ', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'নতুন শিক্ষার্থীদের বরণ করে নেওয়ার আনন্দঘন মুহূর্ত।', 'student reception');

