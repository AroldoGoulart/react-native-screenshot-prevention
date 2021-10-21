#import "ScreenshotPrevention.h"

@implementation ScreenshotPrevention

RCT_EXPORT_MODULE()
- (NSArray<NSString *> *)supportedEvents {
    return @[@"UIApplicationUserDidTakeScreenshotNotification"];
}

// React Method
- (void)startObserving {
    NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
    [
      center addObserver:self
      selector:@selector(sendEvent:)
      name:UIApplicationUserDidTakeScreenshotNotification
      object:nil
    ];
}

// React Method
- (void)stopObserving {
    [
      [NSNotificationCenter defaultCenter] removeObserver:self];
}

// React Method
- (void)sendEvent:(NSNotification *)notification {
    [
      self sendEventWithName:notification.name
      body:nil
    ];
}

@end
