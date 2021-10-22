import { NativeModules, Platform, NativeEventEmitter } from 'react-native';
import { EventsName, Unsubscribe } from './types';

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


const detectorEventEmitter = new NativeEventEmitter(ScreenshotPrevention);

// @IOS only
export const addScreenshotListener = (listener: Unsubscribe): Unsubscribe => {
  if (Platform.OS != 'ios') {
    return () => { }
  }

  const eventSubscription = detectorEventEmitter.addListener(
    EventsName.UserDidTakeScreenshot,
    () => listener(),
    {}
  );

  return () => {
    eventSubscription.remove();
  };
}

// @Android only
export function allowScreenCapture(): void {
  Platform.select({
    android: () => ScreenshotPrevention.allowScreenCapture(),
    default: () => { }
  })
}
// @Android only
export function preventScreenCapture(): void {
  Platform.select({
    android: () => ScreenshotPrevention.allowScreenCapture(),
    default: () => ScreenshotPrevention.preventScreenCapture()
  })
}

