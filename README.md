# Booking App Structure

Project structure for the Booking Ship platform.

## Apps

- `apps/api`: Node.js/NestJS backend with Prisma and PostgreSQL.
- `apps/admin`: Next.js web admin dashboard.
- `apps/mobile`: Expo React Native mobile app for customer and driver flows.

Each folder under `apps/` is an independent project. Run `npm install` inside the project you want to work on.

## Local Database

PostgreSQL database name:

```text
booking-app
```

Connection string:

```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/booking-app?schema=public"
```

Create the database manually if it does not exist:

```bash
createdb -U postgres "booking-app"

npm run prisma:generate

npm run prisma:migrate

npm run dev
```

## Admin Web

```bash
cd apps/admin
npm install
npm run dev
```

## Mobile App

```bash
cd apps/mobile
npm install
npx expo start
```
