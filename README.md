# 💡 IdeaDrop

**Share, explore and build on the best startup ideas and side hustles.**

IdeaDrop is a full-stack web app where users can sign up, post their ideas, browse what others have shared, and manage their own ideas. This repository contains the **frontend**, a type-safe React single-page application.

🔗 **Live demo:** [idea-drop-ui-two.vercel.app](https://idea-drop-ui-two.vercel.app)
🛠️ **Backend API:** [Soheil86/idea-drop-api](https://github.com/Soheil86/idea-drop-api)

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=flat&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## ✨ Features

- **Browse ideas:** a home page with the latest ideas and a full list of all ideas
- **Idea details:** a dedicated page for each idea, with its description and tags
- **Create, edit and delete:** full CRUD for ideas through a REST API
- **User accounts:** register, log in and log out
- **Ownership rules:** edit and delete controls are only shown to the author of an idea
- **Persistent sessions:** users stay logged in across page reloads through a silent token refresh
- **Friendly 404 page** and a responsive layout styled with Tailwind CSS

## 🧰 Built With

| Technology | Purpose |
|---|---|
| **React** (via **Vite**) | UI library and a fast development and build toolchain |
| **TanStack Router** | Type-safe, file-based routing with route loaders |
| **TanStack Query** | Server-state management: caching, background refetching and mutations |
| **Axios** | HTTP client with interceptors for authentication |
| **TypeScript** | End-to-end type safety in strict mode |
| **Tailwind CSS v4** | Utility-first styling |
| **Vercel** | Hosting and continuous deployment |

## 🧠 Technical Highlights

### Authentication with access and refresh tokens
- The short-lived **JWT access token** is kept **in memory only**, not in `localStorage`, which reduces exposure to XSS attacks.
- The long-lived **refresh token** lives in an **HTTP-only cookie** that JavaScript cannot read, and it is sent automatically with `withCredentials`.
- An **Axios request interceptor** attaches `Authorization: Bearer <token>` to every request automatically.
- An **Axios response interceptor** catches `401 Unauthorized` responses, gets a new access token, and **retries the original request transparently**, so the user never notices.
- On app start, the `AuthProvider` restores the session by calling the refresh endpoint.

### Data loading before render
Route **loaders** call `queryClient.ensureQueryData(...)`, so data is fetched **before** a page renders. Components then read the same cache with `useSuspenseQuery`. This means:
- no loading spinners or `if (loading)` checks inside components
- revisiting a page is **instant**, because data comes from the cache
- links **preload data on hover** (`defaultPreload: 'intent'`)

The `QueryClient` is passed to every loader through **router context**, so there is a single shared cache.

### Type-safe routing
TanStack Router generates the route tree from the file system, so links and route params are checked by TypeScript. A typo in `<Link to="...">` is a compile-time error, not a broken link in production.

## 📁 Project Structure

```
src/
├── api/            # API functions (ideas, auth) built on the Axios instance
├── components/     # Reusable UI components (Header, IdeaCard)
├── context/        # AuthContext: the current user and access token
├── lib/
│   ├── axios.ts    # Axios instance and auth interceptors
│   └── authToken.ts# In-memory access token storage
├── routes/         # File-based routes (TanStack Router)
│   ├── __root.tsx          # Root layout, head tags, 404 page
│   ├── index.tsx           # Home page: latest ideas
│   ├── (auth)/             # Login and register pages (route group)
│   └── ideas/
│       ├── index.tsx       # All ideas
│       ├── new/            # Create an idea
│       └── $ideaId/        # Idea details and edit page
├── types.ts        # Shared TypeScript types
└── main.tsx        # App entry: QueryClient, router and providers
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or later
- The [IdeaDrop API](https://github.com/Soheil86/idea-drop-api) running locally or deployed

### Installation

```bash
git clone https://github.com/Soheil86/idea-drop-ui.git
cd idea-drop-ui
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

### Run

```bash
npm run dev      # start the dev server at http://localhost:3000
npm run build    # create a production build
npm run preview  # preview the production build
npm run lint     # run ESLint
npm run format   # format with Prettier and fix lint issues
```

## 👤 Author

**Soheil Ghanbari**
GitHub: [@Soheil86](https://github.com/Soheil86)

If you have feedback or would like to get in touch, feel free to open an issue or reach out through GitHub.
