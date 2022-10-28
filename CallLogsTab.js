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
// import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import moment from "moment";

import {secondsToHms} from "./Utils"

// dots-three-vertical
const CallLogsTab = (props) => {
    const banlistInfoModule = NativeModules.BanlistInfoNativeModule
    const navigation = useNavigation();

    const menuRef = useRef();

    useEffect(() => {

      navigation.setOptions({
        headerRight: () => 
             
        <View style={{justifyContent:'center', paddingRight:5}}>
          <Menu
            ref={menuRef} 
            button={
              <TouchableOpacity 
                style={{ paddingLeft:3 }}
                onPress={()=>{ 
                  menuRef.current?.show()
                }}>
              <Entypo name="dots-three-vertical" size={24} color={'#000'}  />
              </TouchableOpacity>
            }>
            <MenuItem onPress={() => {}} style={{alignItems:'center'}}>
              <Text style={{flex:9,
                            flexDirection:'row',
                            // alignItems:'center',
                            // justifyContent:'center',
                            color: "#000"}}>text 1</Text>
            </MenuItem>
          </Menu>
        </View>
      });

      if (Platform.OS === 'android') {
        // banlistInfoModule.getCallLogs((values)=>{
        //   console.log("CallLogsTab : getCallLogs : ", values)
  
        //   if(!_.isEmpty(values)){
        //   //   setDatas(JSON.parse(values))
        //   }
        // })
      }
    }, [])

    viewFlatList = () =>{
      return  <FlatList
                data={ props.call_logs }
                renderItem={({item}) =>{
                  // console.log("CallLogsTab > item :", item, props.contacts)
                  // return renderItem(item)

                  let contact = _.find(props.contacts, (c)=>c.phone == item.number)

                  // console.log("CallLogsTab > contact :", contact)
                  return <View style={{borderColor:'red',borderBottomWidth:1,borderTopWidth:1 , padding: 5, marginBottom:5}}>
                            <TouchableOpacity
                            onPress={()=>{
                              console.log("CallLogs onPress")

                            }}
                            >
                              <Text style={styles.item}>name:{_.isEmpty(contact) ? "" : contact.name} type: {item.type}, number: {item.number}, time: {secondsToHms(item.duration)}, date: { moment.unix(item.date/1000).format("DD/MM/YYYY HH:mm:ss") } </Text>
                           </TouchableOpacity>
                          </View>
                }}

                // Performance settings
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                updateCellsBatchingPeriod={100} // Increase time between renders
                windowSize={7} // Reduce the window size
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
  let {contacts} = state.contact
  return {
    call_logs,
    contacts
  }
};
  
export default connect( mapStateToProps, null )(CallLogsTab);