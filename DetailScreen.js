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
  Image,
  SafeAreaView,
  ScrollView 
} from "react-native";
import { gql, useQuery } from '@apollo/client'
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import _ from "lodash"
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import moment from "moment";


const GET_POST = gql`query Post($id: ID!) { post(_id: $id) }`;

const DetailScreen = (props) => {
    const banlistInfoModule = NativeModules.BanlistInfoNativeModule
    const navigation = useNavigation();


    console.log("DetailScreen :", props)

    if(_.isEmpty(props.route.params)){
      return <ActivityIndicator color={"#fff"}  size={'large'}/>
    }
    let {screen} = props.route.params

    let _id  =  !_.isEmpty(screen) ? props.route.params.params._id : props.route.params._id

    console.log("")

    useEffect(() => {

      console.log("useEffect")

      post && post.refetch({ id: _id })

      // console.log("DetailScreen :", _id )

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
    }, [_id])

    // { loading, error, data }
    const post  = useQuery(GET_POST , {
      variables: {id: ""},
      notifyOnNetworkStatusChange: true,
    });

    // if(!loading && data.homes.status){
    if(!post.loading && post.data.post){
      let { data, executionTime, status } = post.data.post
      console.log("DetailScreen :", data, executionTime, status)
    }else{
      return <ActivityIndicator color={"#fff"}  size={'large'}/>
    }

    return (
      <SafeAreaView>
        <ScrollView>
          <Text style={{color:"#000"}}>DetailScreen : {JSON.stringify(post.data.post)}</Text>
        </ScrollView>
      </SafeAreaView>
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
  
export default connect( mapStateToProps, null )(DetailScreen);