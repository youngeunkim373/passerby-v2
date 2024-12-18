import type { Preview } from "@storybook/react";
import '@/app/globals.css';
import { Global } from "./Global";


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    Global
  ]
};

export default preview;
