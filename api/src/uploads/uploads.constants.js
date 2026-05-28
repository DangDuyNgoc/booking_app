export const imagePurposes = [
  "user-avatar",
  "driver-portrait",
  "driver-id-card-front",
  "driver-id-card-back",
  "driver-judicial-record",
  "driver-vehicle-registration",
  "driver-vehicle-insurance",
  "driver-health-certificate",
  "driver-vehicle-with-plate",
  "vehicle-image",
  "pickup-proof",
  "delivery-proof"
];

export const purposeFolders = {
  "user-avatar": { baseFolder: "booking-app/users/avatars" },
  "driver-portrait": { baseFolder: "booking-app/drivers", userScopedFolder: "portrait" },
  "driver-id-card-front": { baseFolder: "booking-app/drivers", userScopedFolder: "id-card-front" },
  "driver-id-card-back": { baseFolder: "booking-app/drivers", userScopedFolder: "id-card-back" },
  "driver-judicial-record": { baseFolder: "booking-app/drivers", userScopedFolder: "judicial-record" },
  "driver-vehicle-registration": {
    baseFolder: "booking-app/drivers",
    userScopedFolder: "vehicle-registration"
  },
  "driver-vehicle-insurance": {
    baseFolder: "booking-app/drivers",
    userScopedFolder: "vehicle-insurance"
  },
  "driver-health-certificate": {
    baseFolder: "booking-app/drivers",
    userScopedFolder: "health-certificate"
  },
  "driver-vehicle-with-plate": {
    baseFolder: "booking-app/drivers",
    userScopedFolder: "vehicle-with-plate"
  },
  "vehicle-image": { baseFolder: "booking-app/vehicles" },
  "pickup-proof": { baseFolder: "booking-app/orders/pickup-proofs" },
  "delivery-proof": { baseFolder: "booking-app/orders/delivery-proofs" }
};
