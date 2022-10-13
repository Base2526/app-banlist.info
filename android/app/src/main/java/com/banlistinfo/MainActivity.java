package com.banlistinfo;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

public class MainActivity extends ReactActivity {

  private static final String TAG = MainActivity.class.getName();



  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "banlistinfo";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }


  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // https://stackoverflow.com/questions/10962344/how-to-save-data-in-an-android-app
    // Get from the SharedPreferences
    SharedPreferences settings = getApplicationContext().getSharedPreferences(TAG, 0);
    int SYSTEM_ALERT_WINDOW = settings.getInt("SYSTEM_ALERT_WINDOW", 0);
    if(SYSTEM_ALERT_WINDOW == 0){

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        int hasPermission = ContextCompat.checkSelfPermission(this, Manifest.permission.SYSTEM_ALERT_WINDOW);

        System.out.println("hasPermission :" + hasPermission);
        if (!Settings.canDrawOverlays(this)) {
          // ask for setting
          Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                  Uri.parse("package:" + this.getPackageName()));
          someActivityResultLauncher.launch(intent);
        }
      }
    }
  }

  // You can do the assignment inside onAttach or onCreate, i.e, before the activity is displayed
  ActivityResultLauncher<Intent> someActivityResultLauncher = registerForActivityResult(
      new ActivityResultContracts.StartActivityForResult(),
      new ActivityResultCallback<ActivityResult>() {
        @Override
        public void onActivityResult(ActivityResult result) {
          if (result.getResultCode() == Activity.RESULT_OK) {

//                PERMISSION_GRANTED

            // There are no request codes
//                Intent data = result.getData();
//                doSomeOperations();

            Log.i(TAG, "PERMISSION_GRANTED");
          }else if(result.getResultCode() == Activity.RESULT_CANCELED){
            // PERMISSION_DENIED
            Log.i(TAG, "PERMISSION_DENIED");
          }

          SharedPreferences settings = getApplicationContext().getSharedPreferences(TAG, 0);
          SharedPreferences.Editor editor = settings.edit();
          editor.putInt("SYSTEM_ALERT_WINDOW", 1);

          // Apply the edits!
          editor.apply();
        }
      });
}
