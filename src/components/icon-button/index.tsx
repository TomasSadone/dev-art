import styles from './icon-button.module.sass';
import { AppColors } from '../button';
import cn from 'classnames';
import { Loader } from '../loader';

export const IconButton: React.FC<{
  icon: string;
  onClick?: () => void;
  color?: AppColors;
  isLoading?: boolean;
}> = ({ icon, onClick, color, isLoading }) => (
  <button
    disabled={isLoading}
    onClick={onClick}
    className={cn(styles.button, styles[color || 'default'])}
  >
    {isLoading ? (
      <Loader
        color={color}
        useColor
        className={styles.loader}
      />
    ) : (
      <img
        src={icon}
        alt=''
      />
    )}
  </button>
);
