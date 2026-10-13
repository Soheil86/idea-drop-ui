import {
  HeadContent,
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'
import type { QueryClient } from '@tanstack/react-query'
import Header from '#/components/Header'

type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content:
          'Share, explore and build on the best startup ideas and side hustles ',
      },
      {
        title: 'IdeaDrop - Your Idea Hub',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HeadContent />
      <Header />
      <main className="flex justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <Outlet />
        </div>
      </main>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold  text-gray-800 mb-4">
        404 - Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-lg">
        Oooops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition px-6 py-2 rounded-md"
      >
        Go back home
      </Link>
    </div>
  )
}
