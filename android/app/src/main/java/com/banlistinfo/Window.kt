package com.banlistinfo

import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.net.Uri
import android.os.Build
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.widget.TextView

open class Window(context: Context) {

    // declaring required variables
    private var context: Context? = null
    private var mView: View? = null
    private var mParams: WindowManager.LayoutParams? = null
    private var mWindowManager: WindowManager? = null
    private var layoutInflater: LayoutInflater? = null

    var ACTION_MANAGE_OVERLAY_PERMISSION_REQUEST_CODE = 5469

    private val TAG = Window::class.java.name

    init {
        this.context = context
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // set the layout parameters of the window
            mParams = WindowManager.LayoutParams( // Shrink the window to wrap the content rather
                // than filling the screen
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,  // Display it on top of other application windows
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,  // Don't let it grab the input focus
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,  // Make the underlying application window visible
                // through any transparent parts
                PixelFormat.TRANSLUCENT
            )
        }
        // getting a LayoutInflater
        layoutInflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        // inflating the view with the custom layout we created
        mView = layoutInflater!!.inflate(R.layout.popup_window, null)
        // set onClickListener on the remove button, which removes
        // the view from the window

        mView!!.findViewById<View>(R.id.window_close).setOnClickListener { close() }
        mView!!.findViewById<View>(R.id.window_open).setOnClickListener {
            (context.getSystemService(Context.WINDOW_SERVICE) as WindowManager).removeView(
                mView
            )
            // invalidate the view
            mView!!.invalidate()
            val i = Intent(
                Intent.ACTION_VIEW, Uri.parse("banlistapp://")
            )
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(i)
        }

        // Define the position of the
        // window within the screen
        mParams!!.gravity = Gravity.CENTER
        mWindowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    }

    fun open(text: String?) {
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
            if (mView!!.windowToken == null) {
                if (mView!!.parent == null) {
                    val titleText = mView!!.findViewById<View>(R.id.titleText) as TextView
                    titleText.text = text
                    mWindowManager!!.addView(mView, mParams)
                }
            }
        } catch (e: Exception) {
            Log.d("Error1", e.toString())
        }
    }

    fun close() {
        try {

            // remove the view from the window
            (context!!.getSystemService(Context.WINDOW_SERVICE) as WindowManager).removeView(mView)
            // invalidate the view
            mView!!.invalidate()
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
        } catch (e: Exception) {
            Log.d("Error2", e.toString())
        }
    }

}