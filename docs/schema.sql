-- This file contains the database schema for the application.
-- You can use this file to create the necessary tables in your MySQL database.

CREATE TABLE IF NOT EXISTS `teachers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255),
  `address` VARCHAR(255),
  `phone` VARCHAR(20),
  `email` VARCHAR(255),
  `dataAiHint` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `notices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `date` VARCHAR(100) NOT NULL,
  `fileUrl` VARCHAR(255),
  `description` TEXT
);

CREATE TABLE IF NOT EXISTS `sidebar_widgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `widget_type` enum('profile','links','image_link') NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `link_text` varchar(100) DEFAULT NULL,
  `content` json DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `about_school` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `imageUrl` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `school_features` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `icon` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT
);
