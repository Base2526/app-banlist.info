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

const CallLogsTab = (props) => {
    return (
        <View>
            <Text>CallLogsTab</Text>
        </View>
    )
}
const mapStateToProps = (state, ownProps) => {
    console.log("mapStateToProps  :", state)
    return {
    }
};
  
export default connect( mapStateToProps, null )(CallLogsTab);