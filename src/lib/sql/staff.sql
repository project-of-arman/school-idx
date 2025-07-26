
CREATE TABLE `staff` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `image` LONGTEXT NULL,
  `address` VARCHAR(255) NULL,
  `phone` VARCHAR(20) NULL,
  `email` VARCHAR(255) NULL,
  `data_ai_hint` VARCHAR(255) NULL DEFAULT 'staff portrait',
  PRIMARY KEY (`id`)
);

-- Mock Data
INSERT INTO `staff` (`name`, `role`, `image`, `address`, `phone`, `email`, `data_ai_hint`) VALUES
('মোঃ রফিকুল ইসলাম', 'হিসাবরক্ষক', 'https://placehold.co/300x400.png', 'ঢাকা, বাংলাদেশ', '01712345678', 'rafiqul@example.com', 'male staff portrait'),
('আকলিমা খাতুন', 'অফিস সহকারী', 'https://placehold.co/300x400.png', 'ঢাকা, বাংলাদেশ', '01812345678', 'aklima@example.com', 'female staff portrait'),
('हरिदास সাহা', 'লাইব্রেরিয়ান', 'https://placehold.co/300x400.png', 'ঢাকা, বাংলাদেশ', '01912345678', 'haridas@example.com', 'male staff portrait'),
('বিপ্লব বড়ুয়া', 'ল্যাব সহকারী', 'https://placehold.co/300x400.png', 'ঢাকা, বাংলাদেশ', '01512345678', 'biplob@example.com', 'male staff portrait');
