# 📘 Book-N-Go

A modern, high-performance appointment and booking management system built with Next.js, React Hook Form, and Zod.

## ✨ Features
- **Centralized Booking State:** Robust, type-safe data flow powered by React Hook Form & Zod validation.
- **Dynamic Steps:** Real-time form stepping logic verifying time conflicts and availability.
- **Strict Validations:** Prevents booking regressions using deterministic schema validations.
- **Beautiful UI:** Developed using TailwindCSS and seamless React DOM transitions.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bookngo-lspu
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

- **`app/`**: Next.js App Router endpoints and primary layout components.
- **`components/`**: Reusable UI components powered by Radix primitives and Tailwind.
- **`lib/schemas.ts`**: Centralized Zod validation schemas for forms and API borders.
- **`lib/services/`**: Mocked or integrated backend service queries.

## 📦 Scripts

- `npm run dev` - Starts the local environments.
- `npm run build` - Builds the project for production.
- `npm run lint` - Executes ESLint to maintain codebase purity.

## 🛠️ Built With

* Next.js 14
* React 18
* Tailwind CSS
* React Hook Form
* Zod
* @tabler/icons-react
