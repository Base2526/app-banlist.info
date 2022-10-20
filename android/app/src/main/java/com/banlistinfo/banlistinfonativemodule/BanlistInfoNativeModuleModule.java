//  Created by react-native-create-bridge

package com.banlistinfo.banlistinfonativemodule;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

import androidx.annotation.Nullable;

import com.banlistinfo.MainApplication;
import com.banlistinfo.Receive;
import com.banlistinfo.Window;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class BanlistInfoNativeModuleModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "BanlistInfoNativeModule";
    private static ReactApplicationContext reactContext = null;

    public BanlistInfoNativeModuleModule(ReactApplicationContext context) {
        // Pass in the context to the constructor and save it so you can emit events
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        super(context);

        reactContext = context;
    }

    @Override
    public String getName() {
        // Tell React the name of the module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        return REACT_CLASS;
    }

    @Override
    public Map<String, Object> getConstants() {
        // Export any constants to be used in your native module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        final Map<String, Object> constants = new HashMap<>();
        constants.put("EXAMPLE_CONSTANT", "example");

        return constants;
    }

    @ReactMethod
    public void exampleMethod () {
        // An example native method that you will expose to React
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
    }

    @ReactMethod
    public void initConfigs(String configs, Callback callBack) {
        Log.i("initConfigs", configs);

        SharedPreferences sharedPreferences = reactContext.getSharedPreferences(
                (new MainApplication()).preferenceFileName, Context.MODE_PRIVATE);
        try{
            JSONObject configsJson = new JSONObject(configs);

            if (configsJson.has("HOST_GRAPHAL")) {
                SharedPreferences.Editor sharedPreferencesEditor = sharedPreferences.edit();
                sharedPreferencesEditor.putString((new MainApplication()).HOST_GRAPHAL, configsJson.getString("HOST_GRAPHAL"));
                sharedPreferencesEditor.apply();
            }

            Log.i("TAG", "");
        }catch (Exception e){
            Log.e("TAG", e.toString());
        }

        callBack.invoke("ok");
    }

    @ReactMethod
    public void MyBridgeMethod(String stringFromJS, Callback callBack){
        //Replace the JavaScriptCode with JavaCode to mimic some change from Java Code.
        System.out.println("MyBridgeMethod :"+ stringFromJS);

        // create an instance of Window class
        // and display the content on screen
        Window window=new Window(reactContext);
        window.open("PHONE", "MyBridgeMethod");

        String newString =  stringFromJS.replace("JavaScriptCode","Java  Code");
        callBack.invoke(newString);
    }

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
        // A method for emitting from the native side to JS
        // https://facebook.github.io/react-native/docs/native-modules-android.html#sending-events-to-javascript
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

    @ReactMethod
    public static void getCallLogs(Callback callBack){
        SharedPreferences prefs =
                PreferenceManager.getDefaultSharedPreferences(reactContext);
        SharedPreferences sharedPreferences =  reactContext.getSharedPreferences((new MainApplication()).preferenceFileName, 0);

        String json = "";
        if (sharedPreferences.contains((new MainApplication()).callLogs)) {
            json = sharedPreferences.getString((new MainApplication()).callLogs, "");
        }

        callBack.invoke(json);
    }

    @ReactMethod
    public static void getSMS(Callback callBack){
        SharedPreferences prefs =
                PreferenceManager.getDefaultSharedPreferences(reactContext);
        SharedPreferences sharedPreferences =  reactContext.getSharedPreferences((new MainApplication()).preferenceFileName, 0);

        String json = "";
        if (sharedPreferences.contains((new MainApplication()).sms)) {
            json = sharedPreferences.getString((new MainApplication()).sms, "");
        }

        callBack.invoke(json);
    }
}
