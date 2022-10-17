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
  NativeModules,
  DeviceEventEmitter
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import CallLogs from 'react-native-call-log'
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import _ from "lodash"

const HomeScreen = (props) => {

  const banlistInfoModule = NativeModules.BanlistInfoNativeModule

  const [datas, setDatas] = useState([]);

  // React.useLayoutEffect(() => {
  //   this.props.navigation.setOptions({
  //     headerRight: () => (
  //       <Button title="Update count" />
  //     ),
  //   });
  // }, [this.props.navigation]);

  DeviceEventEmitter.addListener('rnApp', (data) => {
    // handle event and you will get a value in event object, you can log it here

    let newDatas = [...datas, data]

    console.log("DeviceEventEmitter : datas", datas)
    console.log("DeviceEventEmitter : data", data)
    console.log("DeviceEventEmitter : newDatas", newDatas)

    setDatas(newDatas)
  });

  
  useEffect(() => {

    banlistInfoModule.getDataList((values)=>{

      console.log("getDataList : ", values)

      if(!_.isEmpty(values)){
        setDatas(JSON.parse(values))
      }
    })

   
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

  useEffect(()=>{
    console.log(">>> datas :", datas)
  }, [datas])
  
  return (
    <View style={styles.mainScreen}>
      {/* <Text>You have friends.</Text>
      <Button
          title="Go to Search"
          onPress={() =>
            props.navigation.navigate('search')
          }
        />
        <Icon name="rocket" size={30} color="#900" />


      <Button 
            title="Test Native Bridge" 
            onPress = {()=>{

              console.log("Test Native Bridge")

              banlistInfoModule.MyBridgeMethod("Its from JavaScriptCode",(fromJavaCode)=>{
                console.log(fromJavaCode)
              })
            }} /> */}


      <FlatList
        data={ datas /*[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ] */}
        renderItem={({item}) =>{
          return <Text style={styles.item}>{item.type} : {item.phoneNumber} :: {item.messages}</Text>
        } }
      />
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