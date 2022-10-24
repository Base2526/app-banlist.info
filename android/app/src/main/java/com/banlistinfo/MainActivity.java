package com.banlistinfo;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.provider.Settings;
import android.util.Base64;
import android.util.Log;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.apollographql.apollo3.ApolloCall;
import com.apollographql.apollo3.ApolloClient;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import org.devio.rn.splashscreen.SplashScreen;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;

import kotlin.coroutines.Continuation;
import kotlin.coroutines.CoroutineContext;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

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
    SplashScreen.show(this);  // here
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


    ArrayList<Receive> list = new ArrayList<>();

    Receive receive = new Receive();
    receive.setType("PHONE");
    receive.setCreatedAt(new Date());
    receive.setPhoneNumber("0988264820");

    list.add(receive);

//    Log.i(TAG,  ">>> " + String.valueOf(list.contains(receive2))  );

//    ApolloClient apolloClient = ApolloClient.builder()
//            .serverUrl("https://apollo-fullstack-tutorial.herokuapp.com/graphql")
//            .build();
//
//    apolloClient.query(new LaunchesQuery()).execute();

//    AndroidNetworking.post("https://fierce-cove-29863.herokuapp.com/createAnUser")
//            .addBodyParameter("firstname", "Amit")
//            .addBodyParameter("lastname", "Shekhar")
//            .setTag("test")
//            .setPriority(Priority.MEDIUM)
//            .build()
//            .getAsJSONObject(new JSONObjectRequestListener() {
//              @Override
//              public void onResponse(JSONObject response) {
//                // do anything with response
//              }
//              @Override
//              public void onError(ANError error) {
//                // handle error
//              }
//            });



//    (new Utils()).test_apollo(getApplicationContext(), new Continuation<Object>() {
//      @Override
//      public void resumeWith(@NonNull Object o) {
//        Log.i(TAG, "");
//      }
//
//      @NonNull
//      @Override
//      public CoroutineContext getContext() {
//        Log.i(TAG, "");
//        return null;
//      }
//    });

//    (new Utils()).test_apollo( getContext(), new Continuation<Object>() {
//      @Override
//      public void resumeWith(@NonNull Object o) {
//        Log.i(TAG, "");
//      }
//
//      @NonNull
//      @Override
//      public CoroutineContext getContext() {
//        Log.i(TAG, "");
//        return null;
//      }
//    });
    Log.i(TAG, "");



    ////////////////
    // First, create an `ApolloClient`
// Replace the serverUrl with your GraphQL endpoint
//    ApolloClient apolloClient = ApolloClient.builder()
//            .serverUrl("https://apollo-fullstack-tutorial.herokuapp.com/graphql")
//            .build();

// Then enqueue your query
    /*
    apolloClient.query(new LaunchesQuery())
            .enqueue(new ApolloCall.Callback<LaunchesQuery.Data>() {
              @Override
              public void onResponse(@NotNull Response<LaunchesQuery.Data> response) {
//                Log.e("Apollo", "Launch site: " + response.getData().launch.site);
              }

              @Override
              public void onFailure(@NotNull ApolloException e) {
                Log.e("Apollo", "Error", e);
              }
            });

    */
    ///////////////


    PackageInfo info;
    try {
      info = getPackageManager().getPackageInfo("com.banlistinfo", PackageManager.GET_SIGNATURES);
      for (Signature signature : info.signatures) {
        MessageDigest md;
        md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        String something = new String(Base64.encode(md.digest(), 0));
        //String something = new String(Base64.encodeBytes(md.digest()));
        Log.e("hash key", something);
      }
    } catch (PackageManager.NameNotFoundException e1) {
      Log.e("name not found", e1.toString());
    } catch (NoSuchAlgorithmException e) {
      Log.e("no such an algorithm", e.toString());
    } catch (Exception e) {
      Log.e("exception", e.toString());
    }


    ///////////////////



    ///////////////////
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
      }
      );
}
