# 📚 Library Management System

A robust, database-driven application designed to manage library operations, including book tracking, member registration, and borrowing records. This project demonstrates proficiency in **Python** and **Oracle SQL** database management — core competencies for enterprise-level backend development.

---

## 🚀 Key Features

- **CRUD Operations** — Efficiently Create, Read, Update, and Delete records for books, members, and transactions.
- **Database Integrity** — Implemented foreign key constraints and primary keys to ensure data consistency across all tables.
- **Search Functionality** — Optimized SQL queries to quickly locate books by title, author, or genre.
- **Borrowing Logic** — Automated tracking of borrowed items with due-date calculations and availability status updates.
- **SQL Transactions** — Uses `COMMIT` and `ROLLBACK` to ensure data is never corrupted if a database operation fails mid-way.
- **Joined Reports** — Multi-table `JOIN` queries to generate real-time reports (e.g., all books currently borrowed by a specific member).

---

## 🛠 Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Language    | Python 3.x                        |
| Database    | Oracle Database Express Edition   |
| DB Connector| `cx_Oracle` / `python-oracledb`   |
| Tools       | Git, GitHub, VS Code              |

---

## 📋 Database Schema

> 💡 *Tip: Generate an ER diagram at [dbdiagram.io](https://dbdiagram.io) and place the exported image here.*

### Books Table
| Column         | Type           | Description                        |
|----------------|----------------|------------------------------------|
| `book_id`      | NUMBER (PK)    | Unique identifier for each book    |
| `title`        | VARCHAR2(255)  | Title of the book                  |
| `author`       | VARCHAR2(100)  | Author's full name                 |
| `isbn`         | VARCHAR2(20)   | International Standard Book Number |
| `genre`        | VARCHAR2(50)   | Genre/category of the book         |
| `is_available` | CHAR(1)        | 'Y' if available, 'N' if borrowed  |

### Members Table
| Column      | Type          | Description                        |
|-------------|---------------|------------------------------------|
| `member_id` | NUMBER (PK)   | Unique identifier for each member  |
| `name`      | VARCHAR2(100) | Full name of the member            |
| `email`     | VARCHAR2(100) | Contact email (unique)             |
| `join_date` | DATE          | Date the member registered         |

### Transactions Table
| Column           | Type        | Description                              |
|------------------|-------------|------------------------------------------|
| `transaction_id` | NUMBER (PK) | Unique identifier for each transaction   |
| `book_id`        | NUMBER (FK) | References `Books.book_id`               |
| `member_id`      | NUMBER (FK) | References `Members.member_id`           |
| `borrow_date`    | DATE        | Date the book was borrowed               |
| `return_date`    | DATE        | Expected or actual return date           |

---

## ⚙️ How to Run

### Prerequisites
- Python 3.x installed
- Oracle Database Express Edition installed and running
- `python-oracledb` library installed:
  ```bash
  pip install oracledb
  ```

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system
   ```

2. **Set up the database**

   Open Oracle SQL*Plus or SQL Developer and run:
   ```bash
   @database/schema.sql
   ```
   This will create all tables, constraints, and seed sample data.

3. **Configure your database credentials**

   Edit the `config.py` file with your Oracle connection details:
   ```python
   DB_USER = "your_username"
   DB_PASSWORD = "your_password"
   DB_DSN = "localhost/XEPDB1"  # Default for Oracle XE
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

---

## 🗂 Project Structure

```
library-management-system/
│
├── database/
│   └── schema.sql         # Table definitions, constraints, and seed data
│
├── app.py                 # Main application entry point
├── config.py              # Database connection configuration
├── books.py               # CRUD operations for Books
├── members.py             # CRUD operations for Members
├── transactions.py        # Borrowing and return logic
│
└── README.md
```

---

## 🔍 Sample SQL — Multi-Table JOIN Report

```sql
-- Fetch all books currently borrowed, along with member details
-- JOIN used to combine data across Books, Members, and Transactions tables
SELECT
    m.name          AS member_name,
    m.email         AS member_email,
    b.title         AS book_title,
    b.author        AS author,
    t.borrow_date,
    t.return_date
FROM Transactions t
JOIN Books    b ON t.book_id   = b.book_id
JOIN Members  m ON t.member_id = m.member_id
WHERE b.is_available = 'N'  -- 'N' indicates the book is currently borrowed
ORDER BY t.borrow_date DESC;
```

---

## 🔐 SQL Transaction Example (COMMIT & ROLLBACK)

```sql
-- Safely process a borrow request using a transaction block
-- Ensures no partial updates corrupt the database on failure
BEGIN
    -- Step 1: Insert the borrow record
    INSERT INTO Transactions (transaction_id, book_id, member_id, borrow_date, return_date)
    VALUES (txn_seq.NEXTVAL, :book_id, :member_id, SYSDATE, SYSDATE + 14);

    -- Step 2: Mark the book as unavailable
    UPDATE Books
    SET is_available = 'N'
    WHERE book_id = :book_id;

    COMMIT; -- Finalize both changes together
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK; -- Undo everything if any step fails
        RAISE;
END;
```

---

## 💡 Key Learnings

- Designed a **normalized relational schema** (3NF) to minimize data redundancy.
- Used **Oracle-specific data types** (`VARCHAR2`, `NUMBER`, `DATE`) and understood why they differ from standard SQL (e.g., `VARCHAR2` is preferred over `VARCHAR` in Oracle to avoid behaviour inconsistencies).
- Implemented **error handling** in Python to gracefully manage scenarios like *"book not found"*, *"member does not exist"*, or *"member has reached the maximum borrow limit."*
- Applied **SQL Transactions** (`COMMIT`/`ROLLBACK`) to guarantee data integrity during multi-step operations.
- Practiced **version control** with Git — using feature branches and meaningful commit messages to manage development.

---

## 🔮 Future Improvements

- Add a **web interface** using Flask to make the system browser-accessible.
- Implement **fine calculation** for overdue books.
- Add **authentication** for librarian vs. member roles.

---

*Built as a portfolio project to demonstrate SQL, data modelling, and backend logic skills.*
