# Multi-Level Referral and Earning System

This project is a Node.js-based application that is a multi-level referral system. Users can earn direct and indirect profits based on there referrals, and all data is tracked and updated in real-time using MongoDB as the database.

## Features

1. **Referral System:**

   - Users can refer up to 8 direct referrals.
   - Direct earnings: 5% of profits from Level 1 referrals.
   - Indirect earnings: 1% of profits from Level 2 referrals.

2. **Earnings and Transactions:**

   - Profits are distributed only when purchases exceed ₹1000.
   - Real-time updates for parent users when referrals make transactions.

3. **APIs:**

   - Create, fetch, and track users, transactions, and earnings.

4. **Database Design:**
   - MongoDB models for Users, Transactions, and Earnings.

---

## Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB (running locally)
- npm (Node package manager)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd referral-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure MongoDB:

   - Ensure MongoDB is running.
   - Update the MongoDB connection string in `server.js` if necessary.

4. Start the server:

   ```bash
   npm start
   ```

5. The server will run at:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### User APIs

- **Create User:**

  - `POST /api/users`
  - **Request Body:**
    ```json
    {
      "name": "USER",
      "referredBy": "<userId>" (optional)
    }
    ```
  - **Response:**
    - User object with details.

- **Get All Users:**

  - `GET /api/users`

- **Get User by ID:**
  - `GET /api/users/:userId`

### Transaction APIs

- **Create Transaction:**

  - `POST /api/transactions`
  - **Request Body:**
    ```json
    {
      "userId": "<userId>",
      "amount": 1500
    }
    ```
  - **Response:**
    - Transaction object with details.

- **Get All Transactions:**

  - `GET /api/transactions`

- **Get Transactions by User ID:**
  - `GET /api/transactions/:userId`

### Earning APIs

- **Get Earnings by User ID:**

  - `GET /api/earnings/:userId`

- **Get All Earnings:**
  - `GET /api/earnings`

---

## Project Structure

```
/referral-system
  /models
    User.js         # User schema definition
    Transaction.js  # Transaction schema definition
    Earning.js      # Earning schema definition
  /routes
    userRoutes.js        # User-related routes
    transactionRoutes.js # Transaction-related routes
    earningRoutes.js     # Earnings-related routes
  server.js         # Main entry point
```

---

## Future Enhancements

1. Front-end integration for a user dashboard.
2. Advanced analytics for referral performance.
3. Integration with external payment gateways.
4. Enhanced security measures (e.g., encryption, secure password storage).
5. Add more data in models.
