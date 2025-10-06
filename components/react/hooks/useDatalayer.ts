import { useCallback } from 'react';

type DataLayerEvent = Record<string, any>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/**
 * Custom hook to push events to the global dataLayer array (e.g., for Google Tag Manager).
 */
export function useDatalayer() {
  const pushToDataLayer = useCallback((event: DataLayerEvent) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(event);
    }
  }, []);

  return { pushToDataLayer };
}

export default useDatalayer;
