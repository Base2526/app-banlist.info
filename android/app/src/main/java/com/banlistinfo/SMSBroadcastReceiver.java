package com.banlistinfo;

import android.annotation.TargetApi;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.provider.Telephony;
import android.telephony.SmsMessage;
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

public class SMSBroadcastReceiver extends BroadcastReceiver {

    private static final String SMS_RECEIVED = "android.provider.Telephony.SMS_RECEIVED";
    private static final String TAG = "SMSBroadcastReceiver";

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(TAG, "Intent recieved: " + intent.getAction());

        if (intent.getAction() == Telephony.Sms.Intents.SMS_RECEIVED_ACTION) {
            Bundle bundle = intent.getExtras();
            String format = bundle.getString("format");

            if (bundle != null) {
                // Check the Android version.
                boolean isVersionM = (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M);
                Object[] pdus = (Object[])bundle.get("pdus");

                final SmsMessage[] messages = new SmsMessage[pdus.length];
                for (int i = 0; i < pdus.length; i++) {
                    if (isVersionM) {
                        // If Android version M or newer:
                        messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i], format);
                    } else {
                        // If Android version L or older:
                        messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
                    }
                }
                if (messages.length > -1) {
                    Log.i(TAG, "Message phone number : " + messages[0].getOriginatingAddress());
                    Log.i(TAG, "Message : " + messages[0].getMessageBody());

//                  showToast(context,"SMS " + messages[0].getOriginatingAddress() + "  " + messages[0].getMessageBody());

                    if((new Utils()).isAppIsInBackground(context)){
                        Window window = new Window(context);
                        window.open(messages[0].getOriginatingAddress() + " : " + messages[0].getMessageBody());


                        /////////////////////////////
                        SharedPreferences prefs =
                                PreferenceManager.getDefaultSharedPreferences(context);
                        Gson gson = new Gson();
                        String json = prefs.getString("PHONE_LIST", null);
                        Type listType = new TypeToken<ArrayList<Receive>>() {}.getType();

                        ArrayList<Receive> datas=  gson.fromJson(json, listType);;

                        Receive receive = new Receive();
                        receive.setType("SMS");
                        receive.setPhoneNumber(messages[0].getOriginatingAddress());
                        receive.setMessages(messages[0].getMessageBody());
                        receive.setCreatedAt(new Date());

                        if(datas == null){
                            datas = new ArrayList<>();
                        }
                        datas.add(receive);

                        SharedPreferences.Editor editor = prefs.edit();
                        editor.putString("PHONE_LIST", gson.toJson(datas));  ///"TAG_LIST" is a key must same for getting data
                        editor.apply();
                        ///////////////////////////////
                    }else{
                        try {
                            WritableMap map = Arguments.createMap();
                            map.putString("type", "SMS");

                            map.putString("phoneNumber", messages[0].getOriginatingAddress());
                            map.putString("messages", messages[0].getMessageBody());

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

                    //////////////////

//                    WritableMap map = Arguments.createMap();
//                    map.putString("key1", "Value1");
//                    map.putString("key1", "Value1");
//
////                    getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
//
//
//
//                    try {
////                        getReactInstanceManager().getCurrentReactContext()
////                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
////                                .emit("customEventName", map);
//
//                        // context - is the context you get from broadcastreceivers onReceive
//                        ReactApplication rnApp = (ReactApplication) context.getApplicationContext();
//
//                        rnApp.getReactNativeHost().getReactInstanceManager()
//                                .getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                                .emit("rnApp", map);
//
//                    } catch (Exception e){
//                        Log.e("ReactNative", "Caught Exception: " + e.getMessage());
//                    }

                    //////////////////

                }
            }
        }
    }

    void showToast(Context context,String message) {
        Toast toast = Toast.makeText(context, message, Toast.LENGTH_LONG);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }
}
