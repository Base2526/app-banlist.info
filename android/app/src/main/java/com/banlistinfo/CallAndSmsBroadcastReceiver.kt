package com.banlistinfo

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.preference.PreferenceManager
import android.provider.Telephony
import android.telephony.TelephonyManager
import android.util.Log
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.text.Format
import java.text.SimpleDateFormat
import java.util.*

class CallAndSmsBroadcastReceiver: BroadcastReceiver() {
    private val TAG = CallReceiver::class.java.name

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

                        if (context?.let { Utils().isAppIsInBackground(it) } == true) {
                            val window = Window(context)
                            window.open(smsMessage.originatingAddress + " : " + smsMessage.displayMessageBody)

                            /////////////////////////////
                            val prefs = PreferenceManager.getDefaultSharedPreferences(context)
                            val gson = Gson()
                            val json = prefs.getString("PHONE_LIST", null)
                            val listType = object : TypeToken<ArrayList<Receive?>?>() {}.type
                            var datas = gson.fromJson<ArrayList<Receive?>>(json, listType)
                            val receive = Receive()
                            receive.type = "SMS"
                            receive.phoneNumber = smsMessage.originatingAddress
                            receive.messages = smsMessage.displayMessageBody
                            receive.createdAt = Date()
                            if (datas == null) {
                                datas = ArrayList()
                            }
                            datas.add(receive)
                            val editor = prefs.edit()
                            editor.putString(
                                "PHONE_LIST",
                                gson.toJson(datas)
                            ) ///"TAG_LIST" is a key must same for getting data
                            editor.apply()
                            ///////////////////////////////
                        } else {
                            try {
                                val map = Arguments.createMap()
                                map.putString("type", "SMS")
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
                    }
                }
            }
            "android.intent.action.PHONE_STATE" ->{
                when(intent?.getStringExtra(TelephonyManager.EXTRA_STATE)){
                    TelephonyManager.EXTRA_STATE_OFFHOOK ->{
                        println("EXTRA_STATE_OFFHOOK : Call started")

//                        context.sendOrderedBroadcastAsUser()


                    }
                    TelephonyManager.EXTRA_STATE_IDLE ->{
                        println("EXTRA_STATE_IDLE : Call ended")
                    }
                    TelephonyManager.EXTRA_STATE_RINGING ->{
                        println("EXTRA_STATE_RINGING : Call Ringing")

                        val phoneNumber = intent?.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)
                        if (phoneNumber != null) {
                            println("Incoming call...")
                            println(phoneNumber)

                            if (context?.let { Utils().isAppIsInBackground(it) } == true) {
//                                val window = context?.let { Window(it) }
//                                window?.open(phoneNumber)


                                killCall(context);

                                try {
                                    Window(context)?.open(phoneNumber)
                                } catch (e: Exception) {
                                    Log.e("ReactNative", "Caught Exception: " + e.message)
                                }

                                //////////////////////////
                                /*
                                val prefs = PreferenceManager.getDefaultSharedPreferences(context)
                                val gson = Gson()
                                val json = prefs.getString("PHONE_LIST", null)
                                val listType = object : TypeToken<ArrayList<Receive?>?>() {}.type
                                var datas = gson.fromJson<ArrayList<Receive?>>(json, listType)
                                val receive = Receive()
                                receive.type = "PHONE"
                                receive.phoneNumber = phoneNumber
                                receive.messages = ""
                                receive.createdAt = Date()

                                if (datas == null) {
                                    datas = ArrayList()
                                }
                                datas.add(receive)

                                val editor = prefs.edit()
                                editor.putString( "PHONE_LIST", gson.toJson(datas))
                                editor.apply()

                                */

//                                SharedPreferences.
//
//                                val sharedPreference =  getSharedPreferences("PREFERENCE_NAME",Context.MODE_PRIVATE)
//                                var editor = sharedPreference.edit()
//                                editor.putString("username","Anupam")
//                                editor.putLong("l",100L)
//                                editor.commit()

                                /////////////////////////

                            } else {
                                try {
                                    val map = Arguments.createMap()
                                    map.putString("type", "PHONE")
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

                            // (new Utils()).test_apollo(context);
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

    fun killCall(context: Context): Boolean {
        return try {
            // Get the boring old TelephonyManager
            val telephonyManager =
                context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

            // Get the getITelephony() method
            val classTelephony = Class.forName(telephonyManager.javaClass.name)
            val methodGetITelephony = classTelephony.getDeclaredMethod("getITelephony")
            // Ignore that the method is supposed to be private
            methodGetITelephony.isAccessible = true
            // Invoke getITelephony() to get the ITelephony interface
            val telephonyInterface = methodGetITelephony.invoke(telephonyManager)
            // Get the endCall method from ITelephony
            val telephonyInterfaceClass = Class.forName(telephonyInterface.javaClass.name)
            val methodEndCall = telephonyInterfaceClass.getDeclaredMethod("endCall")
            // Invoke endCall()
            methodEndCall.invoke(telephonyInterface)
            true
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            false
        }
    }
}