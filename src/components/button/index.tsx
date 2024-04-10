import { ButtonHTMLAttributes } from 'react';
import styles from './style.module.sass';
import { Loader } from '../loader';

export type AppColors = 'orange' | 'green' | 'red' | 'blue';

export interface IAppButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  color: AppColors | 'white';
  icon?: string;
  endIcon?: string;
  secondary?: boolean;
  stroke?: boolean;
  text?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}
export const AppButton = ({
  title,
  color,
  icon,
  endIcon,
  secondary,
  stroke,
  text,
  isLoading,
  children,
  ...buttonProps
}: IAppButtonProps) => (
  <button
    disabled={isLoading}
    className={`${styles.button} ${styles[color]} ${
      secondary && styles.secondary
    } ${stroke && styles.stroke} ${text && styles.text}`}
    {...buttonProps}
  >
    {icon && (
      <img
        className={styles.icon_container}
        src={icon}
        alt=''
      />
    )}
    {title}
    {children}
    {endIcon && (
      <div className={styles.end_icon_container}>
        <img
          src={endIcon}
          alt=''
        />
      </div>
    )}
    {isLoading && (
      <Loader
        color={stroke || text ? undefined : color}
        useColor={secondary}
      />
    )}
  </button>
);
