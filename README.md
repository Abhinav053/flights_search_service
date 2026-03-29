# ✈️ Flights Service API

A comprehensive Node.js REST API for managing flight bookings, airplanes, airports, cities, and seat allocation. Built with Express.js, Sequelize ORM, and MySQL database, following industry-standard MVC architecture with clean separation of concerns.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [Development](#development)
- [Project Architecture](#project-architecture)
- [Folder Documentation](#folder-documentation)
- [Database Migrations](#database-migrations)
- [Error Handling](#error-handling)

---

## 📖 Overview

**Flights Service** is a robust API backend for a flight booking system. It handles the complete lifecycle of flight operations including:

- **Airplane Management**: Register and manage different aircraft with their specifications
- **City Management**: Maintain a database of cities where flights operate
- **Airport Management**: Manage airports with codes and city associations
- **Flight Operations**: Create, retrieve, and filter flights with advanced search capabilities
- **Seat Management**: Track and allocate seats on flights

The API supports **filtering flights by multiple criteria** including:
- Route/Trip (departure and arrival airports)
- Price range
- Number of travelers
- Departure date
- Sort options

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | Latest | JavaScript runtime |
| **Express** | ^4.18.2 | Web application framework |
| **Sequelize** | ^6.31.1 | ORM for database management |
| **MySQL2** | ^3.2.4 | MySQL database driver |
| **Sequelize CLI** | ^6.6.0 | Database migrations & seeders |
| **Winston** | ^3.8.2 | Logging library |
| **Dotenv** | ^16.0.3 | Environment variable management |
| **HTTP Status Codes** | ^2.2.0 | Standardized HTTP status codes |
| **Nodemon** | ^2.0.22 | Auto-restart server during development |

---

## 📁 Project Structure

```
Flights-Service/
├── .env                              # Environment variables
├── .gitignore                        # Git ignore rules
├── package.json                      # Project dependencies & scripts
├── README.md                         # This file
└── src/
    ├── index.js                      # Application entry point
    ├── config/                       # Configuration files
    │   ├── config.json               # Database configuration (environment-specific)
    │   ├── index.js                  # Config loader
    │   ├── logger-config.js          # Winston logger setup
    │   └── server-config.js          # Server & environment setup
    ├── routes/                       # API route definitions
    │   ├── index.js                  # Main routes router
    │   └── v1/                       # API v1 routes
    │       ├── index.js              # V1 routes aggregator
    │       ├── airplane-routes.js    # Airplane endpoints
    │       ├── airport-routes.js     # Airport endpoints
    │       ├── city-routes.js        # City endpoints
    │       └── flight-routes.js      # Flight endpoints
    ├── controllers/                  # Request handlers
    │   ├── index.js                  # Controllers aggregator
    │   ├── airplane-controller.js    # Airplane operations
    │   ├── airport-controller.js     # Airport operations
    │   ├── city-controller.js        # City operations
    │   ├── flight-controller.js      # Flight operations
    │   └── info-controller.js        # API info endpoint
    ├── middlewares/                  # Request interceptors
    │   ├── index.js                  # Middlewares aggregator
    │   ├── airplane-middlewares.js   # Airplane validation
    │   ├── airport-middlewares.js    # Airport validation
    │   ├── city-middlewares.js       # City validation
    │   └── flight-middlewares.js     # Flight validation
    ├── services/                     # Business logic layer
    │   ├── index.js                  # Services aggregator
    │   ├── airplane-service.js       # Airplane business logic
    │   ├── airport-service.js        # Airport business logic
    │   ├── city-service.js           # City business logic
    │   └── flight-service.js         # Flight business logic
    ├── repositories/                 # Data access layer
    │   ├── index.js                  # Repositories aggregator
    │   ├── crud-repository.js        # Generic CRUD operations
    │   ├── airplane-repository.js    # Airplane queries
    │   ├── airport-respository.js    # Airport queries
    │   ├── city-repository.js        # City queries
    │   ├── flight-repository.js      # Flight queries
    │   └── queries.js                # Custom SQL queries
    ├── models/                       # Database models
    │   ├── index.js                  # Models initializer & associations
    │   ├── airplane.js               # Airplane model
    │   ├── airport.js                # Airport model
    │   ├── city.js                   # City model
    │   ├── flight.js                 # Flight model
    │   └── seat.js                   # Seat model
    ├── migrations/                   # Database schema changes
    │   ├── 20230502151601-create-airplane.js
    │   ├── 20230509144112-create-city.js
    │   ├── 20230511151537-create-airport.js
    │   ├── 20230511154459-update-city-airport-association.js
    │   ├── 20230513064504-create-flight.js
    │   └── 20230521070455-create-seat.js
    ├── seeders/                      # Sample data population
    │   ├── 20230506093113-add-airplanes.js
    │   └── 20230521072135-add-seats.js
    └── utils/                        # Utility functions & helpers
        ├── index.js                  # Utils aggregator
        ├── common/                   # Common utilities
        │   ├── enums.js              # Application enumerations
        │   ├── error-response.js     # Error response formatter
        │   ├── success-response.js   # Success response formatter
        │   └── index.js              # Common utils aggregator
        ├── errors/
        │   └── app-error.js          # Custom error class
        └── helpers/
            └── datetime-helpers.js   # Date/time utility functions
```

---

## ✨ Core Features

### 1. **Airplane Management**
- Create new airplane entries with model numbers and capacity
- Retrieve all airplanes or specific airplane by ID
- Update airplane details
- Delete airplane records
- Automatic CASCADE deletion of associated flights and seats

### 2. **City Management**
- Add cities to the system
- List all available cities
- Fetch specific city details
- Update city information
- Delete city records

### 3. **Airport Management**
- Register airports with unique codes
- Associate airports with cities
- List all airports
- Retrieve airport by code
- Update airport information
- Manage airport-city relationships

### 4. **Flight Operations**
- **Create Flights**: Register new flights with complete details
- **List Flights**: Retrieve all flights with detailed associations
- **Advanced Search & Filtering**:
  - **By Route**: Filter by departure and arrival airports (`trips=MUM-DEL`)
  - **By Price Range**: Filter flights within price range (`price=1000-5000`)
  - **By Travelers**: Find flights with minimum required seats (`travellers=150`)
  - **By Date**: Search flights departing on specific date (`tripDate=2024-12-25`)
- **Retrieve Flight Details**: Get specific flight with airplane and airport information
- **Update Flight Information**: Modify flight details
- **Delete Flights**: Remove flight records

### 5. **Seat Management**
- Allocate seats to specific airplanes
- Track seat availability
- Manage seat columns and rows
- Support multiple seat types and statuses

### 6. **Advanced Features**
- **Pagination Support**: Handle large datasets efficiently
- **Error Handling**: Comprehensive error handling with custom error classes
- **Validation**: Input validation at middleware level
- **Logging**: Winston logger for tracking operations
- **Environment Management**: Support for development, test, and production environments

---

## 🗄️ Database Schema

### **Entity Relationships**

```
City (1) ──── (Many) Airport
           ├─────────────────────────────────┐
                                            (Many)
                                           Flight
                                          /      \
                    Airplane ───────────(1)      (1)─── Airport
                       (1)                           (departure/arrival)
                       |
                   (Many)
                   Seats
```

### **Core Models**

| Model | Purpose | Key Fields |
|-------|---------|-----------|
| **Airplane** | Aircraft registry | id, modelNumber, capacity |
| **City** | Geographic locations | id, name |
| **Airport** | Flight hubs | code (PK), city_id, address, name |
| **Flight** | Flight records | id, flightNumber, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, price, boardingGate, totalSeats |
| **Seat** | Aircraft seats | id, airplaneId, row, col, type, status |

### **Associations**

1. **Airplane → Flight**: One-to-Many (CASCADE delete)
2. **Airplane → Seat**: One-to-Many (CASCADE delete)
3. **Airport → Flight**: Many-to-One (departure/arrival airports)
4. **City → Airport**: One-to-Many

---

## 🔌 API Endpoints

### **Base URL**
```
http://localhost:3001/api/v1
```

### **Airports**
```
GET    /airports              # Get all airports
GET    /airports/:code        # Get airport by code
POST   /airports              # Create new airport
PATCH  /airports/:code        # Update airport
DELETE /airports/:code        # Delete airport
```

### **Cities**
```
GET    /cities                # Get all cities
GET    /cities/:id            # Get city by ID
POST   /cities                # Create new city
PATCH  /cities/:id            # Update city
DELETE /cities/:id            # Delete city
```

### **Airplanes**
```
GET    /airplanes             # Get all airplanes
GET    /airplanes/:id         # Get airplane by ID
POST   /airplanes             # Create new airplane
PATCH  /airplanes/:id         # Update airplane
DELETE /airplanes/:id         # Delete airplane
```

### **Flights** (Most Complex)
```
GET    /flights                      # Get all flights
GET    /flights?trips=MUM-DEL        # Filter by route
GET    /flights?price=1000-5000      # Filter by price range
GET    /flights?travellers=100       # Filter by seat requirement
GET    /flights?tripDate=2024-12-25  # Filter by departure date
POST   /flights                      # Create new flight
PATCH  /flights/:id                  # Update flight
DELETE /flights/:id                  # Delete flight
GET    /flights/:id                  # Get flight details
```

### **System Info**
```
GET    /info                  # API information endpoint
```

---

## 🚀 Setup & Installation

### **Prerequisites**
- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm (comes with Node.js)
- Git

### **Step 1: Clone & Install**
```bash
# Navigate to project directory
cd Flights-Service

# Install dependencies
npm install
```

### **Step 2: Environment Setup**
Create a `.env` file in the root directory:
```env
PORT=3001
NODE_ENV=development
```

### **Step 3: Database Configuration**
Edit `src/config/config.json` with your database credentials:

```json
{
  "development": {
    "username": "root",        # Your MySQL username
    "password": "root",        # Your MySQL password
    "database": "flights_db",  # Database name
    "host": "127.0.0.1",       # Database host
    "dialect": "mysql"         # Database type
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "localhost",        # Change to your hosted DB
    "dialect": "mysql"
  }
}
```

### **Step 4: Database Setup**
```bash
# Run migrations to create database tables
npx sequelize db:migrate

# (Optional) Run seeders to populate sample data
npx sequelize db:seed:all
```

### **Step 5: Start Server**
```bash
# Development (with auto-reload)
npm run dev

# Output will show:
# Successfully started the server on PORT : 3001
```

---

## ⚙️ Configuration

### **Config Files**

#### `server-config.js`
Manages environment variables and server settings:
```javascript
module.exports = {
    PORT: process.env.PORT  // Read from .env file
}
```

#### `logger-config.js`
Winston logger configuration for application logging and error tracking.

#### `config.json`
Database connection settings for different environments:
- **development**: Local MySQL instance for testing
- **test**: Test database for running test suites
- **production**: Production database on hosted server

---

## 🏗️ Project Architecture

### **Design Pattern: MVC + Repository + Service Layer**

```
Request
  ↓
Routes (Route definition)
  ↓
Middleware (Validation & Authentication)
  ↓
Controller (Request handling & Response formatting)
  ↓
Service (Business Logic Implementation)
  ↓
Repository (Database Operation Layer)
  ↓
Model/ORM (Sequelize)
  ↓
Database (MySQL)
```

### **Why This Architecture?**

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Each layer can be tested independently
3. **Reusability**: Services can be used by multiple controllers
4. **Maintainability**: Easy to locate and modify code
5. **Scalability**: Can easily add new features with minimal changes

---

## 📂 Folder Documentation

### **1. `config/`**
**Purpose**: Centralized configuration management

**Files**:
- `server-config.js`: Server environment & PORT configuration
- `logger-config.js`: Winston logger setup for logging application events
- `config.json`: Database connection details (development, test, production)
- `index.js`: Exports all configurations for easy import

**Why Separate**: Keeps all configurations in one place, making it easy to manage different environments.

---

### **2. `routes/`**
**Purpose**: URL endpoint definitions and route mapping

**Structure**:
```
routes/
├── index.js           # Main route aggregator
└── v1/               # API version 1
    ├── index.js      # V1 routes aggregator
    ├── airplane-routes.js
    ├── airport-routes.js
    ├── city-routes.js
    └── flight-routes.js
```

**Responsibility**:
- Define URL patterns (GET, POST, PATCH, DELETE)
- Map routes to controllers
- Apply route-specific middlewares
- Enable versioning support for API scalability

**Example**:
```javascript
router.get('/:id', AirplaneController.getAirplane);
router.post('/', validateAirplaneInput, AirplaneController.createAirplane);
```

---

### **3. `middlewares/`**
**Purpose**: Request validation and preprocessing

**Contains**:
- Input validation (body, params, query)
- Business logic validation
- Authentication/Authorization (if implemented)
- Error handling middleware

**Flow**: Middleware intercepts requests before reaching controllers, ensuring data integrity.

---

### **4. `controllers/`**
**Purpose**: Handle HTTP requests and format responses

**Key Responsibilities**:
1. Extract data from request (body, params, query)
2. Call appropriate service method
3. Format response using `SuccessResponse` or `ErrorResponse`
4. Send HTTP response with correct status code

**Example**:
```javascript
async function createFlight(req, res) {
    const flight = await FlightService.createFlight(req.body);
    return res.status(StatusCodes.CREATED).json(flight);
}
```

---

### **5. `services/`**
**Purpose**: Implement core business logic

**Key Responsibilities**:
1. Validate business rules
2. Orchestrate multiple repository calls if needed
3. Implement complex algorithms
4. Throw `AppError` for business rule violations

**Example**:
```javascript
async function createFlight(data) {
    // Business logic here
    const flight = await flightRepository.create(data);
    return flight;
}
```

---

### **6. `repositories/`**
**Purpose**: Data access and database operations

**Contains**:
- `crud-repository.js`: Generic CRUD operations (Create, Read, Update, Delete)
- Entity-specific repositories: Extend CRUD repository with custom queries

**CRUD Repository Methods**:
```javascript
create(data)      // Insert new record
get(id)           // Fetch single record
getAll()          // Fetch all records
update(id, data)  // Update record
destroy(id)       // Delete record
```

**Example Custom Query**:
```javascript
async getAllFlights(filter) {
    return await Flight.findAll({
        where: filter,
        include: ['airplaneDetail', 'departureAirport', 'arrivalAirport']
    });
}
```

---

### **7. `models/`**
**Purpose**: Define database schema using Sequelize ORM

**Each Model Contains**:
- Field definitions with data types
- Validation rules
- Model associations (relationships)
- Hooks and lifecycle methods

**Key File - `index.js`**:
- Loads all models dynamically
- Establishes model associations
- Exports Sequelize instance for queries

**Example Model Structure**:
```javascript
Flight.init({
    flightNumber: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER },
    departureTime: { type: DataTypes.DATE, allowNull: false }
});

Flight.associate = (models) => {
    Flight.belongsTo(models.Airplane);
    Flight.belongsTo(models.Airport, { foreignKey: 'departureAirportId' });
};
```

---

### **8. `migrations/`**
**Purpose**: Version control for database schema

**Why Important**:
- Track database changes over time
- Enable team collaboration
- Allow rollback if needed
- Maintain database consistency

**Naming Convention**: `[timestamp]-[description].js`

**Example**:
```javascript
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Flights', { ... });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Flights');
    }
};
```

**Commands**:
```bash
npx sequelize db:migrate              # Run all pending migrations
npx sequelize db:migrate:undo         # Undo last migration
npx sequelize db:migrate:undo:all     # Undo all migrations
```

---

### **9. `seeders/`**
**Purpose**: Populate database with sample/initial data

**Use Cases**:
- Add default data for development
- Create test data
- Initialize lookup tables

**Commands**:
```bash
npx sequelize db:seed:all             # Run all seeders
npx sequelize db:seed:undo:all        # Undo all seeders
```

---

### **10. `utils/`**
**Purpose**: Shared utility functions and helpers

**Structure**:
```
utils/
├── errors/
│   └── app-error.js        # Custom error class
├── common/
│   ├── enums.js            # Application enumerations
│   ├── error-response.js   # Error response formatter
│   ├── success-response.js # Success response formatter
│   └── index.js
└── helpers/
    └── datetime-helpers.js # Date utilities
```

**Key Utilities**:

**AppError**: Custom error class for standardized error handling
```javascript
throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
```

**Response Formatters**:
- `SuccessResponse`: Formats successful API responses
- `ErrorResponse`: Formats error responses

**Enums**: Define constant values for flight status, seat types, etc.
**Helpers**: Reusable functions for date manipulation, formatting, etc.

---

## 🔄 Database Migrations

### **What are Migrations?**
Migrations are version-controlled SQL scripts that define database schema changes. They allow the database to evolve alongside your application code.

### **Migration Files Included**

1. **20230502151601-create-airplane.js**
   - Creates `Airplanes` table
   - Stores aircraft information (model, capacity)

2. **20230509144112-create-city.js**
   - Creates `Cities` table
   - Stores city information

3. **20230511151537-create-airport.js**
   - Creates `Airports` table
   - Stores airport codes, names, cities

4. **20230511154459-update-city-airport-association.js**
   - Creates foreign key relationship between Cities and Airports

5. **20230513064504-create-flight.js**
   - Creates `Flights` table
   - Links to Airplanes and Airports
   - Stores flight details (times, prices, gates)

6. **20230521070455-create-seat.js**
   - Creates `Seats` table
   - Associates seats with Airplanes

### **Running Migrations**
```bash
# Create database tables from migrations
npx sequelize db:migrate

# Undo last migration
npx sequelize db:migrate:undo

# Undo all migrations
npx sequelize db:migrate:undo:all

# Create new migration
npx sequelize migration:generate --name migration-name
```

---

## ❌ Error Handling

### **Custom Error Class: `AppError`**

**Location**: `src/utils/errors/app-error.js`

**Purpose**: Standardized error handling throughout application

**Usage**:
```javascript
throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
```

**Structure**:
```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;  // HTTP status code
        this.explanation = message;     // Error message
    }
}
```

### **Error Response Format**
```javascript
{
    "success": false,
    "data": {},
    "error": {
        "name": "Error Name",
        "statusCode": 404,
        "explanation": "Resource not found"
    }
}
```

### **Common HTTP Status Codes Used**
```
200: OK (Successful request)
201: Created (Successful creation)
400: Bad Request (Invalid input)
404: Not Found (Resource doesn't exist)
500: Internal Server Error (Server error)
```

### **Error Handling Flow**
```
Request
  ↓
Middleware throws AppError
  ↓
Controller catches error
  ↓
Format with ErrorResponse
  ↓
Send error response to client
```

---

## 🎯 Development Workflow

### **1. Development Server**
```bash
npm run dev
```
- Starts server on PORT from `.env`
- Nodemon watches file changes
- Auto-restarts server
- Accessible at `http://localhost:3001`

### **2. Testing API Endpoints**
Use tools like:
- **Postman**: GUI for testing APIs
- **cURL**: Command-line HTTP client
- **Insomnia**: Alternative REST client

### **3. Adding New Features**
1. Create migration for database schema
2. Create model with validations
3. Create repository with queries
4. Create service with business logic
5. Create controller with route handlers
6. Create routes for endpoints
7. Add middlewares for validation
8. Test endpoints

### **4. Database Management**
```bash
# Run migrations
npx sequelize db:migrate

# Run seeders
npx sequelize db:seed:all

# Check migration status
npx sequelize db:migrate:status
```

---

## 📝 Example: Creating a Flight

### **Request**
```bash
POST http://localhost:3001/api/v1/flights
Content-Type: application/json

{
    "flightNumber": "UK 808",
    "airplaneId": 1,
    "departureAirportId": "MUM",
    "arrivalAirportId": "DEL",
    "arrivalTime": "2024-12-25 23:00:00",
    "departureTime": "2024-12-25 21:00:00",
    "price": 3500,
    "boardingGate": "12A",
    "totalSeats": 180
}
```

### **Flow**
1. **Route**: Routes request to `FlightController.createFlight`
2. **Middleware**: Validates input (flight-middlewares.js)
3. **Controller**: Extracts data, calls `FlightService.createFlight`
4. **Service**: Implements business logic, calls `FlightRepository.create`
5. **Repository**: Uses Sequelize to insert into database
6. **Response**: Returns created flight object

### **Response**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "flightNumber": "UK 808",
        "airplaneId": 1,
        "price": 3500,
        "totalSeats": 180,
        "createdAt": "2024-12-25T20:00:00.000Z",
        "updatedAt": "2024-12-25T20:00:00.000Z"
    },
    "error": {}
}
```

---

## 🔍 Searching Flights

### **Query Examples**

**1. Search by Route**
```
GET /api/v1/flights?trips=MUM-DEL
```
Returns all flights from Mumbai to Delhi

**2. Search by Price Range**
```
GET /api/v1/flights?price=2000-5000
```
Returns flights between ₹2000 and ₹5000

**3. Search by Number of Travelers**
```
GET /api/v1/flights?travellers=150
```
Returns flights with at least 150 available seats

**4. Search by Date**
```
GET /api/v1/flights?tripDate=2024-12-25
```
Returns flights departing on December 25, 2024

**5. Combined Search**
```
GET /api/v1/flights?trips=MUM-DEL&price=2000-5000&tripDate=2024-12-25&travellers=100
```

---

## 📚 Dependencies Overview

| Package | Purpose |
|---------|---------|
| **express** | Web server framework for routing and middleware |
| **sequelize** | ORM for database operations |
| **mysql2** | MySQL driver for database connection |
| **sequelize-cli** | CLI tool for migrations and seeders |
| **dotenv** | Load environment variables from .env file |
| **winston** | Professional logging library |
| **http-status-codes** | HTTP status code constants (200, 404, etc.) |
| **nodemon** | Auto-restart server during development |

---

## 🚨 Important Notes

1. **Database Setup**: Ensure MySQL is running before starting the application
2. **Environment Variables**: Always create `.env` file with required PORT
3. **Migrations**: Run migrations before starting server
4. **Foreign Keys**: Ensure CASCADE delete is configured for data integrity
5. **Error Handling**: Always use `AppError` for consistent error responses
6. **Logging**: Use Winston logger for important events

---

## 📞 Support & Troubleshooting

### **Port Already in Use**
```bash
# Change PORT in .env file to different value
PORT=3002
```

### **Database Connection Error**
```bash
# Verify config.json has correct credentials
# Check MySQL is running
# Verify database exists
```

### **Migration Issues**
```bash
# Check migration status
npx sequelize db:migrate:status

# Undo migrations if needed
npx sequelize db:migrate:undo:all

# Re-run migrations
npx sequelize db:migrate
```

---

## 🎉 You're Ready!

Your Flights Service API is now fully configured and ready for development. Start the server with:

```bash
npm run dev
```

Happy coding! ✈️
