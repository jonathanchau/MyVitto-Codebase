CREATE DATABASE IF NOT EXISTS `VittoDB`;

USE `VittoDB`;

CREATE TABLE IF NOT EXISTS `users` (
	`user_id` varchar(255) NOT NULL, -- the id of a user
	`username` varchar(255) NOT NULL, -- the username of a user
    `password` varchar(128) NOT NULL, -- the hashed password for the user
    -- `salt` varchar(21) NOT NULL, -- stored salt for the user
    `email` varchar(255) NOT NULL, -- email for the user
    `profile_color` varchar(7) NOT NULL, -- the chosen profile color as a hex code (e.g., '#4285f4')
    PRIMARY KEY (`user_id`)
);

ALTER TABLE users ADD UNIQUE(user_id);

ALTER TABLE users ADD UNIQUE(username);

ALTER TABLE users ADD UNIQUE(email);

CREATE TABLE IF NOT EXISTS `ResetTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiration` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `used` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES ResetTokens(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Card` (
	`cid` VARCHAR(10),
	`uid` int,
    PRIMARY KEY (cid),
    FOREIGN KEY(`uid`) REFERENCES Users(`id`)
);

CREATE TABLE IF NOT EXISTS `Element` (
	`eid` VARCHAR (10)
);

-- CREATE TRIGGER generate_user_id -- generates a new random user id
-- BEFORE INSERT ON users
--      FOR EACH ROW
--      SET NEW.user_id = CONCAT("10000", LPAD(FLOOR(RAND() * 999999) + 1, 6, '0')); -- new user id e.g. 10000123456
--      

-- DELIMITER |
-- CREATE TRIGGER generate_hashed_password -- before inserting a password into the database, the password is hashed and salted and then inserted
-- 	BEFORE INSERT ON users 
--     FOR EACH ROW
--     BEGIN
-- 		SET @salt = CONCAT('$6$', SUBSTRING(MD5(CONVERT(RAND(),CHAR)), 16), '$'); -- returns random salt for the user
-- 		SET @new_password = NEW.password; -- plain-text password
-- 		SET @hashed_password = sha2(CONCAT(@salt, @new_password, @salt), 512); -- hashes and salts the plain-text password
--         SET NEW.salt = @salt;
--         SET NEW.password = @hashed_password;
-- 	END;
-- |
-- DELIMITER ;
