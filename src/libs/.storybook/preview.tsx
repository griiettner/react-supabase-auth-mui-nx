import { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on.*', handles: ['mouseover', 'click .btn'] },
  },
};

export default preview;
