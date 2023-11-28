# React + Auth Supabase + NX Monorepo

## Description

This project serves as a starter kit for React applications utilizing Supabase for authentication, structured within an NX Monorepo. It's designed for quick scalability and integration with other frameworks like Angular and Vue. To ensure easy portability, all functions related to Supabase are located in the `libs/utils` folder. React hooks are used as wrappers around these utility functions, maintaining a clean and framework-agnostic core.

## Features

- React framework with Supabase authentication
- NX Monorepo setup for scalable architecture
- `pnpm` for efficient and fast package management
- Isolated Supabase functions in `libs/utils` for easy portability
- React hooks as interfaces to utility functions

## Getting Started

### Prerequisites

- Ensure you have [pnpm](https://pnpm.io/) installed as the project uses `pnpm` instead of `npm`.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/griiettner/react-supabase-auth-mui-nx.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your Supabase project and obtain the necessary API keys.

### Configuration

- Update the `.env` file with your Supabase credentials and other environment-specific configurations.

### Running the Application

- To start the application, run:
```bash
pnpm start
```

- For Storybook, run:
```bash
pnpm storybook:dev
```

### Project Structure
- `libs/utils`: Contains all Supabase-related functions for authentication and database operations, ensuring ease of transferability to other frameworks.
- `hooks`: React hooks acting as interfaces to the utility functions in `libs/utils`.

### Contributing
Contributions to improve the starter kit are welcome. Please follow the standard procedure:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -am 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

### License
Distributed under the MIT.
