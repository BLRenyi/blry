# BLRY Frontend

React frontend application for the BLRY project, built with Vite and modern development tools.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── layouts/       # Layout components
├── config/        # Configuration files
├── App.jsx        # Main application component
└── main.jsx       # Application entry point
```

## 🔧 Environment Configuration

Copy `.env.example` to `.env.local` and update values as needed:

```bash
cp .env.example .env.local
```

### Available Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:8000/api)
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version
- `VITE_ENABLE_DEBUG` - Enable debug logging

## 🛠 Development

### Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Development Server

The development server runs on `http://localhost:5173` by default. Hot module replacement (HMR) is enabled for fast development.

### Code Quality

- ESLint configuration includes React-specific rules
- Prettier handles code formatting
- Pre-commit hooks ensure code quality

## 🔗 Integration

This frontend is designed to integrate with a Django backend. The API configuration is prepared for future Django REST Framework integration.

### Future Django Integration

- API calls will be proxied through Vite dev server
- Environment variables are configured for different deployment environments
- CORS handling will be implemented on the Django side
