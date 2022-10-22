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
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import _ from "lodash"

const CallLogsTab = (props) => {
    const banlistInfoModule = NativeModules.BanlistInfoNativeModule

    useEffect(() => {
        if (Platform.OS === 'android') {
          // banlistInfoModule.getCallLogs((values)=>{
          //   console.log("CallLogsTab : getCallLogs : ", values)
    
          //   if(!_.isEmpty(values)){
          //   //   setDatas(JSON.parse(values))
          //   }
          // })
        }
    })

    viewFlatList = () =>{
      return  <FlatList
                data={ props.call_logs }
                renderItem={({item}) =>{
                  console.log("CallLogsTab > item :", item)
                  // return renderItem(item)
                  return <View style={{borderColor:'red',borderBottomWidth:1,borderTopWidth:1 , padding: 5, marginBottom:5}}>
                            <TouchableOpacity
                            onPress={()=>{
                              console.log("CallLogs onPress")
                            }}
                            >
                              <Text style={styles.item}>{item.phoneNumber} : {item.createdAt} </Text>
                           </TouchableOpacity>
                          </View>
                }}
              />
    }

    return (
        <View>
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
  let {call_logs} = state.call_logs
  return {
    call_logs
  }
};
  
export default connect( mapStateToProps, null )(CallLogsTab);