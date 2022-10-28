Generate
keytool -genkeypair -v -storetype PKCS12 -keystore banlistinfo.keystore -alias banlistinfo -keyalg RSA -keysize 2048 -validity 10000

หลังจาก clone project จาก git
1. npm install --force
2. npx react-native start
3. npx react-native run-android
4. react-native run-android --deviceId=DEVICE_ID << spacial device >>

Android debuger
1. adb devices
2. adb -s <device name> reverse tcp:8081 tcp:8081
3. computer & mobile android ต้องอยู่  network เดียวกัน
4. หน้า ip computer แล้วเปิดหน้า debug > Settings > Debuging ใส่ ip with port[8081]


example 
https://github.com/AliA1997/top25NFLPlayers-ReactNative-GraphQL/blob/master/top25Players/App.js


// Hide bottom tab bar on a specific screen in React Navigation 6.0
https://medium.com/@mspviraj/hide-bottom-tab-bar-on-a-specific-screen-in-react-navigation-6-0-26d31625d339



// Check ว่า background process ทำงานหรือไหม
// React Native: Is there a callback function for when your app is closed?
https://stackoverflow.com/questions/38677137/react-native-is-there-a-callback-function-for-when-your-app-is-closed
https://reactnative.dev/docs/appstate.html



How to Draw Over Other Apps in Android?
https://www.geeksforgeeks.org/how-to-draw-over-other-apps-in-android/


/////////////////////////// #1 react-native-create-bridge ///////////////////////////

Android Native Bride Module for React Native in just Four Steps.
https://javascript.plainenglish.io/android-native-bride-module-for-react-native-with-few-step-50dec026a7b6

Module react-native-create-bridge
fix : react-native new-module  = error: unknown command 'new-module'
solve :
  edit : ./node_modules/react-native-create-bridge/build/index.js

  จาก
    module.exports = {
        name: "new-module",
        description: "bridges React Native modules & UI components",
        func: init
    };
  
  to

    (async function main() {
        init();
    }()).catch();

แล้ว node ./node_modules/react-native-create-bridge/build/index.js
/////////////////////////// #2 react-native-create-bridge ///////////////////////////


// Detecting incoming call and opening a service in background on top of the dialer app
https://stackoverflow.com/questions/50810552/detecting-incoming-call-and-opening-a-service-in-background-on-top-of-the-dialer


Detect incoming outgoing or ringing calls while the app is closed or open [background process]
https://www.youtube.com/watch?v=rlzfcqDlovg




// Creating floating chat head like Messenger in Android!
https://stackoverflow.com/questions/52339231/floating-widget-in-react-native
https://thunderwiring.wordpress.com/2018/04/01/creating-floating-chat-head-like-messenger-in-android/



// Deep link
https://blog.jscrambler.com/how-to-handle-deep-linking-in-a-react-native-app

// Android localstorage & save object
https://stackoverflow.com/questions/29648630/save-arraylistcustom-object-to-local-storage

// Android communitcation react-native

JAVA 
try {
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

react-native 
   DeviceEventEmitter.addListener('rnApp', (e) => {
      // handle event and you will get a value in event object, you can log it here

      console.log("DeviceEventEmitter : rnApp")
    });


///////////////////////
android + apollographql

ขั้นตอน
  -  requires a schema  src/main/graphql แล้วสร้าง file  schema.json
  -  แล้ว run command ./gradlew downloadApolloSchema --endpoint="https://apollo-fullstack-tutorial.herokuapp.com/graphql"

refer : https://medium.com/android-news/implementing-apollo-client-in-android-studio-2d018fb36cd9
https://www.youtube.com/watch?v=0kc0m8eo8hw

/////////////////////////////


/////////////////// downloadApolloSchema /////////////////////
./gradlew downloadApolloSchema --endpoint="https://apollo-fullstack-tutorial.herokuapp.com/graphql" --schema="app/src/main/graphql/schema.json"

app/src/main/graphql


./gradlew downloadApolloSchema --endpoint="https://banlist.info/graphql" --schema="app/src/main/graphql/schema.json"


กรณี  javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target

ให้ใส่ --insecure

./gradlew downloadApolloSchema --endpoint="https://banlist.info/graphql" --schema="app/src/main/graphql/schema.json" --insecure

/////////////////// downloadApolloSchema /////////////////////

./gradlew :app:downloadApolloSchema --endpoint='https://banlist.info/graphql' --schema=app/src/main/graphql/schema.graphqls --insecure


/////// android block call //////////////////////////////
https://pastebin.com/kAzrWvaD
http://androidsourcecode.blogspot.com/2010/10/blocking-incoming-call-android.html
https://stackoverflow.com/questions/23097944/can-i-hang-up-a-call-programmatically-in-android
https://stackoverflow.com/questions/50351444/abortbroadcast-not-working-in-smsreceiver-broadcast

/////// android block call //////////////////////////////

icon 
https://oblador.github.io/react-native-vector-icons/

login with google without firebase
https://dev.to/suyashvash/google-authsignin-in-react-native-without-firebase-43n

login with facebook
https://mehrankhandev.medium.com/integrating-fbsdk-facebook-login-in-react-native-7b7600ce74a7


android get Contact
https://gist.github.com/srayhunter/47ab2816b01f0b00b79150150feb2eb2


react native  : EXPANDING AND COLLAPSING ELEMENTS IN REACT NATIVE
https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/


// phone status
- Outgoing call
- Not answered
- Incoming call
- Missed call
