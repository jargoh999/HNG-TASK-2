# Number Classification API

## Overview
This is a Node.js Express application that provides number classification and interesting mathematical properties through a RESTful API endpoint.

## Features
- Number classification
- Prime number detection
- Perfect number identification
- Digit sum calculation
- Number property analysis

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
```bash
node index.js
```
The server will start on port 3000 by default.

## API Endpoint
### Classify Number
- **URL**: `/api/classify-number`
- **Method**: GET
- **Query Parameter**: `number`

#### Example Request
```
GET /api/classify-number?number=6
```

#### Response Example
```json
{
  "number": 6,
  "is_prime": false,
  "is_perfect": true,
  "properties": ["Even", "Positive"],
  "digit_sum": 6,
  "fun_fact": "A mathematical description about the number"
}
```

## Dependencies
- Express.js
- CORS

## Error Handling
- Invalid number inputs will return appropriate error responses
- External API errors are gracefully handled

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

## License
ISC License
