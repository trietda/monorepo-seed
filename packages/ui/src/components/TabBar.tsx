'use client';
import clsx from 'clsx';
import * as React from 'react';

export enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

interface CommonTabProps {
  /** Click event handler */
  onClick?: () => void;
  /** Optional className for styling */
  className?: React.HTMLProps<HTMLElement>['className'];
}

export interface TabItemProps extends CommonTabProps {
  /** Unique identifier for the tab */
  id: string;
  /** Text label to display under the icon */
  label: string;
  /** Icon component to display */
  icon: React.ReactNode;
  /** Whether this tab is currently active */
  isActive?: boolean;
  /** Optional tint color for active state background */
  tintColor?: string;
  /** Orientation of the tab item - defaults to vertical */
  orientation?: Orientation;
  /** Width in pixels when in horizontal mode - defaults to 144px */
  width?: number;
}

export interface TabButtonProps extends CommonTabProps {
  /** Icon component to display */
  icon: React.ReactNode;
  /** Optional text label under the icon */
  label?: string;
}

export interface TabGroupProps extends CommonTabProps {
  /** TabItem components that belong to this group */
  children: React.ReactNode;
  /** Handler for when a tab in this group is clicked */
  onTabClick?: (tabId: string) => void;
  /** Current active tab ID */
  activeTabId?: string | null;
  /** Default tint color for active tab items background */
  tintColor?: string;
  /** Orientation of the tab group */
  orientation?: Orientation;
  /** Default orientation for tab items in this group */
  itemsOrientation?: Orientation;
  /** Default width in pixels for all nested horizontal TabItems - defaults to 144px */
  itemsWidth?: number;
}

export interface TabBarProps extends CommonTabProps {
  /** TabGroup and Button components to display */
  children: React.ReactNode;
  /** Handler for when a tab is clicked */
  onTabClick?: (tabId: string) => void;
  /** Controlled active tab ID (for controlled mode) */
  activeTabId?: string | null;
  /** Initial active tab ID (for uncontrolled mode) */
  defaultActiveTabId?: string;
  /** Default tint color for active tab items background */
  tintColor?: string;
  /** Orientation of the tab bar */
  orientation?: Orientation;
  /** Default orientation for all nested TabItems */
  itemsOrientation?: Orientation;
  /** Default width in pixels for all nested horizontal TabItems - defaults to 144px */
  itemsWidth?: number;
}

function isTabGroup(
  child: React.ReactNode,
): child is React.ReactElement<TabGroupProps> {
  return React.isValidElement(child) && child.type === TabGroup;
}

function isTabItem(
  child: React.ReactNode,
): child is React.ReactElement<TabItemProps> {
  return React.isValidElement(child) && child.type === TabItem;
}

export function TabBar(props: TabBarProps) {
  const {
    children,
    onTabClick = () => {},
    activeTabId: controlledActiveId,
    defaultActiveTabId,
    tintColor,
    orientation = Orientation.Horizontal,
    itemsOrientation = Orientation.Vertical,
    itemsWidth = 144,
    className,
  } = props;
  const [internalActiveId, setInternalActiveId] = React.useState(
    defaultActiveTabId ?? null,
  );
  const isControlled = controlledActiveId !== undefined;
  const activeTabId = isControlled ? controlledActiveId : internalActiveId;

  const handleTabClick = (tabId: string) => {
    if (!isControlled) {
      setInternalActiveId(tabId);
    }
    onTabClick(tabId);
  };

  return (
    <div
      className={clsx(
        'flex',
        orientation === Orientation.Horizontal
          ? 'flex-row space-x-2'
          : 'flex-col space-y-2',
        className,
      )}
    >
      {React.Children.map(children, (child) => {
        if (isTabGroup(child)) {
          return React.cloneElement(child, {
            onTabClick: handleTabClick,
            activeTabId,
            tintColor,
            orientation,
            itemsOrientation,
            itemsWidth,
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabGroup(
  props: TabGroupProps & Pick<TabBarProps, 'tintColor' | 'itemsOrientation'>,
) {
  const {
    children,
    onTabClick = () => {},
    activeTabId = null,
    tintColor,
    orientation = Orientation.Horizontal,
    itemsOrientation = Orientation.Vertical,
    itemsWidth,
    className,
  } = props;
  return (
    <div
      className={clsx(
        'flex gap-1 overflow-hidden border border-white/20 bg-white/1 p-1 text-black shadow-xl shadow-black/10 backdrop-blur-xs dark:text-neutral-50',
        orientation === Orientation.Horizontal
          ? 'h-14 flex-row rounded-full'
          : 'flex-col rounded-3xl',
        className,
      )}
    >
      {React.Children.map(children, (child) => {
        if (isTabItem(child)) {
          return React.cloneElement(child, {
            onClick: () => onTabClick(child.props.id),
            isActive: child.props.id === activeTabId,
            tintColor: child.props.tintColor ?? tintColor,
            orientation: child.props.orientation ?? itemsOrientation,
            width: child.props.width ?? itemsWidth,
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabItem(props: TabItemProps) {
  const {
    label,
    icon,
    onClick = () => {},
    isActive = false,
    tintColor,
    orientation = Orientation.Vertical,
    width = 144,
  } = props;
  return (
    <button
      className={clsx(
        'relative flex rounded-full transition-[opacity,transform,background-color] duration-200 ease-out',
        isActive ? 'opacity-100' : 'opacity-80',
        isActive && !tintColor && 'bg-white/40',
        orientation === Orientation.Vertical
          ? 'h-full min-h-11.5 w-18 flex-col items-center justify-center'
          : `h-12 items-center px-3`,
      )}
      style={{
        ...(isActive && tintColor ? { backgroundColor: `${tintColor}4a` } : {}),
        ...(orientation === Orientation.Horizontal
          ? { width: `${width}px` }
          : {}),
      }}
      onClick={onClick}
      aria-selected={isActive}
    >
      <div
        className={clsx(
          'flex items-center justify-end transition-transform duration-200 ease-out',
          orientation === Orientation.Vertical ? 'h-6 w-6' : 'mr-1 h-5 w-5',
          isActive && '-translate-y-0.25',
        )}
      >
        {icon}
      </div>
      <span
        className={clsx(
          'font-medium transition-transform duration-200 ease-out',
          orientation === Orientation.Vertical
            ? 'mt-1 text-[10px] leading-3'
            : 'text-xs',
          isActive && '-translate-y-0.25',
        )}
      >
        {label}
      </span>
    </button>
  );
}

export function TabButton(props: TabButtonProps) {
  const { icon, label, onClick, className } = props;
  return (
    <button
      className={clsx(
        'flex aspect-square h-[56px] flex-col items-center justify-center rounded-full bg-white/1 text-black backdrop-blur transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/50 active:bg-white/30 dark:text-neutral-50',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex h-6 w-6 items-center justify-center">{icon}</div>
      {label && (
        <span className="mt-1 text-[10px] leading-3 font-medium">{label}</span>
      )}
    </button>
  );
}

// Keep the namespace exports for backward compatibility
TabBar.TabGroup = TabGroup;
TabBar.TabItem = TabItem;
TabBar.Button = TabButton;