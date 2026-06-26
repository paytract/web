# 🚀 PayTract Frontend Repository

Welcome to the **PayTract Frontend**! This project is built with **Next.js (App Router)**, **React**, **Tailwind CSS**, **TanStack Query**, and **Redux Toolkit**.

To ensure a highly scalable and maintainable codebase, we strictly follow a **Feature-Driven Architecture**. Please read this guide carefully before contributing.

---

# 🛠 Getting Started

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Environment Variables

Create a `.env.local` file in the project root.

## 3. Start the Development Server

```bash
npm run dev
```

---

# 🌿 Git Contribution Workflow

> **Important**
>
> - **Never commit directly to `staging` or `main`.**

## Step 1: Update Your Local Staging Branch

```bash
git checkout staging
git pull origin staging
```

## Step 2: Create a Feature Branch

Use descriptive branch names.

```bash
git checkout -b feature/login-page
```

or

```bash
git checkout -b fix/header-alignment
```

## Step 3: Commit Your Changes

Keep commits small and focused.

```bash
git commit -m "feat(auth): add login form validation"
```

## Step 4: Push Your Branch

```bash
git push origin feature/login-page
```

## Step 5: Open a Pull Request

Create a Pull Request targeting the **`staging`** branch.

---

# Architecture & Folder Structure

We organize the codebase **by feature**, not by file type.

```text
/
├── app/                  # ONLY Next.js routing (layout.tsx, page.tsx). No business logic.
├── components/           # Shared/global UI (Button, Input, Modal, Navbar, etc.)
├── config/               # Constants, enums, environment configs
├── features/             # Feature-specific modules
│   ├── auth/
│   │   ├── api/          # Axios API calls
│   │   ├── components/   # Auth-specific UI (LoginForm.tsx)
│   │   ├── hooks/        # TanStack Query hooks
│   │   └── types/        # Feature-specific TypeScript types
├── lib/                  # Third-party configurations (axios, react-query)
├── store/                # Redux Toolkit store & slices (Global UI state only)
├── types/                # Global TypeScript types
└── utils/                # Pure helper functions
```

---

# 📜 Core Coding Standards

## State Management

- Use **TanStack Query** for:
  - Fetching server data
  - Caching
  - Mutations

- Use **Redux Toolkit** **only** for global application/UI state such as:
  - Sidebar state
  - Theme
  - Authentication UI state
  - Global modals

---

## API Calls

- ❌ Never call APIs directly inside React components.
- ✅ Always use the shared **Axios API client** located in:

```text
lib/axios.ts
```

- Place API functions inside:

```text
features/[feature]/api/
```

- Connect API functions to components through custom hooks located in:

```text
features/[feature]/hooks/
```

---

## Components & Business Logic

- Keep business logic completely outside UI components.
- Use **react-hook-form** for form handling.
- Use **Zod** for validation before API submission.
- Always handle:
  - Loading states
  - Error states
  - Empty states

---

## Styling (Tailwind CSS)

- ❌ Never hardcode colors, typography, spacing, or sizing.

Example of what **not** to do:

```tsx
text-[#123456]
```

- ✅ Only use the predefined design tokens from the project's Tailwind configuration (based on the Figma design system).

---

# 🏷 Naming Conventions

| Item               | Convention         | Example                           |
| ------------------ | ------------------ | --------------------------------- |
| Folders            | `kebab-case`       | `user-profile`                    |
| React Components   | `PascalCase.tsx`   | `LoginForm.tsx`                   |
| Hooks              | `camelCase.ts`     | `useLogin.ts`                     |
| Utility Functions  | `camelCase.ts`     | `formatDate.ts`                   |
| Constants          | `UPPER_SNAKE_CASE` | `API_BASE_URL`                    |
| Interfaces & Types | `PascalCase`       | `LoginCredentials`, `ApiResponse` |

> **Do not prefix interfaces with `I`.**

❌ Bad

```ts
interface ILoginCredentials {}
```

✅ Good

```ts
interface LoginCredentials {}
```

---

# 📚 Learn More

Useful resources for working with this project:

- **Next.js Documentation** – Learn about Next.js features and APIs.
- **Next.js App Router Documentation** – Learn more about the App Router architecture used in this project.

---

# ✅ Contribution Checklist

Before opening a Pull Request, ensure you have:

- [ ] Pulled the latest changes from `staging`
- [ ] Created a feature branch
- [ ] Removed unused imports and variables
- [ ] Followed the project folder structure
- [ ] Used TanStack Query for server state
- [ ] Used Redux Toolkit only for global UI state
- [ ] Avoided API calls inside components
- [ ] Added proper loading/error states
- [ ] Followed naming conventions
- [ ] Tested your changes locally
