# Fake Restaurant
University project for the **Web Technologies** course — University of Università degli Studi di Napoli Federico II

**FakeRestaurant** is a satirical web app that lets users invent imaginary restaurants and write surreal, humorous reviews — parodying traditional food review platforms.

- 🔍 Users can search for restaurants, view details, and read reviews.
- 🧑‍💻 Registered users can:
  - Create fictional restaurants with images and map locations.
  - Write creative, funny reviews.
  - Vote on reviews (upvote/downvote system).
  - Delete their own restaurants and reviews.
- 👥 Unregistered users can explore and read content but cannot post or vote.

The app promotes fun, creativity, and a playful sense of competition among users.

---

## 🧱 Project Architecture

| Service        | Technology                      | Description                                 |
|----------------|---------------------------------|---------------------------------------------|
| Frontend       | Angular                         | Single Page Application                     |
| Backend        | Node.js + Express + Sequelize   | REST API handling logic and data access     |
| Database       | PostgreSQL                      | Relational database                         |
| Cloud Storage  | MinIO                           | S3-compatible storage for images/files      |
| Admin Tool     | pgAdmin                         | Web interface to manage the PostgreSQL DB   |

---

## 🚀 Getting Started

Make sure you have:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📦 Launch the project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GDom03/FakeRestaurant.git
   
2. **Start the containers:**

   ```bash
   cd FakeRestaurant/Fake Restaurant Docker
   docker compose up -d --build
   docker cp ./Database/backup.sql fake_restaurant_db:backup.sql
   docker exec -it fake_restaurant_db psql -U admin -d fake_restaurant_db -f backup.sql


3. **Access the services:**
  -  Frontend: https://localhost:4200 (⚠️ Self-signed certificate)
  -  Backend API: https://localhost:3000

## Save permanently On DB

  ```bash
  docker exec fake_restaurant_db pg_dump -U admin -F p fake_restaurant_db | Out-File -Encoding utf8 ./Database/backup.sql


