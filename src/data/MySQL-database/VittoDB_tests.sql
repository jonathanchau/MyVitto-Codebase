INSERT INTO users (user_id, username, password, email) -- test that inserts multiple rows
VALUES (NULL, 'user_test1', 'password1', 'test1@example.com'),
	(NULL, 'user_test2', 'password2', 'test2@example.com'),
    (NULL, 'user_test3', 'password3', 'test3@example.com'); 
    
INSERT INTO users (user_id, username, password, email) -- test that inserts one 
VALUES (NULL, 'user_test4', 'password4', 'test4@example.com'); 

SELECT * FROM users;
SELECT * FROM sessions;
SELECT * FROM resettokens;