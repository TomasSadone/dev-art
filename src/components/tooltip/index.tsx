import { ReactNode, useRef } from 'react';
import style from './style.module.sass';
import { createPortal } from 'react-dom';
import useTooltip from './use-tooltip';
import { useOnOutsideClick } from '../../hooks/use-on-outside-click';

type Props = {
  children: ReactNode;
  hoverItem: ReactNode;
  trigger: 'click' | 'hover';
};

export const Tooltip = ({ children, hoverItem, trigger }: Props) => {
  const { coords, tooltipRef, onToggle, isVisible, setIsVisible } = useTooltip();
  const hoverItemRef = useRef(null);
  const id = Math.random.toString();

  trigger === 'click' &&
    useOnOutsideClick([tooltipRef, hoverItemRef], () => setIsVisible(false));

  return (
    <>
      <div
        ref={hoverItemRef}
        id={id}
        className={style.hoverItem}
        onMouseEnter={trigger === 'hover' ? onToggle : undefined}
        onMouseLeave={trigger === 'hover' ? onToggle : undefined}
        onClick={trigger === 'click' ? onToggle : undefined}
      >
        {hoverItem}
        {createPortal(
          <div
            id={id}
            ref={tooltipRef}
            className={`${style.tooltip} ${isVisible && style.show} `}
            style={{ ...coords }}
          >
            {children}
          </div>,
          document.body,
        )}
      </div>
    </>
  );
};
