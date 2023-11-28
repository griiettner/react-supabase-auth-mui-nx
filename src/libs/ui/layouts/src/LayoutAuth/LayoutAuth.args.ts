import { createElement } from 'react';

const children = createElement(
  'div',
  {
    'data-testid': 'auth-layout-with-children',
  },
  'Test'
);

export const layoutAuthArgs = {
  defaultValues: {
    title: 'auth.login.title',
    buttonText: 'auth.login.submit',
    icon: 'LockOutlinedIcon',
  },
  withChildren: {
    args: {
      children,
    },
  },
  withLinks: {
    args: {
      linkLeftLabel: 'Left Link',
      linkLeftPath: '/left',
      linkRightLabel: 'Right Link',
      linkRightPath: '/right',
    },
  },
  withCustomTitle: {
    args: {
      title: 'Welcome to LayoutAuth!',
    },
  },
  withCustomButtonText: {
    args: {
      buttonText: 'Submit Button',
    },
  },
  withFetchApi: {
    args: {
      fetchApi: () => Promise.resolve({ message: 'Success' }),
    },
  },
  withFetchApiError: {
    args: {
      fetchApi: () => Promise.reject({ message: 'Error', error: 400 }),
    },
  },
};

export const argTypes = {
  title: {
    description: 'The title to display in the layout.',
    table: {
      defaultValue: {
        detail: layoutAuthArgs.defaultValues.title,
        summary: 'auth.login.title',
      },
      type: {
        summary: 'string',
        detail: 'If not provided, a default title is used.',
      },
    },
    control: {
      type: 'text',
    },
  },
  buttonText: {
    description: 'The text to display in the button.',
    table: {
      defaultValue: {
        detail: layoutAuthArgs.defaultValues.buttonText,
        summary: 'auth.login.button',
      },
      type: {
        summary: 'string',
        detail: 'If not provided, a default text is used.',
      },
    },
    control: {
      type: 'text',
    },
  },
  linkLeftLabel: {
    description: 'The text to display in the left link.',
    table: {
      category: 'Links',
      type: {
        summary: 'string',
      },
    },
    control: {
      type: 'text',
    },
  },
  linkLeftPath: {
    description: 'The path to navigate to when the left link is clicked.',
    table: {
      category: 'Links',
      type: {
        summary: 'string',
      },
    },
    control: {
      type: 'text',
    },
  },
  linkRightLabel: {
    description: 'The text to display in the right link.',
    table: {
      category: 'Links',
      type: {
        summary: 'string',
      },
    },
    control: {
      type: 'text',
    },
  },
  linkRightPath: {
    description: 'The path to navigate to when the right link is clicked.',
    table: {
      category: 'Links',
      type: {
        summary: 'string',
      },
    },
    control: {
      type: 'text',
    },
  },
  children: {
    description: 'The content to display in the layout body.',
    table: {
      type: {
        summary: 'React.ReactNode',
      },
    },
    control: {
      type: 'text',
    },
  },
  fetchApi: {
    description: 'The function to call when the form is submitted.',
    table: {
      type: {
        summary: 'function',
      },
    },
  },
};
