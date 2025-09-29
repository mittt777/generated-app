# Zenith Subscription Platform

A visually stunning, multi-tenant subscription billing SaaS platform built on Cloudflare Workers.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mittt777/generated-app)

## About The Project

Zenith is a modern, multi-tenant SaaS platform designed for subscription billing management. It provides a stunning, user-friendly interface for both end-users and administrators. The platform allows organizations (tenants) to sign up, choose from various subscription tiers, and manage their billing and services through a dedicated dashboard.

The frontend is built for visual excellence, featuring a minimalist design with a professional color palette, smooth animations, and a responsive layout that works flawlessly across all devices. The backend leverages Cloudflare Workers for high performance and scalability, with data persistence managed through Cloudflare's Durable Objects.

### Key Features

*   **Multi-Tenancy:** Securely manage multiple organizations from a single platform instance.
*   **Subscription Management:** Easily handle different subscription tiers, upgrades, and downgrades.
*   **Modern Dashboard:** An intuitive and beautiful dashboard for users to manage their account, billing, and settings.
*   **Visually Stunning UI:** Crafted with obsessive attention to visual excellence, featuring a clean design, smooth animations, and a professional aesthetic.
*   **High-Performance Backend:** Built on Cloudflare Workers for a fast, scalable, and globally distributed backend.
*   **Responsive Perfection:** Flawless user experience across desktops, tablets, and mobile devices.

## Technology Stack

This project is built with a modern, robust, and high-performance technology stack:

*   **Frontend:**
    *   [React](https://reactjs.org/)
    *   [Vite](https://vitejs.dev/)
    *   [React Router](https://reactrouter.com/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [shadcn/ui](https://ui.shadcn.com/)
    *   [Framer Motion](https://www.framer.com/motion/) for animations
    *   [Zustand](https://zustand-demo.pmnd.rs/) for state management
    *   [Lucide React](https://lucide.dev/) for icons
    *   [Recharts](https://recharts.org/) for data visualization
*   **Backend:**
    *   [Cloudflare Workers](https://workers.cloudflare.com/)
    *   [Hono](https://hono.dev/)
    *   [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) for stateful coordination and storage
*   **Tooling:**
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Bun](https://bun.sh/)
    *   [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/docs/installation) installed on your machine.
*   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated:
    ```sh
    bun install -g wrangler
    wrangler login
    ```

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/zenith-saas-platform.git
    cd zenith-saas-platform
    ```
2.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To start the local development server, which includes both the Vite frontend and the local Cloudflare Worker, run the following command:

```sh
bun dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will hot-reload on changes, and the worker will restart automatically.

## Deployment

This application is designed for easy deployment to the Cloudflare network.

1.  **Build the application:**
    This command bundles the frontend and prepares the worker for deployment.
    ```sh
    bun run build
    ```
2.  **Deploy to Cloudflare:**
    This command publishes your application to your Cloudflare account.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mittt777/generated-app)

## Project Structure

*   `src/`: Contains the frontend React application.
    *   `pages/`: Top-level route components.
    *   `components/`: Reusable UI components, including shadcn/ui elements.
    *   `lib/`: Utility functions and API client.
    *   `store/`: Zustand state management stores.
*   `worker/`: Contains the backend Hono application running on Cloudflare Workers.
    *   `index.ts`: The main worker entry point.
    *   `user-routes.ts`: Application-specific API routes.
    *   `entities.ts`: Durable Object entity definitions.
*   `shared/`: TypeScript types and constants shared between the frontend and backend.
*   `wrangler.jsonc`: Configuration file for the Cloudflare Worker.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.