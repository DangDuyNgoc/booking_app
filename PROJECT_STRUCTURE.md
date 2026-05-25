# Project Structure

```text
  apps/
    api/
      prisma/
        schema.prisma
      src/
        auth/
        common/
        drivers/
        health/
        orders/
        payouts/
        pricing/
        users/
        wallets/
    admin/
      app/
        drivers/
        orders/
        payouts/
        pricing/
      components/
        dashboard/
        drivers/
        layout/
        orders/
        payouts/
        pricing/
        ui/
      lib/
      types/
    mobile/
      app/
        _layout.tsx
        customer.tsx
        driver.tsx
        index.tsx
      assets/
      components/
        auth/
        customer/
        driver/
        map/
        ui/
      lib/
      types/
```

Each folder under `apps/` is an independent project. Do not run root `npm install`; run it inside `apps/api`, `apps/admin`, or `apps/mobile`.

## Team Ownership Suggestion

- Backend developer: `apps/api`, `apps/api/prisma`.
- Mobile developer: `apps/mobile`.
- Admin developer: `apps/admin`.

## Rule Of Thumb

- Put reusable UI in `components`.
- Put route/page files in `app`.
- Put API clients and helpers in `lib`.
- Put screen-specific or app-specific types in `types`.
