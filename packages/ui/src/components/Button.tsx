import { clsx } from 'clsx';
import styles from './button.module.css';

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: ButtonSize;
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

// Demo for CSS module
// create map for size and css module
const sizeStyles = {
  small: styles.buttonSmall,
  medium: styles.buttonMedium,
  large: styles.buttonLarge,
};

export function Button(props: ButtonProps) {
  const {
    primary = false,
    backgroundColor,
    size = ButtonSize.Medium,
    label,
    ...otherProps
  } = props;
  return (
    <button
      type="button"
      className={clsx(
        styles.button,
        sizeStyles[size],
        primary
          ? 'text-white bg-[#1ea7fd]'
          : 'shadow-[0px_0px_0px_1px_rgba(0,0,0,0.15)] text-[#333] bg-transparent',
      )}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...otherProps}
    >
      {label}
    </button>
  );
};
