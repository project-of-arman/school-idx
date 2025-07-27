--
-- Table structure for table `admission_applications`
--

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
);

--
-- Table structure for table `admit_card_applications`
--

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
);

--
-- Table structure for table `certificate_applications`
--

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
);

--
-- Table structure for table `guardian_consent_applications`
--

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
);

--
-- Table structure for table `leave_applications`
--

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
);

--
-- Table structure for table `library_card_applications`
--

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
);

--
-- Table structure for table `marksheet_applications`
--

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
);

--
-- Table structure for table `stipend_applications`
--

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
);

--
-- Table structure for table `subject_change_applications`
--

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
);

--
-- Table structure for table `testimonial_applications`
--

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
);

--
-- Table structure for table `transfer_certificate_applications`
--

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
);

--
-- Table structure for table `students`
--

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
);

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `exam_name` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `final_gpa` varchar(5) NOT NULL,
  `status` enum('Promoted','Failed') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
);

--
-- Table structure for table `subject_grades`
--

CREATE TABLE `subject_grades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `result_id` int NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `marks` varchar(5) DEFAULT NULL,
  `grade` varchar(10) NOT NULL,
  `gpa` varchar(5) NOT NULL,
   PRIMARY KEY (`id`)
);

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

--
-- Table structure for table `contact_info`
--
CREATE TABLE `contact_info` (
  `id` int NOT NULL DEFAULT '1',
  `school_name` varchar(255) DEFAULT NULL,
  `address` text,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `map_embed_url` text
);

--
-- Dumping data for table `contact_info`
--

INSERT INTO `contact_info` (`id`, `school_name`, `address`, `phone`, `email`, `map_embed_url`) VALUES
(1, 'মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়', '১ নং রোড, ব্লক এ, মিরপুর, ঢাকা-১২১৬', '+৮৮০ ১২৩৪ ৫৬৭৮৯০', 'info@shikkhaangan.edu', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0950338381005!2d90.36399991544456!3d23.81513519228574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e6c38a79ef%3A0x28637993b8f683f2!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1675868516053!5m2!1sen!2sbd');


--
-- Table structure for table `staff`
--
CREATE TABLE `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` longtext,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `data_ai_hint` varchar(255) DEFAULT 'staff portrait',
   PRIMARY KEY (`id`)
);

