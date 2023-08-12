import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  SectionList,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Platform,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import _ from "lodash"
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native'

import ItemBookmark from "./ItemBookmark"
import ItemComment from "./ItemComment"
import ItemShare from "./ItemShare"
import ItemExpand from "./ItemExpand"
import ItemOpeninNew from "./ItemOpeninNew"

const HomeItem = (props) => {
    const navigation = useNavigation();
    const [collapsed, setCollapsed] = useState(true);

    let {item, style, toastRef, onShowImageViewer} = props

    return (
        <View key={item._id} style={[{marginTop: 5, flex: 1, borderWidth:1 , borderColor: "thistle", color: "black" }, style]}>
        <TouchableOpacity
          onPress={(event)=>{
            onShowImageViewer(item.files)
          }}>
          <Image
            source={{uri: !_.isEmpty(item.files) ? item.files[0].url : ""}}
            style={{
              // height: randomBool ? 150 : 280,
              height: 280,
              alignSelf: 'stretch',
              borderWidth: 1,
              borderColor: "thistle",
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text
          style={{ marginTop: 8, borderWidth: 1, borderColor: "thistle", color: "black" }}
          onPress={()=>console.log("title")}>
          {item.title}
        </Text>
        <Collapsible collapsed={collapsed}>
          <View  /*style={styles.content}*/>
            <Animatable.Text
              // animation={collapsed ? undefined : 'zoomIn'}
              duration={300}
              useNativeDriver
              style={{ borderColor: "thistle", color: "black", borderWidth: 1 }}>
              {item.description}
            </Animatable.Text>
          </View>
        </Collapsible>
        <View style={{flexDirection:"row", borderWidth:1 ,borderColor: "thistle", color: "black"}}>
          <ItemBookmark onPress={(event)=>{
            toastRef.current.show("Bookmark")
          }}/>
          <ItemComment onPress={(event)=>{
            toastRef.current.show("Comment")
          }}/>
          <ItemShare onPress={(event)=>{
            toastRef.current.show("Share")
          }}/>
          <ItemOpeninNew onPress={(event)=>{
              navigation.push('detail', { _id: item._id })
          }}/>
          <ItemExpand collapsed={collapsed} onPress={(event)=>setCollapsed(!collapsed)}/>
        </View>
      </View>
      )
}

export default HomeItem