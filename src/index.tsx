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

// private
const commonAddScreenshotListener = (listener: () => void): Unsubscribe => {
  const eventSubscription = detectorEventEmitter.addListener(
    EventsName.UserDidTakeScreenshot,
    () => listener(),
    {}
  );

  return () => {
    eventSubscription.remove();
  };
};

// private
const getListenersCount = (): number => {
  return (
    // React Native 0.64+
    // @ts-ignore
    detectorEventEmitter.listenerCount?.(EventsName.UserDidTakeScreenshot) ??
    // React Native < 0.64
    // @ts-ignore
    detectorEventEmitter.listeners?.(EventsName.UserDidTakeScreenshot).length ??
    0
  );
};

// @IOS only
export const addScreenshotListener = Platform.select<
  (listener: () => void) => Unsubscribe
>
  ({
    default: (): Unsubscribe => () => { },
    ios: commonAddScreenshotListener,
    android: (listener: () => void): Unsubscribe => {
      if (getListenersCount() === 0) {
        ScreenshotPrevention.startScreenshotDetection();
      }

      const unsubscribe: Unsubscribe = commonAddScreenshotListener(listener);

      return () => {
        unsubscribe();

        if (getListenersCount() === 0) {
          ScreenshotPrevention.stopScreenshotDetection();
        }
      };
    },
  });

// @Android only
export function allowScreenCapture(): void {
  return ScreenshotPrevention.allowScreenCapture()
}
// @Android only
export function preventScreenCapture(): void {
  return ScreenshotPrevention.preventScreenCapture()
}

