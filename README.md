# TicketFlow - React Version

A professional ticket management system built with **React 18**, **Wouter**, and **Context API**. Features a beautiful UI powered by shadcn/ui components, complete authentication, and full CRUD operations - all using localStorage.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application runs on the Replit webview (typically port 5000).

### Build for Production

```bash
npm run build
```

## 📦 Tech Stack

- **React 18** - Modern React with hooks
- **Wouter** - Minimalist routing library
- **Context API** - Built-in React state management
- **shadcn/ui** - High-quality, accessible React components
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation build tool
- **Drizzle ORM** - Type-safe ORM (schema definitions)
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern date utility library
- **Lucide React** - Beautiful icon set

## 🏗️ Project Structure

```
client/
├── src/
│   ├── pages/               # Page components
│   │   ├── Landing.tsx      # Landing page with hero
│   │   ├── Login.tsx        # Login page
│   │   ├── Signup.tsx       # Registration page
│   │   ├── Dashboard.tsx    # Dashboard with statistics
│   │   ├── Tickets.tsx      # Ticket management (CRUD)
│   │   └── not-found.tsx    # 404 page
│   ├── components/          # Reusable components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer component
│   │   ├── StatusBadge.tsx  # Ticket status indicator
│   │   └── ProtectedRoute.tsx # Auth guard
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication state
│   ├── lib/                 # Utilities
│   │   ├── auth.ts          # Auth utilities
│   │   ├── tickets.ts       # Ticket CRUD operations
│   │   ├── initTestData.ts  # Test data initialization
│   │   └── queryClient.ts   # React Query setup
│   ├── hooks/               # Custom hooks
│   │   └── use-toast.ts     # Toast notifications
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Application entry
│   └── index.css            # Global styles + Tailwind
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json             # Dependencies
```

## 🎨 Component Architecture

### Pages

**Landing.tsx**

- Hero section with wavy SVG background
- Decorative circle overlay (positioned top-right)
- Feature grid with icon cards
- Multiple CTA sections
- Fully responsive layout

**Login.tsx** & **Signup.tsx**

- Centered card layout
- Real-time form validation with inline errors
- Password confirmation (signup only)
- Toast notifications for success/error
- Links to alternate auth page
- Test credentials display

**Dashboard.tsx**

- Protected route (requires authentication)
- Three stat cards: Total, Open, and Resolved tickets
- Quick action buttons
- Real-time statistics

**Tickets.tsx**

- Protected route
- Ticket list with status badges
- Create ticket dialog
- Edit ticket dialog
- Delete confirmation dialog
- Empty state handling
- Real-time updates

### Shared Components

**Navbar.tsx**

- Sticky top navigation
- Responsive with mobile hamburger menu
- Conditional rendering based on auth state
- User name display when authenticated
- Logout button

**Footer.tsx**

- Three-column grid layout
- Company info, quick links, contact
- Responsive (stacks on mobile)

**StatusBadge.tsx**

- Color-coded status display
- Uses Tailwind custom colors
- Props: `status` (open | in_progress | closed)

**ProtectedRoute.tsx**

- Higher-order component
- Redirects to login if not authenticated
- Checks auth state via AuthContext

### shadcn/ui Components Used

- **Button** - Multiple variants and sizes
- **Card** - Container with header and content
- **Input** - Text inputs with validation states
- **Textarea** - Multi-line text input
- **Label** - Form labels
- **Dialog** - Modal dialogs
- **Select** - Dropdown select
- **Badge** - Status indicators
- **Toast** - Notification system

## 🔐 Authentication System

### AuthContext Provider

Wraps the entire application and provides:

- `session` - Current user session (or null)
- `setSession` - Update session
- `logout` - Clear session and redirect
- `isAuthenticated` - Boolean auth status

### How It Works

1. **Signup Flow**

   - Form validation (name, email, password, confirmation)
   - User created in localStorage (`ticketapp_users`)
   - Auto-login after registration
   - Session stored in localStorage (`ticketapp_session`)
   - Redirect to dashboard

2. **Login Flow**

   - Email/password validation
   - Lookup user in localStorage
   - Create session with token
   - Store session in localStorage
   - Update AuthContext state
   - Redirect to dashboard

3. **Session Persistence**

   - On app load, AuthContext checks localStorage
   - Restores session if valid
   - User remains logged in across refreshes

4. **Protected Routes**

   - `ProtectedRoute` component wraps authenticated pages
   - Checks `isAuthenticated` from AuthContext
   - Redirects to `/auth/login` if not authenticated

5. **Logout**
   - Clears localStorage session
   - Resets AuthContext state
   - Redirects to landing page

## 🎫 Ticket Management

### Data Model

```typescript
interface StoredTicket {
  id: string; // UUID
  title: string; // Brief description
  description: string; // Detailed description
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  userId: string; // Owner ID
}
```

### CRUD Operations

**Create Ticket**

- Dialog with form (title, description, status, priority)
- Form validation with Zod
- Stores in localStorage
- Toast notification
- Refreshes ticket list

**Read Tickets**

- Filtered by current user ID
- Loaded on component mount
- Displayed as card list
- Shows status badge, date, priority

**Update Ticket**

- Edit dialog with pre-filled form
- Same validation as create
- Updates `updatedAt` timestamp
- Toast notification

**Delete Ticket**

- Confirmation dialog (prevents accidental deletion)
- Removes from localStorage
- Toast notification
- Updates ticket list

### localStorage Structure

**Keys:**

- `ticketapp_session` - Current user session
- `ticketapp_users` - Array of all users
- `ticketapp_tickets` - Array of all tickets

**Session Object:**

```typescript
{
  user: { id, email, password, name },
  token: string // UUID
}
```

## 🎨 Styling System

### Tailwind Configuration

Custom design tokens in `tailwind.config.ts`:

```typescript
colors: {
  ticket: {
    open: { bg, text, border },
    in_progress: { bg, text, border },
    closed: { bg, text, border },
  },
}
```

### Global Styles

Located in `src/index.css`:

1. **CSS Variables** - Color system for light/dark modes
2. **Elevation Utilities** - Hover and active states
3. **Border Radius** - Consistent rounded corners
4. **Shadows** - Multiple shadow levels

### Custom Utilities

**hover-elevate** - Subtle background lift on hover  
**active-elevate-2** - More dramatic lift on click  
**toggle-elevate** - For toggle-able elements

These work across all button variants and contexts.

## 🧪 Test Data

On first load, the app initializes with:

**Test User:**

```
Email: test@test.com
Password: 123456
Name: Test User
```

**Sample Tickets (4 total):**

- 2 Open tickets (high priority)
- 1 In Progress ticket (medium priority)
- 1 Closed ticket (low priority)

This demonstrates all ticket states and provides immediate testing capability.

## ♿ Accessibility

- ✅ Semantic HTML throughout
- ✅ `data-testid` on all interactive elements
- ✅ ARIA labels where appropriate
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus indicators with offset rings
- ✅ Screen reader announcements (via toasts)
- ✅ WCAG AA color contrast
- ✅ Touch targets 44x44px minimum

## 🧰 Utility Functions

### Auth Utilities (`lib/auth.ts`)

- `getSession()` - Retrieve current session
- `setSession()` - Save session
- `clearSession()` - Remove session
- `registerUser()` - Create new user
- `loginUser()` - Authenticate user

### Ticket Utilities (`lib/tickets.ts`)

- `getTickets(userId?)` - Get all tickets (optionally filtered)
- `createTicket()` - Create new ticket
- `updateTicket()` - Update existing ticket
- `deleteTicket()` - Remove ticket

## 🔧 Configuration

### Vite Aliases

```typescript
'@': './client/src'
'@shared': './shared'
'@assets': './assets'
```

### Environment Variables

No environment variables required - everything uses localStorage.

## 🐛 Troubleshooting

**Issue:** Can't log in with test credentials  
**Solution:** Clear localStorage and refresh: `localStorage.clear()`

**Issue:** Tickets not loading  
**Solution:** Ensure you're logged in; check browser console for errors

**Issue:** UI looks broken  
**Solution:** Run `npm install` to ensure all dependencies are installed

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Wouter Routing](https://github.com/molefrog/wouter)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

## 🎯 Key Features of This Implementation

✅ **Type Safety** - Full TypeScript coverage  
✅ **Modern Hooks** - useState, useEffect, useContext, custom hooks  
✅ **Component Library** - shadcn/ui for consistent, accessible UI  
✅ **Form Handling** - React Hook Form + Zod validation  
✅ **Routing** - Wouter (lightweight alternative to React Router)  
✅ **State Management** - Context API (no Redux needed)  
✅ **Code Quality** - ESLint, Prettier, strict TypeScript

## 🔄 Comparison with Vue Version

| Feature    | React           | Vue             |
| ---------- | --------------- | --------------- |
| State      | Context API     | Pinia           |
| Routing    | Wouter          | Vue Router      |
| Forms      | React Hook Form | v-model         |
| Components | JSX/TSX         | SFC (.vue)      |
| Styling    | className prop  | class attribute |
| Reactivity | useState        | ref/reactive    |

Both achieve identical functionality and design!

---

**Built with React 18 & TypeScript ⚛️**
