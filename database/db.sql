CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    book_id INTEGER REFERENCES books(id),
    borrowed_date DATE NOT NULL,
    due_date DATE NOT NULL,
    returned_date DATE 
    user_score INTEGER,
);