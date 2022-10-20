import React, { useState, useEffect, } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  NativeModules,
  DeviceEventEmitter
} from "react-native";

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import _ from "lodash"

const HomeTab = (props) => {

  const banlistInfoModule = NativeModules.BanlistInfoNativeModule

  const [datas, setDatas] = useState([]);

  // ค่อยรับค่าส่งมากจาก android & ios native
  DeviceEventEmitter.addListener('rnApp', (data) => {
    console.log("DeviceEventEmitter > rnApp :", [...datas, data])

    setDatas([...datas, data])
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      banlistInfoModule.getCallLogs((values)=>{
        console.log("getCallLogs : ", values)

        if(!_.isEmpty(values)){
          setDatas(JSON.parse(values))
        }
      })

      banlistInfoModule.getSMS((values)=>{
        console.log("getSMS : ", values)

        if(!_.isEmpty(values)){
          // setDatas(JSON.parse(values))
        }
      })

      requestMultiple([PERMISSIONS.ANDROID.CALL_PHONE, 
                       PERMISSIONS.ANDROID.READ_PHONE_STATE,
                       PERMISSIONS.ANDROID.READ_CALL_LOG,
                       PERMISSIONS.ANDROID.RECEIVE_SMS,
                      PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then((statuses) => {
        console.log('CALL_PHONE', statuses[PERMISSIONS.ANDROID.CALL_PHONE]);
        console.log('READ_PHONE_STATE', statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE]);
        console.log('READ_CALL_LOG', statuses[PERMISSIONS.ANDROID.READ_CALL_LOG]);
        console.log('RECEIVE_SMS', statuses[PERMISSIONS.ANDROID.RECEIVE_SMS]);
        console.log('POST_NOTIFICATIONS', statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS]);
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
  // console.log("mapStateToProps  :", state)
  return {
  }
};

export default connect( mapStateToProps, null )(HomeTab);