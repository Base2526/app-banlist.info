package com.banlistinfo;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.AppOpsManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.TextView;

import static android.content.Context.WINDOW_SERVICE;
import static androidx.core.app.ActivityCompat.startActivityForResult;

import java.lang.reflect.Method;
import java.util.List;

public class Window {

    // declaring required variables
    private Context context;
    private View mView;
    private WindowManager.LayoutParams mParams;
    private WindowManager mWindowManager;
    private LayoutInflater layoutInflater;

    public static int ACTION_MANAGE_OVERLAY_PERMISSION_REQUEST_CODE = 5469;

    private static final String TAG = Window.class.getName();

    public Window(Context context){
        this.context=context;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // set the layout parameters of the window
            mParams = new WindowManager.LayoutParams(
                    // Shrink the window to wrap the content rather
                    // than filling the screen
                    WindowManager.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams.WRAP_CONTENT,
                    // Display it on top of other application windows
                    WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                    // Don't let it grab the input focus
                    WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                    // Make the underlying application window visible
                    // through any transparent parts
                    PixelFormat.TRANSLUCENT);

        }
        // getting a LayoutInflater
        layoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        // inflating the view with the custom layout we created
        mView = layoutInflater.inflate(R.layout.popup_window, null);
        // set onClickListener on the remove button, which removes
        // the view from the window
        mView.findViewById(R.id.window_close).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                close();
            }
        });


        mView.findViewById(R.id.window_open).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                ((WindowManager)context.getSystemService(WINDOW_SERVICE)).removeView(mView);
                // invalidate the view
                mView.invalidate();

                Intent i = new Intent(
                    Intent.ACTION_VIEW , Uri.parse("banlistapp://")
                );
                i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(i);
            }
        });



        // Define the position of the
        // window within the screen
        mParams.gravity = Gravity.CENTER;
        mWindowManager = (WindowManager)context.getSystemService(WINDOW_SERVICE);
    }

    public void open(String text) {

        try {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {


//                if(!Settings.canDrawOverlays(this.context)){
//                    // ask for setting
//                    Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
//                            Uri.parse("package:" + this.context.getPackageName()));
//                    startActivityForResult((Activity) this.context, "1234");
//                }
//                autoSetOverlayPermission(this.context, "com.banlistinfo");
//                if (!Settings.canDrawOverlays( this.context)) {
//
//
//                    Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + this.context.getPackageName()));
////                    startActivityForResult(intent, 0);
//
//                    startActivityForResult(intent, ACTION_MANAGE_OVERLAY_PERMISSION_REQUEST_CODE);
//                }
            }
            // check if the view is already
            // inflated or present in the window
            if(mView.getWindowToken()==null) {
                if(mView.getParent()==null) {

                    TextView titleText = (TextView)mView.findViewById(R.id.titleText);

                    titleText.setText(text);

                    mWindowManager.addView(mView, mParams);
                }
            }
        } catch (Exception e) {
            Log.d("Error1",e.toString());
        }

    }

    public void close() {

        try {

            // remove the view from the window
            ((WindowManager)context.getSystemService(WINDOW_SERVICE)).removeView(mView);
            // invalidate the view
            mView.invalidate();
            // remove all views
//            ((ViewGroup)mView.getParent()).removeAllViews();



//            Log.i(TAG, "isAppIsInBackground :" + String.valueOf(Utils.isAppIsInBackground(context)));
//
//
//            Intent i = new Intent(
//                    Intent.ACTION_VIEW , Uri.parse("banlistapp://")
//            );
//            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            context.startActivity(i);

            // the above steps are necessary when you are adding and removing
            // the view simultaneously, it might give some exceptions
        } catch (Exception e) {
            Log.d("Error2",e.toString());
        }
    }

}

