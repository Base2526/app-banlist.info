package com.banlistinfo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.telecom.Call;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.Gravity;
import android.widget.Toast;

import android.app.Service;

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

                if(Utils.isAppIsInBackground(context)) {
                    Window window = new Window(context);
                    window.open(phoneNumber);
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

