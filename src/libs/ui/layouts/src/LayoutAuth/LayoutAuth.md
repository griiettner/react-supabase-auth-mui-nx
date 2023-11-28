# `LayoutAuth` Component Documentation

## Overview

`LayoutAuth` is a React component designed to standardize the layout for authentication pages such as login and registration. It supports custom child components, dynamic titles, button text, and optional navigation links, offering a flexible and responsive design.

## Features

- **Custom Child Components**: Integrates any custom child components into the layout.
- **Dynamic Content**: Allows for custom titles and button text, with defaults provided.
- **API Integration**: Enables API function execution on form submission.
- **Optional Links**: Supports adding left and right navigation links for additional user guidance.
- **Responsive Design**: Ensures a consistent look and feel across different devices.

## Props

- `children: React.ReactNode` - The components to be rendered inside the layout.
- `title: string` (optional) - Title displayed at the top. Defaults to a pre-defined title if not provided.
- `buttonText: string` (optional) - Text for the submission button. Defaults to a pre-defined text if not provided.
- `fetchApi: function` (optional) - API function called on form submission.
- `linkLeftLabel: string` (optional) - Label for the left link. Defaults to a pre-defined label if not provided.
- `linkLeftPath: string` (optional) - URL path for the left link.
- `linkRightLabel: string` (optional) - Label for the right link. Defaults to a pre-defined label if not provided.
- `linkRightPath: string` (optional) - URL path for the right link.

## Usage Examples

### Basic Usage

```jsx
<LayoutAuth
  title="Sign In"
  buttonText="Login"
  fetchApi={apiLogin}
>
  {/* Place custom child components here */}
</LayoutAuth>
```

### With Optional Navigation Links
```jsx
<LayoutAuth
  title="Sign In"
  buttonText="Login"
  fetchApi={apiLogin}
  linkLeftLabel="Forgot password?"
  linkLeftPath="/forgot-password"
  linkRightLabel="Register"
  linkRightPath="/register"
>
  {/* Place custom child components here */}
</LayoutAuth>
```

### Example with Custom Form Fields
```jsx
<LayoutAuth
  title="Sign In"
  buttonText="Login"
  fetchApi={apiLogin}
  linkLeftLabel="Forgot password?"
  linkLeftPath="/forgot-password"
  linkRightLabel="Register"
  linkRightPath="/register"
>
  <TextInput label="Username" />
  <TextInput label="Password" type="password" />
</LayoutAuth>

```

### Best Practices

- **Consistent Styling**: Maintain visual coherence by using consistent styling for child components.
- **Error Handling**: Implement proper error handling for the fetchApi function to give user feedback.
- **Accessibility**: Ensure all form elements and links are accessible, with appropriate labels and ARIA attributes.

