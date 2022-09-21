Generate
keytool -genkeypair -v -storetype PKCS12 -keystore banlistinfo.keystore -alias banlistinfo -keyalg RSA -keysize 2048 -validity 10000

หลังจาก clone project จาก git
1. npm install --force
2. npx react-native start