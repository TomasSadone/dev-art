import { useEffect, useMemo } from 'react';

const useEyeDropper = () => {
  const isSupported = typeof window !== 'undefined' && 'EyeDropper' in window;

  // @ts-ignore
  //because eyedropper types are not available yet
  const eyeDropper = useMemo(() => isSupported && new EyeDropper(), []);
  let controller: AbortController | null;

  const open = async (): Promise<{ sRGBHex: string }> => {
    if (!isSupported)
      throw new Error(
        `You can't open the eye dropper because it isn't supported by this browser`,
      );
    controller = new AbortController();
    try {
      return await eyeDropper.open({ signal: controller.signal });
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const close = () => {
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  return { open, close, isSupported };
};

export default useEyeDropper;
