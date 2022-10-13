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