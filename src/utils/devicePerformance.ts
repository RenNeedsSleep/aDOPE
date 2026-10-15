interface ConnectionHints {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: 'change', listener: () => void) => void;
  removeEventListener?: (type: 'change', listener: () => void) => void;
}

interface NavigatorWithHints extends Navigator {
  connection?: ConnectionHints;
  deviceMemory?: number;
}

export interface DevicePerformanceProfile {
  isCoarsePointer: boolean;
  isLowEndDevice: boolean;
  isSlowConnection: boolean;
}

export const getDevicePerformanceProfile = (): DevicePerformanceProfile => {
  const deviceNavigator = navigator as NavigatorWithHints;
  const connection = deviceNavigator.connection;
  const effectiveType = connection?.effectiveType;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isLowEndDevice =
    (deviceNavigator.hardwareConcurrency > 0 && deviceNavigator.hardwareConcurrency <= 4) ||
    (deviceNavigator.deviceMemory !== undefined && deviceNavigator.deviceMemory <= 4);

  return {
    isCoarsePointer,
    isLowEndDevice,
    isSlowConnection: connection?.saveData === true || effectiveType === 'slow-2g' || effectiveType === '2g',
  };
};

export const subscribeToDevicePerformanceProfile = (onChange: () => void): (() => void) => {
  const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
  const connection = (navigator as NavigatorWithHints).connection;
  coarsePointerQuery.addEventListener('change', onChange);
  connection?.addEventListener?.('change', onChange);

  return () => {
    coarsePointerQuery.removeEventListener('change', onChange);
    connection?.removeEventListener?.('change', onChange);
  };
};
