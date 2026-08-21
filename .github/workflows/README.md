# Auto Empire
Car marketplace UI based on the supplied Auto Empire recording, using the supplied Appwrite endpoint/project/database/cars table/car-photos bucket.

## Run
npm install
npm run dev

## Appwrite
The project keeps the supplied Appwrite configuration in `src/main.jsx`. It uses the existing `cars` table and `car-photos` bucket. Ensure the table attributes accept the fields used by the app and that the bucket permits the required browser operations.
