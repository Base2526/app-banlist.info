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

const SmsTab = (props) => {

    const banlistInfoModule = NativeModules.BanlistInfoNativeModule

    useEffect(() => {
        if (Platform.OS === 'android') {
          banlistInfoModule.getSMS((values)=>{
            console.log("CallLogsTab : getSMS : ", values)
    
            if(!_.isEmpty(values)){
            //   setDatas(JSON.parse(values))
            }
          })
        }
    })

    return (
        <View>
            <Text style={styles.item}>SmsTab</Text>
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
    console.log("mapStateToProps  :", state)
    return {
    }
};
  
export default connect( mapStateToProps, null )(SmsTab);