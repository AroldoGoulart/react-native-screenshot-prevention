import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-screenshot-prevention' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ScreenshotPrevention = NativeModules.ScreenshotPrevention
  ? NativeModules.ScreenshotPrevention
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return ScreenshotPrevention.multiply(a, b);
}
