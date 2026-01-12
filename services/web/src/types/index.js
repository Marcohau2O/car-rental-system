// Tipos y interfaces del proyecto

const Car = {
  id: number,
  brand: string,
  model: string,
  type: "economy" | "compact" | "sedan" | "suv" | "luxury",
  year: number,
  price: number,
  transmission: "manual" | "automatic",
  fuel: "gasoline" | "diesel" | "electric" | "hybrid",
  description: string,
  image: string,
  status: "available" | "rented" | "maintenance",
  rating: number,
}

const Reservation = {
  id: number,
  confirmationNumber: string,
  clientName: string,
  car: string,
  startDate: string,
  endDate: string,
  total: number,
  status: "confirmed" | "inprogress" | "completed" | "cancelled",
}

const User = {
  id: number,
  name: string,
  email: string,
  phone: string,
  role: "customer" | "admin" | "staff",
  joinedDate: string,
}

const ReservationForm = {
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  licenseNumber: string,
  insurance: boolean,
  gpsPack: boolean,
  babyKit: boolean,
}
