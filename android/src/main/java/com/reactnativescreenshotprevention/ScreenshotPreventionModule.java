package com.reactnativescreenshotprevention;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = ScreenshotPreventionModule.NAME)
public class ScreenshotPreventionModule extends ReactContextBaseJavaModule {
    public static final String NAME = "ScreenshotPrevention";

    public ScreenshotPreventionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    private void flagChange(final boolean mount) {
        final Activity activity = getCurrentActivity();

        if(activity != null){
            activity.runOnUiThread(() -> {
                mounted = mount;
                if(mount){
                    activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
                }
                else{
                    activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
                }
            });
        }
    }

    @ReactMethod
    public void allowScreenCapture() {
      Log.d("ScreenshotPrevention:", "LOCK DEVICE FOR SCREENSHOT");
      flagChange(false);
    }

    @ReactMethod
    public void preventScreenCapture(){
      Log.d("ScreenshotPrevention:", "UNLOCK DEVICE FOR SCREENSHOT");
      flagChange(true);
    }
}
