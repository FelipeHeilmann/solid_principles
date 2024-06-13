# Hotel Reservation System

## Overview

This repository contains a study project designed to implement a simplified hotel reservation system while adhering to the SOLID principles of object-oriented design. The SOLID principles are crucial for creating maintainable, scalable, and robust software. This project demonstrates how each of these principles can be applied in a practical scenario.

## SOLID Principles

- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

## Run the project

Substitua `(your package manager)` e `(your package manager executor)` pelo gerenciador de pacotes que você está usando (por exemplo, `npm` ou `yarn`). Aqui está um exemplo com `yarn`:

1. Clone the repository:
   ```sh
   git clone https://github.com/FelipeHeilmann/solid_principles
   cd solid_principles
   ```
2. Run the docker compose
   ```sh
    docker compose up
    ```
3. Install de depencies
    ```sh
    yarn install
    ```
4. run the tests
    ```sh
    yarn jest
    ```

    # API Routes

## Account Routes

### Signup

- **URL:** `/signup`
- **Method:** `POST`
- **Body:** 
```
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "document": "123456789",
    "password": "securePassword"
}
```
- **Code:** `201`
- **Response:** 
```
{
    id: string -> Id do usuário
}
```

### Signin

- **URL:** `/auth`
- **Method:** `POST`
- **Body:** 
```
{
    "email": "john.doe@example.com",
    "password": "securePassword"
}
```
- **Code:** `200`
- **Response:** 
```
{
    token: string -> jwt token
}
```

### Make reservation

- **URL:** `/reservations`
- **Method:** `POST`
- **Bearer token:** `Jwt token`
- **Body:** 
```
{
    "roomId": "room_id",
    "checkinDate": "2024-06-06T12:00:00",  // ISO date format
    "checkoutDate": "2024-06-07T12:00:00",  // ISO date format
}
```
- **Code:** `201`
- **Response:** 
```
{
    id -> id da reserva feita
}
```

### List reservations

- **URL:** `/reservations`
- **Method:** `GET`
- **Bearer token:** `Jwt token`
- **Code:** `200`
- **Response:** 
```
[{
    "id": "reservation_id",
    "price": 200,
    "accountId": "account_id",
    "duration": 1, // in days or hours
    "status": "active",
    "checkinDate": "2024-06-06T12:00:00",  // ISO date format
    "checkoutDate": "2024-06-07T12:00:00",  // ISO date format
    "room": {
        "id": "id do quarto",
        "type": "hour",
        "category": "suit"
    }
}]
```

### GET reservations

- **URL:** `/reservations/:id`
- **Method:** `GET`
- **Bearer token:** `Jwt token`
- **Code:** `200`
- **Response:** 
```
{
    "id": "reservation_id",
    "price": 200,
    "accountId": "account_id",
    "duration": 1, // in days or hours
    "status": "active",
   "checkinDate": "2024-06-06T12:00:00",  // ISO date format
    "checkoutDate": "2024-06-07T12:00:00",  // ISO date format
    "room": {
        "id": "id do quarto",
        "type": "hour",
        "category": "suit"
    }
}
```

### Cancel reservation

- **URL:** `/reservations/id`
- **Method:** `PATCH`
- **Bearer token:** `Jwt token`
- **Code:** `204`

