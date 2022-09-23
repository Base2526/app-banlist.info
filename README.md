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