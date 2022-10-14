package com.banlistinfo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.Gravity;
import android.widget.Toast;

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class CallReceiver extends BroadcastReceiver {
    private static final String TAG = CallReceiver.class.getName();

    private static boolean mStateOutgoingCall;

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getStringExtra(TelephonyManager.EXTRA_STATE).equals(TelephonyManager.EXTRA_STATE_OFFHOOK)){
//            showToast(context,"Call started...");

            Log.d(TAG, "Call started");
        }
        else if(intent.getStringExtra(TelephonyManager.EXTRA_STATE).equals(TelephonyManager.EXTRA_STATE_IDLE)){
//            showToast(context,"Call ended...");

            Log.d(TAG, "Call ended");
        }
        else if(intent.getStringExtra(TelephonyManager.EXTRA_STATE).equals(TelephonyManager.EXTRA_STATE_RINGING)){

            String phoneNumber= intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER);

            if(phoneNumber != null){
                System.out.println("Incoming call... phoneNumber : ");
                System.out.println(phoneNumber);

//                showToast(context,"Incoming call : " + phoneNumber);

                if((new Utils()).isAppIsInBackground(context)) {
                    Window window = new Window(context);
                    window.open(phoneNumber);


                    //////////////////////////
                    SharedPreferences prefs =
                            PreferenceManager.getDefaultSharedPreferences(context);
                    Gson gson = new Gson();
                    String json = prefs.getString("PHONE_LIST", null);
                    Type listType = new TypeToken<ArrayList<Receive>>() {}.getType();

                    ArrayList<Receive> datas=  gson.fromJson(json, listType);;

                    Receive receive = new Receive();
                    receive.setType(ReceiveType.PHONE);
                    receive.setPhoneNumber(phoneNumber);
                    receive.setMessages("");
                    receive.setCreatedAt(new Date());


                    if(datas == null){
                        datas = new ArrayList<>();
                    }
                    datas.add(receive);

                    SharedPreferences.Editor editor = prefs.edit();
                    editor.putString("PHONE_LIST", gson.toJson(datas));  ///"TAG_LIST" is a key must same for getting data
                    editor.apply();


                    /////////////////////////
                }else{
                    try {
                        WritableMap map = Arguments.createMap();
                        map.putString("type", ReceiveType.PHONE.toString());
                        map.putString("phoneNumber", phoneNumber);
                        map.putString("messages", "");

                        Format formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        String createdAt = formatter.format(new Date());
                        map.putString("createdAt", createdAt);


                        // context - is the context you get from broadcastreceivers onReceive
                        ReactApplication rnApp = (ReactApplication) context.getApplicationContext();

                        rnApp.getReactNativeHost().getReactInstanceManager()
                                .getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("rnApp", map);

                    } catch (Exception e){
                        Log.e("ReactNative", "Caught Exception: " + e.getMessage());
                    }
                }
            }
        }

        /*
        System.out.println("intent.getAction() :" + intent.getAction());
        if(intent.getAction().equals("android.intent.action.PHONE_STATE")){
            String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);
            if(state.equals(TelephonyManager.EXTRA_STATE_OFFHOOK)){
                Log.d(TAG, "Inside Extra state off hook");
                String number = intent.getStringExtra(intent.EXTRA_PHONE_NUMBER);
                Log.e(TAG, "outgoing number : " + number);
            }else if (state.equals(TelephonyManager.EXTRA_STATE_RINGING)){
                Log.e(TAG, "Inside EXTRA_STATE_RINGING");
                String number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER);
                Log.e(TAG, "incoming number : " + number);
            }else if(state.equals(TelephonyManager.EXTRA_STATE_IDLE)){
                Log.d(TAG, "Inside EXTRA_STATE_IDLE");
            }
        }

        TelephonyManager tm = (TelephonyManager)context.getSystemService(Service.TELEPHONY_SERVICE);
        if (tm.getCallState() == TelephonyManager.CALL_STATE_OFFHOOK) {

            String number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER);
            Log.d(TAG, "tm.getCallState() :" + number);
        }
        */

        /*
        String action = intent.getAction();

        if (action.equals(Intent.ACTION_NEW_OUTGOING_CALL)) {

            if (mStateOutgoingCall) {
                return;
            }

            String number = intent.getStringExtra(Intent.EXTRA_PHONE_NUMBER);
            setResultData(null);

            Log.v(TAG, "tel:" + number);
            Toast.makeText(context, "tel:" + number, Toast.LENGTH_SHORT).show();

//            Intent intentService = new Intent(context, OutgoingCallIntentService.class);
//            intentService.setData(Uri.parse("tel:" + number));
//            context.startService(intentService);

            mStateOutgoingCall = true;

        } else if (action.equals(TelephonyManager.ACTION_PHONE_STATE_CHANGED)) {

            String phoneState = intent.getStringExtra(TelephonyManager.EXTRA_STATE);
            //Toast.makeText(context, phoneState, Toast.LENGTH_LONG).show();

            Log.v(TAG, "onReceive() " + phoneState);

            if (TelephonyManager.EXTRA_STATE_RINGING.equals(phoneState)) {
            }
            else if (TelephonyManager.EXTRA_STATE_OFFHOOK.equals(phoneState)) {
            }
            else if (TelephonyManager.EXTRA_STATE_IDLE.equals(phoneState)) {
                mStateOutgoingCall = false;
            }
        }



        if(intent.getAction().equals("android.intent.action.PHONE_STATE")){

            String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);

            if(state.equals(TelephonyManager.EXTRA_STATE_OFFHOOK)){
                Log.d(TAG, "Inside Extra state off hook");

//                Log.d(TAG, intent);
//                String number = intent.getStringExtra(TelephonyManager.EXTRA_PHONE_NUMBER);
//                Log.e(TAG, "outgoing number : " + number);
            }

            else if (state.equals(TelephonyManager.EXTRA_STATE_RINGING)){
                Log.e(TAG, "Inside EXTRA_STATE_RINGING");
                String number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER);
                Log.e(TAG, "incoming number : " + number);
            }
            else if(state.equals(TelephonyManager.EXTRA_STATE_IDLE)){
                Log.d(TAG, "Inside EXTRA_STATE_IDLE");
            }
        }

        */
    }

    void showToast(Context context,String message){
        Toast toast=Toast.makeText(context,message,Toast.LENGTH_LONG);
        toast.setGravity(Gravity.CENTER,0,0);
        toast.show();


        System.out.println("");

        // create an instance of Window class
        // and display the content on screen
//        Window window=new Window(context);
//        window.open();
    }
}

