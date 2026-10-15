interface ConnectionHints {
  effectiveType?: string;
  saveData?: boolean;
}

interface NavigatorWithHints extends Navigator {
  connection?: ConnectionHints;
  deviceMemory?: number;
}

export interface DevicePerformanceProfile {
  isCoarsePointer: boolean;
  isLowEndDevice: boolean;
  shouldSkipIntroVideo: boolean;
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
    shouldSkipIntroVideo:
      connection?.saveData === true || effectiveType === 'slow-2g' || effectiveType === '2g',
  };
};
