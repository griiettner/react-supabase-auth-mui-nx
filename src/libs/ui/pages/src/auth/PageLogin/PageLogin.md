# PageLogin Component

The `PageLogin` component is a user interface component designed for authentication purposes, specifically for logging into an application.

## Overview

`PageLogin` renders a form with an email input, a password input, and a "remember me" checkbox. It is designed to capture user credentials for login processes.

## Function Signature

```typescript
function PageLogin(): JSX.Element
```

## Behavior

- **Email Input**: Autofocused on render. Requires a valid email.
- **Password Input**: Requires input. Hides the user's input for privacy.
- **Remember Me Checkbox**: Optional, allows users to be remembered on the device.

## Example Usage

```jsx
import React from 'react';
import PageLogin from './PageLogin';

function App() {
  return <PageLogin />;
}
```

## Notes

- The component utilizes `useTranslation` from `react-i18next` for internationalization.
- `AUTH_EMAIL` and `AUTH_PASSWORD` constants from `@config` are used for `name` and `id` attributes.
- Dependencies include `@mui/material` and `react-i18next`.
