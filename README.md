# Chatbot Proxy

Node.js Express TypeScript project

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Project Structure

```
chatbot-proxy/
├── src/
│   └── index.ts          # Express server entry point
├── dist/                 # Compiled JavaScript files
├── .env                  # Environment variables
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md            # Project documentation
```

## Features

- Express.js web framework
- TypeScript for type safety
- Hot reload with ts-node-dev
- Environment variables with dotenv
- ESLint for code quality

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

## Environment Variables

- `PORT` - Server port (default: 3000)
