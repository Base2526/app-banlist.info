package com.banlistinfo

import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.CallLog
import android.provider.Telephony
import android.telephony.TelephonyManager
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.io.PrintWriter
import java.io.StringWriter
import java.lang.Math.abs
import java.text.Format
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.util.*
import kotlin.collections.ArrayList


class CallAndSmsBroadcastReceiver: BroadcastReceiver() {
    private val TAG = CallAndSmsBroadcastReceiver::class.java.name

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onReceive(context: Context?, intent: Intent?) {
        println("$TAG onReceive: ${intent?.action}")

        when(intent?.action){
            Telephony.Sms.Intents.SMS_RECEIVED_ACTION ->{
                val bundle = intent.extras
                val format = bundle?.getString("format")

                if (bundle != null) {

                    val msgFromIntent = Telephony.Sms.Intents.getMessagesFromIntent(intent)
                    msgFromIntent.forEachIndexed { index, smsMessage ->
                        Log.i(TAG, "onReceive: $index")

                        Log.i(TAG, "Address: ${smsMessage.originatingAddress}")
                        Log.i(TAG, "Body: ${smsMessage.displayMessageBody}")

                        if (context != null) {
                            Utils().local_noti(context)
                        }



                        /*
                        if (context?.let { Utils().isAppIsInBackground(it) } == true) {
                            val window = Window(context)
                            window.open("SMS", smsMessage.originatingAddress + " : " + smsMessage.displayMessageBody)

                            /////////////////////////////

                            if (context != null) {
                                // GET
                                val gson = Gson()
                                var datas = ArrayList<Receive?>()

                                val sharedPreferences = context.getSharedPreferences(MainApplication().preferenceFileName, 0)
                                if (sharedPreferences.contains(MainApplication().sms)) {
                                    val json = sharedPreferences.getString(MainApplication().sms, "")
                                    datas = gson.fromJson<ArrayList<Receive?>>(json, object : TypeToken<ArrayList<Receive?>?>() {}.type)
                                }

                                val receive = Receive()
                                receive._id = Utils().unique()
                                receive.type = MainApplication().sms
                                receive.phoneNumber = smsMessage.originatingAddress
                                receive.messages = smsMessage.displayMessageBody
                                receive.createdAt = Date()

                                datas.add(receive)

                                // SAVE
                                val sharedPreferencesEditor = sharedPreferences.edit()
                                sharedPreferencesEditor.putString(MainApplication().sms, gson.toJson(datas))
                                sharedPreferencesEditor.apply()
                            }

                            ///////////////////////////////
                        } else {
                            try {
                                val map = Arguments.createMap()
                                map.putString("_id", Utils().unique())
                                map.putString("type", MainApplication().sms)
                                map.putString("phoneNumber", smsMessage.originatingAddress)
                                map.putString("messages", smsMessage.displayMessageBody)
                                val formatter: Format = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                                val createdAt = formatter.format(Date())
                                map.putString("createdAt", createdAt)

                                // context - is the context you get from broadcastreceivers onReceive
                                val rnApp = context?.applicationContext as ReactApplication
                                rnApp.reactNativeHost.reactInstanceManager
                                    .currentReactContext?.getJSModule(RCTDeviceEventEmitter::class.java)
                                    ?.emit("rnApp", map)
                            } catch (e: java.lang.Exception) {
                                Log.e("ReactNative", "Caught Exception: " + e.message)
                            }
                        }

                        */
                    }

                    try {
                        val map = Arguments.createMap()
                        map.putString("type", MainApplication().sms)

                        // context - is the context you get from broadcastreceivers onReceive
                        val rnApp = context?.applicationContext as ReactApplication
                        rnApp.reactNativeHost.reactInstanceManager
                            .currentReactContext?.getJSModule(RCTDeviceEventEmitter::class.java)
                            ?.emit("rnApp", map)
                    } catch (e: java.lang.Exception) {
                        Log.e("ReactNative", "Caught Exception: " + e.message)
                    }
                }
            }
            "android.intent.action.PHONE_STATE" ->{
                when(intent?.getStringExtra(TelephonyManager.EXTRA_STATE)){
                    TelephonyManager.EXTRA_STATE_OFFHOOK ->{
                        println("EXTRA_STATE_OFFHOOK : Call started")
                    }
                    TelephonyManager.EXTRA_STATE_IDLE ->{
                        println("EXTRA_STATE_IDLE : Call ended")

                        try {
                            val map = Arguments.createMap()
                            map.putString("type", MainApplication().callLogs)

                            // context - is the context you get from broadcastreceivers onReceive
                            val rnApp = context?.applicationContext as ReactApplication
                            rnApp.reactNativeHost.reactInstanceManager
                                ?.currentReactContext?.getJSModule(RCTDeviceEventEmitter::class.java)
                                ?.emit("rnApp", map)
                        } catch (e: Exception) {
                            Log.e("ReactNative", "Caught Exception: " + e.message)
                        }
                    }
                    TelephonyManager.EXTRA_STATE_RINGING ->{
                        println("EXTRA_STATE_RINGING : Call Ringing")

                        val phoneNumber = intent?.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)
                        if (phoneNumber != null) {
                            println("Incoming call...")
                            println(phoneNumber)

                            if (context != null) {
                                Utils().local_noti(context)
                            }

//                            if (context != null) {
//                                Utils.test_apollo(context)
//                            };



                            /////////////////
                            /*
                            try {
                                var cols= arrayOf(CallLog.Calls._ID, CallLog.Calls.NUMBER, CallLog.Calls.TYPE, CallLog.Calls.DURATION,CallLog.Calls.DATE)
                                var rs= context?.contentResolver?.query(CallLog.Calls.CONTENT_URI,cols,null,
                                    null, "${CallLog.Calls.LAST_MODIFIED} DESC")
//                                var from= arrayOf(CallLog.Calls.NUMBER,CallLog.Calls.DURATION,CallLog.Calls.TYPE)

                                var cursorToArray = rs?.let { Utils().cursorToArray(it) }
                                println("convertCursorToArray: $cursorToArray.joinToString(\" \")")
                            }catch (e : Exception){
                                val stacktrace = StringWriter().also { e.printStackTrace(PrintWriter(it)) }.toString().trim()
                                println("Exception caught: $stacktrace")
                            }
                            */


//                            contentResolver.query(CallLog.Calls.CONTENT_URI,
//                                cols,"${CallLog.Calls.NUMBER} = ","99999999",
//                                "${CallLog.Calls.LAST_MODIFIED} DESC")

                            ///////////////////
                            /*

                            if (context?.let { Utils().isAppIsInBackground(it) } == true) {
//                                val window = context?.let { Window(it) }
//                                window?.open(phoneNumber)


//                                Utils.killCall(context);

                                try {
                                    Window(context)?.open("PHONE", phoneNumber)
                                } catch (e: Exception) {
                                    Log.e("ReactNative", "Caught Exception: " + e.message)
                                }

                                if (context != null) {
                                    // GET
                                    val gson = Gson()
                                    var datas = ArrayList<Receive?>()

                                    val sharedPreferences = context.getSharedPreferences(MainApplication().preferenceFileName, 0)
                                    if (sharedPreferences.contains(MainApplication().callLogs)) {
                                        val json = sharedPreferences.getString(MainApplication().callLogs, "")
                                        datas = gson.fromJson<ArrayList<Receive?>>(json, object : TypeToken<ArrayList<Receive?>?>() {}.type)
                                    }

                                    val receive = Receive()
                                    receive._id = Utils().unique()
                                    receive.type = MainApplication().callLogs
                                    receive.phoneNumber = phoneNumber
                                    receive.messages = ""
                                    receive.createdAt = Date()

                                    datas.add(receive)

                                    // SAVE
                                    val sharedPreferencesEditor = sharedPreferences.edit()
                                    sharedPreferencesEditor.putString(MainApplication().callLogs, gson.toJson(datas))
                                    sharedPreferencesEditor.apply()
                                }
                            } else {
                                try {
                                    val map = Arguments.createMap()
                                    map.putString("_id", Utils().unique())
                                    map.putString("type", MainApplication().callLogs)
                                    map.putString("phoneNumber", phoneNumber)
                                    map.putString("messages", "")
                                    val formatter: Format = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                                    val createdAt = formatter.format(Date())
                                    map.putString("createdAt", createdAt)

                                    // context - is the context you get from broadcastreceivers onReceive
                                    val rnApp = context?.applicationContext as ReactApplication
                                    rnApp.reactNativeHost.reactInstanceManager
                                        ?.currentReactContext?.getJSModule(RCTDeviceEventEmitter::class.java)
                                        ?.emit("rnApp", map)
                                } catch (e: Exception) {
                                    Log.e("ReactNative", "Caught Exception: " + e.message)
                                }
                            }

                            */
                        }
                    }
                    else -> {
                        println("EXTRA_STATE : Other case")
                    }
                }
            }
            else ->{
                println("Other case")
            }
        }
    }

}