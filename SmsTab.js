import React, { useState, useEffect, } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  NativeModules,
  DeviceEventEmitter,
  TouchableOpacity
} from "react-native";

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import _ from "lodash"

const SmsTab = (props) => {

    const banlistInfoModule = NativeModules.BanlistInfoNativeModule

    useEffect(() => {
        if (Platform.OS === 'android') {
          // banlistInfoModule.getSMS((values)=>{
          //   console.log("CallLogsTab : getSMS : ", values)
    
          //   if(!_.isEmpty(values)){
          //   //   setDatas(JSON.parse(values))
          //   }
          // })
        }
    })

    viewFlatList = () =>{
      return  <FlatList
                data={ props.sms }
                renderItem={({item}) =>{
                  console.log("SMS > item :", item)
                  // return renderItem(item)
                  return <View style={{borderColor:'red',borderBottomWidth:1, borderTopWidth:1 , padding: 5, marginBottom:5}}>
                            <TouchableOpacity
                            onPress={()=>{
                              console.log("SMS onPress")
                            }}
                            >
                              <Text style={styles.item}>{item.phoneNumber} : {item.messages} : {item.createdAt}</Text>
                            </TouchableOpacity> 
                          </View>
                }}
              />
    }

    return (
        <View>
            {/* <Text style={styles.item}>SmsTab</Text> */}
          {viewFlatList()}
        </View>
    )
}

const styles = StyleSheet.create({
    mainScreen: {
      flex: 1,      
    },
    name: {
      fontSize: 20,
    },
    item: {
      color: "#000"
    }
});


const mapStateToProps = (state, ownProps) => {
    console.log("mapStateToProps  :", state.sms)

    let {sms} = state.sms
    return {
      sms
    }
};
  
export default connect( mapStateToProps, null )(SmsTab);