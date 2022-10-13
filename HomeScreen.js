// How to Detect Call States in React Native App
// https://aboutreact.com/detect-call-states/

//Import React
import React, { useState, useEffect, } from "react";
import { connect } from "react-redux";

//Import required component
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
  Button,

  NativeModules
} from "react-native";

// import { DeleteOutlineOutlined } from "@material-ui/icons";

import Ionicons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/FontAwesome';

// import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log'

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

import { DeviceEventEmitter } from 'react-native';

const HomeScreen = (props) => {

  const banlistInfoModule = NativeModules.BanlistInfoNativeModule

  // React.useLayoutEffect(() => {
  //   this.props.navigation.setOptions({
  //     headerRight: () => (
  //       <Button title="Update count" />
  //     ),
  //   });
  // }, [this.props.navigation]);

  

  useEffect(() => {

    DeviceEventEmitter.addListener('rnApp', (e) => {
      // handle event and you will get a value in event object, you can log it here

      console.log("DeviceEventEmitter : rnApp")
    });

   
    // console.log("HomeScreen")
    // (async () => {

    //   // android.permission.CALL_PHONE
      
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    //       {
    //         title: 'Call Log Example',
    //         message:
    //           'Access your call logs',
    //         buttonNeutral: 'Ask Me Later',
    //         buttonNegative: 'Cancel',
    //         buttonPositive: 'OK',
    //       }
    //     )
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    //       CallLogs.load(-1, filter).then(c => console.log(c));
    //     } else {
    //       console.log('Call Log permission denied');
    //     }

    //     console.log(">>>>>> ")
    //   }
    //   catch (e) {
    //     console.log(e);
    //   }
    // })()
    if (Platform.OS === 'android') {
      console.log("Platform.OS :", Platform.OS)

      // PermissionsAndroid.requestMultiple(
      //   [PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW]
      //   ).then((result) => {

      //   })
      // RECEIVE_SMS

      // await requestLocationPermission()

      // const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW );

      // console.log('SYSTEM_ALERT_WINDOW', granted);
      

      requestMultiple([PERMISSIONS.ANDROID.CALL_PHONE, 
                       PERMISSIONS.ANDROID.READ_PHONE_STATE,
                       PERMISSIONS.ANDROID.READ_CALL_LOG,
                       PERMISSIONS.ANDROID.RECEIVE_SMS]).then((statuses) => {
        console.log('CALL_PHONE', statuses[PERMISSIONS.ANDROID.CALL_PHONE]);
        console.log('READ_PHONE_STATE', statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE]);
        console.log('READ_CALL_LOG', statuses[PERMISSIONS.ANDROID.READ_CALL_LOG]);
        console.log('RECEIVE_SMS', statuses[PERMISSIONS.ANDROID.RECEIVE_SMS]);
      });
    }
  }, []);
  
  return (
    <View style={styles.mainScreen}>
    {/* <SafeAreaView style={{ flex: 1 }}> */}
      <Text>You have (undefined) friends.</Text>
      <Button
          title="Go to Search"
          onPress={() =>
            props.navigation.navigate('search')
          }
        />
        {/* <Ionicons size={30} color="#900" /> */}
        <Icon name="rocket" size={30} color="#900" />
    {/* </SafeAreaView> */}

    <Button title="Test Native Bridge" onPress = {()=>{
                   //we will call our native Java Code here.

                  console.log("Test Native Bridge")

                  banlistInfoModule.MyBridgeMethod("Its from JavaScriptCode",(fromJavaCode)=>{
                    console.log(fromJavaCode)
                  })
          }} />
    </View>
  );
  
};

// Just some styles
const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  name: {
    fontSize: 20,
  },
});

// export default HomeScreen;
const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps  :", state)
  return {
  }
};

export default connect( mapStateToProps, null )(HomeScreen);