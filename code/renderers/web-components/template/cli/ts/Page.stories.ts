import type { Meta, StoryObj } from '@storybook/web-components';

import type { PageProps } from './Page';
import { Page } from './Page';
import * as HeaderStories from './Header.stories';

const meta: Meta<PageProps> = {
  title: 'Example/Page',
  render: (args) => Page(args),
};

export default meta;
type Story = StoryObj<PageProps>;

export const LoggedIn: Story = {
  args: {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
    ...HeaderStories.LoggedIn.args,
  },
};

export const LoggedOut: Story = {
  args: {
    ...HeaderStories.LoggedOut.args,
  },
};
