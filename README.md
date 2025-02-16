# Project Name

A brief description of your project and what it does.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v20 or above)
- npm (Node package manager)
- Git (if cloning from a repository)

You can check your Node.js version by running:

```bash
node -v
```

If you need to upgrade Node.js, visit https://nodejs.org/ for installation instructions.

## Getting Started

### 1. Clone the repository

If you haven't already, clone the repository to your local machine using Git:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Install dependencies

To install the project dependencies, run the following command:

```bash
npm install
```

This will install all the required packages listed in `package.json`.

### 3. Set up environment variables

Create a `.env.local` file in the root directory of the project. Here, you'll define any necessary environment variables for your project, such as API keys, database credentials, etc.

Copy below contents into `.env.local` file:

```bash
NEXT_PUBLIC_API_ROOT_URL=https://gavg8gilmf.execute-api.ap-southeast-2.amazonaws.com
API_TOKEN=7710a8c5-ccd1-160f-70cf03e8-b2bbaf01
```

### 4. Run the development server

After installing the dependencies and setting up environment variables, you can start the Next.js development server:

```bash
npm run dev
```

### 5. GraphQL endpoint

The GraphQL API endpoint is available at: `/api/graphql`
You can use this endpoint to make GraphQL queries to the server.

This will start the application locally at [http://localhost:3000](http://localhost:3000).

### 6. Access the application

Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app running locally.

### 7. Build for production

To build the project for production, run the following command:

```bash
npm run build
```

### 8. Start the production server

Once the build is complete, you can start the production server:

```bash
npm run start
```

This will start the application at [http://localhost:3000](http://localhost:3000).
