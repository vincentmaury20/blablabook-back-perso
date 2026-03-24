-- First, drop all tables by default to ensure they don't exist:

DROP TABLE IF EXISTS Written_By CASCADE;
DROP TABLE IF EXISTS Belongs_To CASCADE;
DROP TABLE IF EXISTS UserBooks CASCADE;
DROP TABLE IF EXISTS Genre CASCADE;
DROP TABLE IF EXISTS Authors CASCADE;
DROP TABLE IF EXISTS Books CASCADE;
DROP TABLE IF EXISTS User CASCADE;

CREATE TABLE User (
    CodeUser INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    role VARCHAR(50),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(100)
);
CREATE TABLE Books (
    CodeBook INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    cover VARCHAR(255) NOT NULL,
    synopsis VARCHAR(800) NOT NULL
);
CREATE TABLE Authors (
    CodeAuthor INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    bio VARCHAR(500) NOT NULL
);

CREATE TABLE Genre (
    CodeGenre INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE UserBooks (
    CodeUserBook INT PRIMARY KEY,
    toRead BOOLEAN NOT NULL,
    CodeBook INT,
    CodeUser INT,
    FOREIGN KEY (CodeBook) REFERENCES Books(CodeBook),
    FOREIGN KEY (CodeUser) REFERENCES Users(CodeUser)
);

CREATE TABLE Belongs_To (
    CodeBook INT,
    CodeGenre INT,
    PRIMARY KEY (CodeBook, CodeGenre),
    FOREIGN KEY (CodeBook) REFERENCES Books(CodeBook),
    FOREIGN KEY (CodeGenre) REFERENCES Genre(CodeGenre)
);

CREATE TABLE Written_By (
    CodeBook INT,
    CodeAuthor INT,
    PRIMARY KEY (CodeBook, CodeAuthor),
    FOREIGN KEY (CodeBook) REFERENCES Books(CodeBook),
    FOREIGN KEY (CodeAuthor) REFERENCES Authors(CodeAuthor)
);