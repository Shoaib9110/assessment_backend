# Backend

## Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Create a `.env` file with the following content and replace db strings :
    ```
    DATABASE_URL=postgres://username:password@localhost:5432/progress_db
    ```
3. Change `src/config/config.json` file with the db strings :

4. Go to `cd src/` and run the migrations:
    ```bash
    npm run migrate:up
    ```

5. Run the database seed:
    ```bash
    npm run db:seed
    ```
6. Back to root `cd ../` run :
    ```bash
    npm run dev
    ```

## API Endpoints

- `GET /api/progress`: Fetch all progress data.
- `POST /api/progress`: Add new progress data.
- `GET /api/progress/:userId`: Fetch progress data for a specific user.
- `GET /api/users`: Fetch users data for add new progress.

## SSE

- Connect to SSE at `http://localhost:5000/api/events`.
