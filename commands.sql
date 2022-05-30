CREATE TABLE blogs (
  id SERIAL PRIMARY KEY, 
  author TEXT, 
  url TEXT NOT NULL, 
  title TEXT NOT NULL, 
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Yoshi', 'http://localhost:30001/api/blogs', 'VS Code REST Client is pretty good', 0);

INSERT INTO blogs (author, url, title, likes) VALUES ('Dan Abramov', 'http://localhost:3001/api/blogs', 'Things I do not know as of 2022', 0);
