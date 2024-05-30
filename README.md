# Next-Auth v5 Full Stack Application

This repository contains a full-stack application built using Next.js and Next-Auth v5. The application includes a comprehensive set of authentication features such as credentials login and registration, OAuth login, forgot password, email verification, password reset link, and two-factor authentication (2FA).

## Features

-   **Credentials Login and Register**: Users can sign up and log in using their email and password.
-   **OAuth Login**: Integration with popular OAuth providers (e.g., Google, GitHub).
-   **Forgot Password**: Allows users to reset their password via email.
-   **Email Verification**: Users must verify their email address before accessing certain features.
-   **Password Reset Link**: Sends a secure link to reset the password.
-   **Two-Factor Authentication (2FA)**: Enhances security by requiring a second form of authentication.

## Technologies Used

-   **Framework**: Next.js
-   **Authentication**: Next-Auth v5
-   **Database**: PostgreSQL
-   **Styling**: Tailwind CSS, ShadCn UI]
-   **Email Service**: SendGrid

## Getting Started

### Prerequisites

-   Node.js (version X.X.X)
-   npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AnkitNayan83/next-auth-v5-toolkit.git
    ```

2. Navigate to the project directory:

    ```bash
    cd next-auth-v5-toolkit
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Environment Variables:

1. Create a `.env` file in the root of the project and add the following environment variables:

```bash
DATABASE_URL=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
EMAIL=
SENDGRID_API_KEY=
NEXT_PUBLIC_APP_URL="http://localhost:3000" || "<your domain>"
```

## Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open http://localhost:3000 in your browser to see the application.

## Author

[Ankit Nayan](https://github.com/AnkitNayan83)

---
