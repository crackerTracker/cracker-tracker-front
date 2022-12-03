import {
  defaultLongRestMinutes,
  defaultRestMinutes,
  pomoRestSettings,
  RestMinutesType,
} from 'config/pomoconf';

export const getRestSettings = (): RestMinutesType => {
  const restSettingsItem = localStorage.getItem(pomoRestSettings);

  if (restSettingsItem) {
    return JSON.parse(restSettingsItem);
  }

  return { short: defaultRestMinutes, long: defaultLongRestMinutes };
};

export const formatInputMinutes = (val?: number) => `${val} мин`;
