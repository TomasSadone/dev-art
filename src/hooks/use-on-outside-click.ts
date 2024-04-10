import { useEffect } from 'react';

export function useOnOutsideClick(
  refs: React.RefObject<HTMLElement>[],
  onClickOut: () => void,
  deps: React.DependencyList = [],
) {
  useEffect(() => {
    const onClick = ({ target }: any) => {
      const isClickInside = refs.some((ref) => ref.current?.contains(target));
      if (!isClickInside) onClickOut();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, deps);
}
