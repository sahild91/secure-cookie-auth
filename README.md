# NestJS Secure Cookie Backend Server

This is a NestJS backend application for managing user authentication, profiles, activities, and sessions. It includes JWT-based authentication, email verification, and session management with MongoDB.

## Table of Contents

- Getting Started
  - Prerequisites
  - Installation
  - Environment Variables
  - Generate SSL Certificates
  - Running the Application
  - Running in Development Mode
  - Building the Application
  - Running Tests
- API Endpoints
  - Auth
  - Profile
  - Activity
  - Session
- Middlewares and Utilities
- Contributing
- License
- Contact

## Getting Started

### Prerequisites

- Node.js (v14 or higher) [https://nodejs.org/en/download/package-manager]
- npm (v6 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Fort the repository

Click the "Fork" button at the top right of the repository[https://github.com/sahild91/secure-cookie-auth.git]

2. Clone your forked repository:
```bash
git clone https://github.com/your-repo/secure-cookie-auth.git
cd secure-cookie-auth
```

3. Install dependencies
```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables
```bash
PORT=3001
KEY_PATH=./server.key
CERT_PATH=./server.cert
JWT_SECRET=<jwt_secret>
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES_IN=1
SESSION_NAME=session_id
SESSION_AGE=1800000 # 30 minutes in milliseconds
SESSION_SECRET=<session_secret>
SESSION_TIMEOUT=1800000
CLIENT_URL=http://localhost:8080
SERVER_URL=http://localhost:3000
EMAIL_SERVICE=gmail
EMAIL_USER=example@email.com
EMAIL_CLIENT_ID=<client_id>
EMAIL_CLIENT_SECRET=<client_secret>
EMAIL_REFRESH_TOKEN=<refresh_token>
EMAIL_ACCESS_TOKEN=<access_token>
EMAIL_EXPIRES_IN=3599
EMAIL_TOKEN_EXPIRY=<expiry_token>
MONGO_URI=<your_mongodb_uri>
```

### Generate SSL Certificates

If you don't already have SSL certificates, you can generate self-signed certificates:
```bash
openssl genrsa -out path/to/folder/server.key 2048
openssl req -new -key path/to/folder/server.key -out path/to/folder/server.csr
openssl x509 -req -days 365 -in path/to/folder/server.csr -signkey path/to/folder/server.key -out path/to/folder/server.cert
```

### Running the Application

1. Run the application:
```bash
npm run start
```

2. Open your browser and navigate to:
```bash
https://localhost:3001
```

### Running in Development Mode

To run the application in development mode with hot reloading, use:
```bash
npm run start:dev
```

### Building the application

To build the application for production, use:
```bash
npm run build
```

### Running Tests (To be updated)

To run the tests, use
```bash
npm run test
```

## API Endpoints

### Auth

- `POST /auth/signup`: Register a new user.
- `POST /auth/login`: Authenticate a user.
- `POST /auth/forgot-password`: Request a password reset.
- `POST /auth/change-password`: Change the user's password.
- `POST /auth/delete-account`: Soft delete the user's account.
- `POST /auth/reactivate-account`: Reactivate the user's account with OTP.
- `PUT /auth/update-profile`: Update the user's profile.
- `POST /auth/log-activity`: Log user activity.

### Profile

- `GET /profile`: Get the user's profile
- `PUT /profile`: Update the user's profile

### Activity

- `GET /activity`: Get the user's activity log.
- `POST /activity`: Log a new activity.

### Session

- `GET /session`: Get the current session
- `POST /session`: Create a new session
- `DELETE /session`: Delete the current session

## Middlewares and Utilities

- *CORS*: Handles Cross-Origin Resource Sharing.
- *Rate Limiting*: Limits the number of requests from a single IP.
- *HTTPS*: Configures the server to use HTTPS with SSL certificates.
- *Email Service*: Handles sending emails for registration, password reset, and account reactivation.
- *Error Handling*: Middleware for handling errors.
- *Validation*: Validates request payloads.

## Contributing

### Setting up the Development Environment

1. Fork the repository:

Click the "Fork" button at the top right of the repository page.

2. Clone the forked repository:

```bash
git clone https://github.com/your-username/secure-cookie-auth.git
cd secure-cookie-auth
```

3. Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
```
4. Install dependencies:

```bash
npm install
```

5. Set up environment variables:

Create a `.env` file in the root directory with the necessary environment variables as described in the Environment Variables section.

6. Run the application:

```bash
npm run start:dev
```

7. Making Changes
Make your changes in the relevant files.

8. Run tests to ensure everything works as expected:

```bash
npm run test
```

9. Commit your changes:

```bash
git add .
git commit -m "Describe your changes"
```

10. Push your changes to your forked repository:

```bash
git push origin feature/your-feature-name
```

### Creating a Pull Request

1. Navigate to the original repository you forked from.

2. Click on the "Pull Requests" tab, then click "New Pull Request".

3. Select your branch and the branch you want to merge into (usually main).

4. Submit your pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or issues, please contact sahildiwakar91@gmail.com.