import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig, loadEnv } from 'vite';
import type { AddonOptionsBabel } from '@storybook/addon-coverage';

import tsConfig from '../../../tsconfig.base.json';

interface PathMap {
  [key: string]: string;
}

function getPaths(): PathMap {
  const { paths } = tsConfig.compilerOptions as any;
  const result: PathMap = {};
  Object.keys(paths).forEach((key) => {
    const value = paths[key][0];
    const keyWithoutStar = key.replace('/*', '');
    result[keyWithoutStar] = path.join(process.cwd(), value.replace('/*', ''));
  });
  result['~'] = path.join(process.cwd(), 'node_modules');
  return result;
}

const coverageConfig: AddonOptionsBabel = {
  istanbul: {
    include: ['src/**/src/**'],
    exclude: ['src/**/src/**/*.test.tsx'],
    excludeNodeModules: true,
  }
};

const config: StorybookConfig = {
  stories: ['../**/src/**/*.mdx', '../**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-coverage',
      options: {
        ...coverageConfig,
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  viteFinal: async (config) => {
    const env = loadEnv('', process.cwd(), '');
    const newConfig = {
      plugins: [nxViteTsPaths()],
      define: { 'process.env': env },
      resolve: {
        alias: {
          ...getPaths(),
        },
      },
    };
    return mergeConfig(config, newConfig);
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
