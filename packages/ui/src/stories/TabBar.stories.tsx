import { TabBar, TabGroup, TabItem, TabButton, Orientation } from '@/components/TabBar';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Plus, Search, Settings, User } from 'lucide-react';
import React from 'react';
import { fn } from 'storybook/test';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  subcomponents: {
    TabGroup,
    TabItem,
    TabButton,
  },
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  },
  args: {
    onTabClick: fn(),
  },
  globals: {
    viewport: {
      value: 'mobile2',
    },
    backgrounds: {
      value: 'ios',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

export const Uncontrolled: Story = {
  render: (args) => (
    <TabBar {...args} defaultActiveTabId="home">
      <TabGroup>
        <TabItem id="home" label="Home" icon={<Home />} />
        <TabItem id="search" label="Search" icon={<Search />} />
      </TabGroup>
      <TabButton icon={<Plus />} onClick={fn()} />
    </TabBar>
  ),
  tags: ['autodocs'],
};

export const Controlled: Story = {
  render: function Render(args) {
    const [activeTabId, setActiveTabId] = React.useState('home');
    return (
      <TabBar {...args} activeTabId={activeTabId} onTabClick={setActiveTabId}>
        <TabGroup>
          <TabItem id="home" label="Home" icon={<Home />} />
          <TabItem id="search" label="Search" icon={<Search />} />
        </TabGroup>
        <TabButton icon={<Plus />} onClick={fn()} />
      </TabBar>
    );
  },
  args: {
    activeTabId: undefined, // Force controlled behavior through state
  },
};

export const SingleGroup: Story = {
  render: function Render(args) {
    return (
      <TabBar {...args} defaultActiveTabId="home">
        <TabGroup>
          <TabItem id="home" label="Home" icon={<Home />} />
          <TabItem id="search" label="Search" icon={<Search />} />
          <TabItem id="profile" label="Profile" icon={<User />} />
        </TabGroup>
      </TabBar>
    );
  },
};

export const MultipleGroups: Story = {
  render: function Render(args) {
    return (
      <TabBar {...args} defaultActiveTabId="home">
        <TabGroup>
          <TabItem id="home" label="Home" icon={<Home />} />
          <TabItem id="search" label="Search" icon={<Search />} />
        </TabGroup>
        <TabGroup>
          <TabItem id="profile" label="Profile" icon={<User />} />
          <TabItem id="settings" label="Settings" icon={<Settings />} />
        </TabGroup>
      </TabBar>
    );
  },
};

export const WithTintColors: Story = {
  render: function Render(args) {
    return (
      <TabBar {...args} defaultActiveTabId="search" tintColor="#CC4525">
        <TabGroup>
          <TabItem id="home" label="Home" icon={<Home />} />
          <TabItem id="search" label="Search" icon={<Search />} />
          <TabItem id="profile" label="Profile" icon={<User />} />
        </TabGroup>
      </TabBar>
    );
  },
};

export const VerticalBarWithHorizontalItems: Story = {
  render: function Render(args) {
    return (
      <TabBar
        {...args}
        defaultActiveTabId="search"
        orientation={Orientation.Vertical}
        itemsOrientation={Orientation.Horizontal}
      >
        <TabGroup>
          <TabItem id="home" label="Home" icon={<Home />} />
          <TabItem id="search" label="Search" icon={<Search />} />
          <TabItem id="profile" label="Profile" icon={<User />} />
        </TabGroup>
      </TabBar>
    );
  },
  parameters: {
    docs: {
      story: {
        iframeHeight: 300,
      },
    },
  },
};
