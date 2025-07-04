import type { Meta, StoryObj } from '@storybook/react';
import App from './app';

const meta: Meta<typeof App> = {
  title: 'App',
  component: App,
  tags: ['autodocs'],
};
export default meta;

export const Primary: StoryObj<typeof App> = {
  args: {},
};
