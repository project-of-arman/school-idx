-- Main School Information
CREATE TABLE school_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255)
);

INSERT INTO school_info (name, address, logo_url) VALUES
('মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', 'কাফ্রিখাল, মিঠাপুকুর, রংপুর।', 'https://placehold.co/80x80.png');

-- About School Section
CREATE TABLE about_school (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255)
);

INSERT INTO about_school (title, description, image_url) VALUES
('আমাদের সম্পর্কে', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় একটি ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মধ্যে জ্ঞান, সৃজনশীলতা এবং নৈতিক মূল্যবোধের বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা। একটি অভিজ্ঞ শিক্ষক মণ্ডলী, আধুনিক শ্রেণীকক্ষ এবং সমৃদ্ধ লাইব্রেরি নিয়ে আমাদের পথচলা। আমরা বিশ্বাস করি, সঠিক পরিচর্যা এবং অনুকূল পরিবেশ পেলে প্রতিটি শিক্ষার্থীই তার সুপ্ত প্রতিভা বিকশিত করতে পারে।', 'https://placehold.co/400x500.png');


-- School Features (for About School and School Details page)
CREATE TABLE school_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  icon VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO school_features (icon, title, description) VALUES
('History', 'আমাদের ইতিহাস', 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয় প্রতিষ্ঠিত হয়েছিল ১৯৯০ সালে।'),
('Target', 'আমাদের লক্ষ্য ও উদ্দেশ্য', 'আমাদের মূল লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধে উদ্বুদ্ধ করে একজন আদর্শ নাগরিক হিসেবে গড়ে তোলা।'),
('BookOpen', 'একাডেমিক কার্যক্রম', 'আমরা জাতীয় শিক্ষাক্রম অনুসরণ করে থাকি।'),
('Users', 'অভিজ্ঞ শিক্ষক মণ্ডলী', 'আমাদের প্রতিষ্ঠানে রয়েছেন একদল অভিজ্ঞ, প্রশিক্ষণপ্রাপ্ত এবং নিবেদিতপ্রাণ শিক্ষক।'),
('Building', 'অবকাঠামো', 'আমাদের রয়েছে একটি সুবিশাল ক্যাম্পাস, আধুনিক শ্রেণীকক্ষ, সমৃদ্ধ লাইব্রেরি, বিজ্ঞানাগার এবং খেলার মাঠ।'),
('Award', 'অর্জনসমূহ', 'বিগত বছরগুলোতে আমাদের শিক্ষার্থীরা বিভিন্ন জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণ করে অসংখ্য পুরস্কার অর্জন করেছে।');


-- Important Link Groups
CREATE TABLE important_link_groups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    data_ai_hint VARCHAR(255),
    sort_order INT DEFAULT 0
);

-- Important Links
CREATE TABLE important_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    group_id INT,
    text VARCHAR(255) NOT NULL,
    href VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (group_id) REFERENCES important_link_groups(id) ON DELETE CASCADE
);

INSERT INTO important_link_groups (title, image, data_ai_hint, sort_order) VALUES
('শিক্ষা বোর্ড', 'https://placehold.co/110x110.png', 'education board', 1),
('অন্যান্য', 'https://placehold.co/110x110.png', 'books library', 2);

INSERT INTO important_links (group_id, text, href, sort_order) VALUES
(1, 'ঢাকা শিক্ষা বোর্ড', '#', 1),
(1, 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর', '#', 2),
(1, 'বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো', '#', 3),
(1, 'পাঠদান ও স্বীকৃতি', '/recognition', 4),
(2, 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড', '#', 1),
(2, 'শিক্ষক বাতায়ন', '#', 2),
(2, 'মুক্তপাঠ', '#', 3);


-- Navigation Links
CREATE TABLE nav_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  href VARCHAR(255),
  parent_id INT,
  sort_order INT DEFAULT 0,
  icon VARCHAR(50),
  FOREIGN KEY (parent_id) REFERENCES nav_links(id) ON DELETE CASCADE
);

INSERT INTO nav_links (id, title, href, parent_id, sort_order, icon) VALUES
(1, 'হোম', '/', NULL, 1, 'Home'),
(2, 'স্কুল সম্পর্কিত', '/school-details', NULL, 2, NULL),
(3, 'কমিটি', '/committee', NULL, 3, NULL),
(4, 'ভর্তি নির্দেশিকা', '/admission-guidelines', NULL, 4, NULL),
(5, 'ফলাফল', '/results', NULL, 5, NULL),
(6, 'সকল ফরমস', '/forms', NULL, 6, NULL),
(7, 'যোগাযোগ ও ফিডব্যাক', '/contact', NULL, 7, NULL),
(8, 'গ্যালারি', NULL, NULL, 8, NULL);

INSERT INTO nav_links (id, title, href, parent_id, sort_order, icon) VALUES
(9, 'ছবি গ্যালারি', '/gallery', 8, 1, NULL),
(10, 'ভিডিও গ্যালারি', '/videos', 8, 2, NULL);


-- Videos Table
CREATE TABLE videos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255) NOT NULL,
  videoUrl VARCHAR(255) NOT NULL,
  description TEXT,
  dataAiHint VARCHAR(255)
);

INSERT INTO videos (id, title, thumbnail, videoUrl, description, dataAiHint) VALUES
(1, 'বার্ষিক সাংস্কৃতিক অনুষ্ঠান', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'আমাদের প্রতিষ্ঠানের বার্ষিক সাংস্কৃতিক অনুষ্ঠানের মনোমুগ্ধকর কিছু মুহূর্ত।', 'school event'),
(2, 'স্বাধীনতা দিবস উদযাপন', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'মহান স্বাধীনতা দিবস উপলক্ষে আয়োজিত বিশেষ অনুষ্ঠানের কিছু অংশ।', 'independence day'),
(3, 'বৃক্ষরোপণ কর্মসূচি', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'পরিবেশ রক্ষায় আমাদের শিক্ষার্থীদের স্বতঃস্ফূর্ত অংশগ্রহণ।', 'tree plantation'),
(4, 'বিজ্ঞান মেলা', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'শিক্ষার্থীদের উদ্ভাবনী প্রকল্পের প্রদর্শনী।', 'science fair'),
(5, 'ক্রীড়া প্রতিযোগিতা', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'বার্ষিক ক্রীড়া প্রতিযোগিতার উত্তেজনাপূর্ণ মুহূর্ত।', 'sports day'),
(6, 'নবীন বরণ', 'https://placehold.co/600x400.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'নতুন শিক্ষার্থীদের বরণ করে নেওয়ার আনন্দঘন মুহূর্ত।', 'student reception');


-- Committee Members Table
CREATE TABLE committee_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  dataAiHint VARCHAR(255),
  sort_order INT DEFAULT 0
);

INSERT INTO committee_members (name, role, image, dataAiHint, sort_order) VALUES
('প্রফেসর ড. মোঃ আখতারুজ্জামান', 'সভাপতি', 'https://placehold.co/300x400.png', 'male portrait', 1),
('অধ্যক্ষ মোসাঃ হাসিনা পারভীন', 'সদস্য সচিব', 'https://placehold.co/300x400.png', 'female portrait', 2),
('জনাব মোঃ আব্দুল্লাহ', 'অভিভাবক সদস্য', 'https://placehold.co/300x400.png', 'male portrait', 3),
('মিসেস ফরিদা ইয়াসমিন', 'অভিভাবক সদস্য', 'https://placehold.co/300x400.png', 'female portrait', 4),
('জনাব মোঃ কামরুল হাসান', 'শিক্ষক প্রতিনিধি', 'https://placehold.co/300x400.png', 'male teacher portrait', 5),
('মিসেস সালমা চৌধুরী', 'শিক্ষক প্রতিনিধি', 'https://placehold.co/300x400.png', 'female teacher portrait', 6),
('জেলা প্রশাসক, ঢাকা', 'সদস্য', 'https://placehold.co/300x400.png', 'official portrait', 7),
('প্রধান শিক্ষক', 'সদস্য', 'https://placehold.co/300x400.png', 'male teacher portrait', 8);
