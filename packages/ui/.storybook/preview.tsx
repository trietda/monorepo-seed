import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from '@storybook/addon-docs/blocks';

const { window: globalWindow } = global;
export const getPreferredColorScheme = () => {
  if (!globalWindow || !globalWindow.matchMedia) return 'light';

  const isDarkThemePreferred = globalWindow.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  if (isDarkThemePreferred) return 'dark';

  return 'light';
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#333' },
        light: { name: 'Light', value: '#F7F9F2' },
        ios: {
          name: 'iOS',
          value: 'url(/images/backgrounds/ios.jpg) left top / cover',
        },
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
