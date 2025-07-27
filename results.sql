
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `exam_name` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `final_gpa` decimal(4,2) NOT NULL,
  `status` enum('Promoted','Failed') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subject_grades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `result_id` int NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `grade` varchar(10) NOT NULL,
  `gpa` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `result_id` (`result_id`),
  CONSTRAINT `subject_grades_ibfk_1` FOREIGN KEY (`result_id`) REFERENCES `results` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

