## MRBoard
A meeting room display board for Horten kommune that shows upcoming room bookings from Microsoft 365 Calendar.

### Features

- Displays calendar events for the next 12 hours
- Shows meeting room names, times, and organizers
- Auto-refreshes to keep information current
- Filters out internal meetings and maps room names to floor locations
- Clean, easy-to-read display interface

### Tech Stack

- **Backend:** Node.js 24 with Express 5
- **Authentication:** Microsoft 365 API with MSAL Node
- **View Engine:** Handlebars (HBS)
- **Deployment:** Azure Web App via GitHub Actions

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Microsoft 365 app credentials
4. Start the server: `npm start`
5. Access the board at `http://localhost:3000`

### Environment Variables

Required variables in `.env`:
- Microsoft 365 application credentials (client ID, tenant ID, client secret)
- Calendar resource/mailbox to display