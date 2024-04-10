import { useRef, useState, MouseEvent, useEffect } from 'react';

const useTooltip = () => {
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    if (isVisible) {
      document.addEventListener('scroll', handleScroll, { once: true, capture: true });
    }
  }, [handleScroll]);

  const onToggle = (e: MouseEvent<HTMLDivElement>) => {
    if (e.type === 'mouseleave') {
      setIsVisible(false);
      return;
    } else if (e.type === 'click' && isVisible) {
      setIsVisible(false);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.right;

    const contentHeight = tooltipRef.current?.clientHeight
      ? tooltipRef.current?.clientHeight
      : 100;
    const contentWidth = tooltipRef.current?.clientWidth
      ? tooltipRef.current?.clientWidth
      : 100;

    const coordsToSet = {
      left: spaceRight > spaceLeft ? rect.x : rect.x - contentWidth + rect.width,
      top: spaceAbove > spaceBelow ? spaceAbove - contentHeight : spaceAbove + rect.height,
    };

    setCoords(coordsToSet);
    setIsVisible(true);
  };

  return {
    isVisible,
    setIsVisible,
    onToggle,
    coords,
    tooltipRef,
  };
};

export default useTooltip;
