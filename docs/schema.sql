CREATE TABLE notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(100) NOT NULL,
    fileUrl VARCHAR(255),
    description TEXT
);

CREATE TABLE sidebar_widgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    widget_type ENUM('profile', 'links', 'image_link') NOT NULL,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    image_url VARCHAR(255),
    link_url VARCHAR(255),
    link_text VARCHAR(100),
    content JSON,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE about_school (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

CREATE TABLE school_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
