-- Drop all tables if they already exist
DROP TABLE IF EXISTS written_by CASCADE;
DROP TABLE IF EXISTS belongs_to CASCADE;
DROP TABLE IF EXISTS user_books CASCADE;
DROP TABLE IF EXISTS genre CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    role VARCHAR(50),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(100)
);

-- Books table
CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    cover VARCHAR(255) NOT NULL,
    synopsis VARCHAR(800) NOT NULL
);

-- Authors table
CREATE TABLE authors (
    id INT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    bio VARCHAR(500) NOT NULL
);

-- Genres table
CREATE TABLE genre (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- UserBooks table (user ↔ book relationship)
CREATE TABLE user_books (
    id INT PRIMARY KEY,
    to_read BOOLEAN NOT NULL,
    user_id INT,
    book_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Belongs_To table (book ↔ genre relationship)
CREATE TABLE belongs_to (
    book_id INT,
    genre_id INT,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);

-- Written_By table (book ↔ author relationship)
CREATE TABLE written_by (
    book_id INT,
    author_id INT,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);