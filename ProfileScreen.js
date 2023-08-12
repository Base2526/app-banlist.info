import React, { useState, useEffect, useRef} from "react";
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
  TouchableOpacity,
  Image
} from "react-native";

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import _ from "lodash"
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import moment from "moment";

const ProfileScreen = (props) => {
    const banlistInfoModule = NativeModules.BanlistInfoNativeModule
    const navigation = useNavigation();

    useEffect(() => {

      // navigation.setOptions({
      //   headerRight: () => 
             
      //   <View style={{justifyContent:'center', paddingRight:5}}>
      //     <Menu
      //       ref={menuRef} 
      //       button={
      //         <TouchableOpacity 
      //           style={{ paddingLeft:3 }}
      //           onPress={()=>{ 
      //             menuRef.current?.show()
      //           }}>
      //         <Entypo name="dots-three-vertical" size={24} color={'#000'}  />
      //         </TouchableOpacity>
      //       }>
      //       <MenuItem onPress={() => {}} style={{alignItems:'center'}}>
      //         <Text style={{flex:9,
      //                       flexDirection:'row',
      //                       // alignItems:'center',
      //                       // justifyContent:'center',
      //                       color: "#000"}}>text 1</Text>
      //       </MenuItem>
      //     </Menu>
      //   </View>
      // });
    }, [])

    return (
        <View>
          <Text style={{color:"#000"}}>ProfileScreen</Text>
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
  return {}
};
  
export default connect( mapStateToProps, null )(ProfileScreen);