# Ticket Management Application

A complete ticket management web application built with **three different frameworks** - React, Vue.js, and Twig/PHP. Each implementation is fully functional, visually identical, and uses localStorage for data persistence.

![TicketFlow](assets/hero-wave.svg)

## 🎯 Project Overview

This project demonstrates how to build the same application using different modern web technologies while maintaining consistent design, functionality, and user experience across all implementations.

### Features

- **Landing Page** - Professional hero section with wavy SVG background and decorative elements
- **Authentication** - Login and signup with form validation and localStorage-based sessions
- **Dashboard** - Overview with ticket statistics (total, open, resolved)
- **Ticket Management** - Full CRUD operations for tickets with status tracking
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI** - Clean, modern interface following Material Design principles

### Status Tracking

- **Open** (Green) - New tickets awaiting response
- **In Progress** (Amber) - Tickets currently being worked on
- **Closed** (Gray) - Resolved tickets

## 📁 Project Structure

```
/ticket-management-app
├── /client                    # React version (current Replit setup)
│   ├── src/
│   │   ├── pages/            # All page components
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React Context for auth
│   │   ├── lib/              # Utilities and localStorage logic
│   │   └── App.tsx           # Main app with routing
│   └── package.json
├── /vue-version               # Vue.js implementation
│   ├── src/
│   │   ├── views/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── stores/           # Pinia state management
│   │   ├── lib/              # Utilities and localStorage logic
│   │   ├── router/           # Vue Router setup
│   │   └── App.vue
│   └── package.json
├── /twig-version              # Twig/PHP implementation
│   ├── templates/            # Twig template files
│   ├── assets/               # CSS and JavaScript
│   ├── lib/                  # PHP utilities
│   └── index.php             # Main entry point
├── /assets                    # Shared SVG assets
│   ├── hero-wave.svg
│   └── decorative-circle.svg
└── README.md                  # This file
```

## 🚀 Getting Started

### React Version (Default Replit Setup)

The React version is the default application in this Replit environment.

**Installation:**
```bash
npm install
```

**Run:**
```bash
npm run dev
```

The application will be available at the Replit webview URL.

**Test Credentials:**
- Email: `test@test.com`
- Password: `123456`

### Vue.js Version

**Navigate to the Vue directory:**
```bash
cd vue-version
```

**Installation:**
```bash
npm install
```

**Run:**
```bash
npm run dev
```

The application will run on `http://localhost:5001`

**Test Credentials:**
- Email: `test@test.com`
- Password: `123456`

### Twig/PHP Version

**Navigate to the Twig directory:**
```bash
cd twig-version
```

**Run with PHP's built-in server:**
```bash
php -S localhost:8000
```

The application will run on `http://localhost:8000`

**Test Credentials:**
- Email: `test@test.com`
- Password: `123456`

## 🎨 Design System

All three implementations share a consistent design system:

### Colors

- **Primary:** Blue (#3B82F6)
- **Destructive:** Red (#EF4444)
- **Ticket Status:**
  - Open: Green tones
  - In Progress: Amber tones
  - Closed: Gray tones

### Typography

- **Font Family:** Inter
- **Hero Headline:** 3.5rem (56px), bold
- **Page Titles:** 2rem (32px), semibold
- **Body Text:** 1rem (16px), regular

### Layout

- **Max Width:** 1440px (centered)
- **Spacing:** Consistent 4px-based scale
- **Cards:** Rounded corners (0.75rem), subtle shadows
- **Forms:** Clean inputs with focus states

## 🧰 Tech Stack

### React Version
- **Framework:** React 18
- **Routing:** Wouter
- **State Management:** React Context API
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Notifications:** Custom toast system
- **Build Tool:** Vite

### Vue Version
- **Framework:** Vue 3 (Composition API)
- **Routing:** Vue Router 4
- **State Management:** Pinia
- **Styling:** Tailwind CSS
- **Notifications:** Vue Toastification
- **Build Tool:** Vite

### Twig/PHP Version
- **Backend:** PHP 8.x
- **Templating:** Twig
- **Styling:** Tailwind CSS
- **JavaScript:** Vanilla JS for localStorage and interactivity
- **No Build Step:** Direct PHP server

## 🔧 Key Features

### Authentication System
- User registration with validation
- Secure login with session management
- localStorage-based session persistence
- Protected routes (redirect to login if unauthorized)

### Ticket Management
- Create tickets with title, description, status, and priority
- Edit existing tickets
- Delete tickets (with confirmation)
- Filter and sort capabilities
- Real-time localStorage updates

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- Touch-friendly interactions
- Hamburger menu on mobile

### Form Validation
- Inline error messages
- Email format validation
- Password strength requirements
- Confirmation dialogs for destructive actions

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (stacked layouts, full-width cards)
- **Tablet:** 768px - 1024px (2-column grids)
- **Desktop:** > 1024px (3-column grids, horizontal layouts)

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states with high contrast
- Screen reader announcements
- WCAG AA color contrast compliance

## 🎯 Acceptance Criteria

✅ **Visual Consistency** - All three versions look identical  
✅ **Functional Parity** - Same features across all implementations  
✅ **Responsive Design** - Works on all device sizes  
✅ **Form Validation** - Proper error handling and user feedback  
✅ **Authentication** - Secure login/signup with session management  
✅ **CRUD Operations** - Complete ticket lifecycle management  
✅ **localStorage Integration** - No backend database required  
✅ **Clean Documentation** - README files for each version  

## 📝 Future Enhancements

- Ticket filtering and search
- User assignment to tickets
- Priority levels with visual indicators
- Ticket history/activity log
- Export functionality (CSV/PDF)
- Dark mode support
- Email notifications
- File attachments
- Comments and discussions

## 🤝 Contributing

This is a demonstration project showing framework comparisons. Each version is intentionally kept simple to focus on core functionality and design consistency.

## 📄 License

MIT License - feel free to use this for learning and comparison purposes.

## 🙏 Acknowledgments

- Design inspired by Linear and Asana
- Icons from Lucide (React) and Heroicons (Vue/Twig)
- Built with modern web technologies and best practices

---

**Built with ❤️ to demonstrate multi-framework development**
