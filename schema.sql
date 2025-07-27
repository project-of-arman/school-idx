-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `about_school`;
CREATE TABLE `about_school` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `admission_applications`;
CREATE TABLE `admission_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name_bn` varchar(255) NOT NULL,
  `student_name_en` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `birth_cert_no` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `applying_for_class` varchar(50) NOT NULL,
  `previous_school` varchar(255) DEFAULT NULL,
  `father_name_bn` varchar(255) NOT NULL,
  `father_name_en` varchar(255) NOT NULL,
  `father_nid` varchar(100) NOT NULL,
  `father_mobile` varchar(50) NOT NULL,
  `mother_name_bn` varchar(255) NOT NULL,
  `mother_name_en` varchar(255) NOT NULL,
  `mother_nid` varchar(100) NOT NULL,
  `mother_mobile` varchar(50) NOT NULL,
  `present_address` text NOT NULL,
  `permanent_address` text NOT NULL,
  `student_photo_path` longtext,
  `birth_cert_photo_path` longtext,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `admission_guidelines`;
CREATE TABLE `admission_guidelines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `content` text,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `admission_important_dates`;
CREATE TABLE `admission_important_dates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `date_value` varchar(255) NOT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `admission_page_content`;
CREATE TABLE `admission_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `form_download_url` varchar(255) DEFAULT NULL,
  `contact_title` varchar(255) DEFAULT NULL,
  `contact_description` varchar(500) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `admit_card_applications`;
CREATE TABLE `admit_card_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `session` varchar(100) NOT NULL,
  `exam_name` varchar(255) NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `carousel_items`;
CREATE TABLE `carousel_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `src` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `dataAiHint` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `certificate_applications`;
CREATE TABLE `certificate_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `last_class` varchar(100) NOT NULL,
  `last_roll` varchar(50) NOT NULL,
  `passing_year` varchar(10) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `committee_members`;
CREATE TABLE `committee_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `image` longtext,
  `dataAiHint` varchar(255) DEFAULT 'committee member portrait',
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `contact_info`;
CREATE TABLE `contact_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_name` varchar(255) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `map_embed_url` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `contact_submissions`;
CREATE TABLE `contact_submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `gallery_images`;
CREATE TABLE `gallery_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image_url` longtext,
  `data_ai_hint` varchar(255) DEFAULT 'school event',
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `guardian_consent_applications`;
CREATE TABLE `guardian_consent_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `guardian_name` varchar(255) NOT NULL,
  `relation` varchar(100) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_date` date NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `important_link_groups`;
CREATE TABLE `important_link_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` longtext,
  `data_ai_hint` varchar(255) DEFAULT 'icon',
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `important_links`;
CREATE TABLE `important_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `text` varchar(255) NOT NULL,
  `href` varchar(500) DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `important_links_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `important_link_groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `leave_applications`;
CREATE TABLE `leave_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `guardian_name` varchar(255) NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `library_card_applications`;
CREATE TABLE `library_card_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `session` varchar(100) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `marksheet_applications`;
CREATE TABLE `marksheet_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `session` varchar(100) NOT NULL,
  `exam_name` varchar(255) NOT NULL,
  `passing_year` varchar(10) NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `nav_links`;
CREATE TABLE `nav_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `href` varchar(255) DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `icon` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `nav_links_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `nav_links` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `notices`;
CREATE TABLE `notices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `fileUrl` varchar(255) DEFAULT NULL,
  `description` text,
  `is_marquee` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` longtext,
  `thumbnail` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `results`;
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `exam_name` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `final_gpa` varchar(5) NOT NULL,
  `status` enum('Promoted','Failed') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `routines`;
CREATE TABLE `routines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(100) NOT NULL,
  `day_of_week` varchar(50) NOT NULL,
  `period` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `subject` varchar(255) NOT NULL,
  `teacher_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `class_day_period` (`class_name`,`day_of_week`,`period`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `school_features`;
CREATE TABLE `school_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `school_info`;
CREATE TABLE `school_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(500) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `sidebar_widgets`;
CREATE TABLE `sidebar_widgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `widget_type` enum('profile','links','image_link') NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `link_url` varchar(500) DEFAULT NULL,
  `link_text` varchar(100) DEFAULT NULL,
  `content` text,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `stipend_applications`;
CREATE TABLE `stipend_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `session` varchar(100) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `guardian_yearly_income` varchar(100) NOT NULL,
  `reason` text NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `nagad_mobile` varchar(50) NOT NULL,
  `sim_owner_name` varchar(255) NOT NULL,
  `birth_cert_photo_path` longtext,
  `nid_photo_path` longtext,
  `optional_photo_path` longtext,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_bn` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `roll` varchar(50) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `year` int NOT NULL,
  `dob` date NOT NULL,
  `birth_cert_no` varchar(100) DEFAULT NULL,
  `gender` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `previous_school` varchar(255) DEFAULT NULL,
  `father_name_bn` varchar(255) NOT NULL,
  `father_name_en` varchar(255) NOT NULL,
  `father_nid` varchar(100) DEFAULT NULL,
  `father_mobile` varchar(50) NOT NULL,
  `mother_name_bn` varchar(255) NOT NULL,
  `mother_name_en` varchar(255) NOT NULL,
  `mother_nid` varchar(100) DEFAULT NULL,
  `mother_mobile` varchar(50) NOT NULL,
  `present_address` text NOT NULL,
  `permanent_address` text NOT NULL,
  `image` longtext,
  `data_ai_hint` varchar(255) DEFAULT 'student portrait',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roll_year_class` (`roll`,`year`,`class_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `subject_change_applications`;
CREATE TABLE `subject_change_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `session` varchar(100) NOT NULL,
  `current_subjects` text NOT NULL,
  `requested_subjects` text NOT NULL,
  `reason` text NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `subject_grades`;
CREATE TABLE `subject_grades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `result_id` int NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `marks` varchar(5) DEFAULT NULL,
  `grade` varchar(10) NOT NULL,
  `gpa` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `result_id` (`result_id`),
  CONSTRAINT `subject_grades_ibfk_1` FOREIGN KEY (`result_id`) REFERENCES `results` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `syllabuses`;
CREATE TABLE `syllabuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(100) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `file_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `class_subject` (`class_name`,`subject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `image` longtext,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `educational_qualification` text,
  `experience` text,
  `dataAiHint` varchar(255) DEFAULT 'teacher portrait',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `testimonial_applications`;
CREATE TABLE `testimonial_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `last_class` varchar(100) NOT NULL,
  `last_roll` varchar(50) NOT NULL,
  `passing_year` varchar(10) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `transfer_certificate_applications`;
CREATE TABLE `transfer_certificate_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `session` varchar(100) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `reason` text NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `videoUrl` varchar(500) NOT NULL,
  `description` text,
  `dataAiHint` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2024-07-26 09:24:26

