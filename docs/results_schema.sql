
-- Create the results table
CREATE TABLE IF NOT EXISTS `results` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `roll` VARCHAR(20) NOT NULL,
  `class_name` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `exam_name` VARCHAR(100) NOT NULL,
  `group_name` VARCHAR(50),
  `father_name` VARCHAR(100),
  `mother_name` VARCHAR(100),
  `image` VARCHAR(255),
  `data_ai_hint` VARCHAR(255),
  `final_gpa` DECIMAL(4, 2) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  INDEX `roll_class_idx` (`roll`, `class_name`)
);

-- Create the subject_grades table
CREATE TABLE IF NOT EXISTS `subject_grades` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `result_id` INT NOT NULL,
  `subject_name` VARCHAR(100) NOT NULL,
  `grade` VARCHAR(5) NOT NULL,
  `gpa` DECIMAL(4, 2) NOT NULL,
  FOREIGN KEY (`result_id`) REFERENCES `results`(`id`) ON DELETE CASCADE
);

-- Truncate tables before inserting to avoid duplicate data on re-run
TRUNCATE TABLE `subject_grades`;
TRUNCATE TABLE `results`;

-- Insert sample data for result 1
INSERT INTO `results` (`roll`, `class_name`, `name`, `exam_name`, `group_name`, `father_name`, `mother_name`, `image`, `data_ai_hint`, `final_gpa`, `status`) VALUES
('101', '১০ম', 'আরিফ হোসেন', 'বার্ষিক পরীক্ষা - ২০২৪', 'বিজ্ঞান', 'মোঃ আব্দুল্লাহ', 'ফাতেমা বেগম', 'https://placehold.co/300x400.png', 'male student portrait', 4.44, 'Promoted');

SET @last_result_id = LAST_INSERT_ID();

INSERT INTO `subject_grades` (`result_id`, `subject_name`, `grade`, `gpa`) VALUES
(@last_result_id, 'বাংলা ১ম পত্র', 'A+', 5.00),
(@last_result_id, 'বাংলা ২য় পত্র', 'A', 4.00),
(@last_result_id, 'ইংরেজি ১ম পত্র', 'A', 4.00),
(@last_result_id, 'ইংরেজি ২য় পত্র', 'A', 4.00),
(@last_result_id, 'গণিত', 'A+', 5.00),
(@last_result_id, 'পদার্থবিজ্ঞান', 'A', 4.00),
(@last_result_id, 'রসায়ন', 'A-', 3.50),
(@last_result_id, 'জীববিজ্ঞান', 'A+', 5.00);


-- Insert sample data for result 2
INSERT INTO `results` (`roll`, `class_name`, `name`, `exam_name`, `group_name`, `father_name`, `mother_name`, `image`, `data_ai_hint`, `final_gpa`, `status`) VALUES
('201', '৯ম', 'জাহিদ হাসান', 'বার্ষিক পরীক্ষা - ২০২৪', 'ব্যবসায় শিক্ষা', 'মোঃ হাসান', 'জোহরা বেগম', 'https://placehold.co/300x400.png', 'male student portrait', 3.88, 'Promoted');

SET @last_result_id = LAST_INSERT_ID();

INSERT INTO `subject_grades` (`result_id`, `subject_name`, `grade`, `gpa`) VALUES
(@last_result_id, 'বাংলা ১ম পত্র', 'A', 4.00),
(@last_result_id, 'বাংলা ২য় পত্র', 'A-', 3.50),
(@last_result_id, 'ইংরেজি ১ম পত্র', 'A', 4.00),
(@last_result_id, 'ইংরেজি ২য় পত্র', 'B', 3.00),
(@last_result_id, 'গণিত', 'A', 4.00),
(@last_result_id, 'বিজ্ঞান', 'A-', 3.50),
(@last_result_id, 'হিসাববিজ্ঞান', 'A', 4.00),
(@last_result_id, 'ব্যবসায় উদ্যোগ', 'A+', 5.00);

