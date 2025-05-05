# 🧾 API Documentation

## 📦 Auth API

### `POST /api/auth/register`
Register a new user.

- **Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

- **Response:**
  - `201 Created` – User registered successfully with token.

---

### `POST /api/auth/login`
Login an existing user.

- **Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

- **Response:**
  - `200 OK` – Login successful with token.

---

## 🏨 Room API

### `GET /api/rooms`
Get all rooms.  
**Access:** Public

- **Response:**
  - `200 OK` – Returns list of rooms.

---

### `POST /api/rooms`
Create a new room.  
**Access:** Admin

- **Request Body:**
```json
{
  "name": "string",
  "capacity": "number",
  "price": "number"
}
```

- **Response:**
  - `201 Created` – Room created successfully.

---

### `PUT /api/rooms/:id`
Update a room.  
**Access:** Admin

- **URL Params:**
  - `id`: Room ID

- **Response:**
  - `200 OK` – Room updated.

---

### `DELETE /api/rooms/:id`
Delete a room.  
**Access:** Admin

- **URL Params:**
  - `id`: Room ID

- **Response:**
  - `200 OK` – Room deleted.

---

## 📅 Booking API

> All routes below require authentication.

### `POST /api/bookings/calculate`
Calculate the booking cost.

- **Request Body:**
```json
{
  "roomId": "string",
  "startDate": "string",
  "endDate": "string"
}
```

- **Response:**
  - `200 OK` – Cost calculated.

---

### `POST /api/bookings`
Create a booking.

- **Request Body:**
```json
{
  "roomId": "string",
  "startDate": "string",
  "endDate": "string"
}
```

- **Response:**
  - `201 Created` – Booking created.

---

### `GET /api/bookings/user`
Get bookings for authenticated user.

- **Response:**
  - `200 OK` – List of bookings.

---

### `DELETE /api/bookings/delete/:bookingId`
Delete a booking.

- **URL Params:**
  - `bookingId`: Booking ID

- **Response:**
  - `200 OK` – Booking deleted.

---

### `PUT /api/bookings/cancel/:bookingId`
Cancel a booking.

- **URL Params:**
  - `bookingId`: Booking ID

- **Response:**
  - `200 OK` – Booking cancelled.

---

### `GET /api/bookings/all`
Get all bookings.  
**Access:** Admin

- **Response:**
  - `200 OK` – List of all bookings.

---

### `PUT /api/bookings/approve/:bookingId`
Approve a booking.  
**Access:** Admin

- **URL Params:**
  - `bookingId`: Booking ID

- **Response:**
  - `200 OK` – Booking approved.

---

### `PUT /api/bookings/reject/:bookingId`
Reject a booking.  
**Access:** Admin

- **URL Params:**
  - `bookingId`: Booking ID

- **Response:**
  - `200 OK` – Booking rejected.
