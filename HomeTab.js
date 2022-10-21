import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  NativeModules,
  DeviceEventEmitter,
  Modal,
  TouchableOpacity
} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import { gql, useQuery } from '@apollo/client'
import _ from "lodash"


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Toast, {DURATION} from './vendor/node_modules/react-native-easy-toast'
import ActionButton from './vendor/node_modules/react-native-action-button/ActionButton';


const GET_HOMES = gql`
query Homes($userId: ID, $page: Long, $perPage: Long, $keywordSearch: String, $category: String) {
  homes(userId: $userId, page: $page, perPage: $perPage, keywordSearch: $keywordSearch, category: $category)
}
`;

const images = [{
  // Simplest usage.
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

  // width: number
  // height: number
  // Optional, if you know the image size, you can set the optimization performance

  // You can pass props to <Image />.
  props: {
      // headers: ...
  }
}, 
// {
//   url: '',
//   props: {
//       // Or you can set source directory.
//       source: require('../background.png')
//   }
// }
]

const HomeTab = (props) => {
  const toastRef = useRef();

  const banlistInfoModule = NativeModules.BanlistInfoNativeModule

  const [modalVisible, setModalVisible] = useState(false)
  const [datas, setDatas] = useState([]);

  // ค่อยรับค่าส่งมากจาก android & ios native
  // DeviceEventEmitter.addListener('rnApp', (data) => {
  //   console.log("DeviceEventEmitter > rnApp :", [...datas, data])

  //   setDatas([...datas, data])
  // });

  const { loading, error, data }  = useQuery(GET_HOMES , {
    variables: { 
      "userId": "62a2f633cf7946010d3c74fc",
      "page": 0,
      "perPage": 100,
      "keywordSearch": "",
      "category": "" }
  });

  if(!loading){
    console.log("homes >> data.status :", data)
    if(data.homes.status){
      console.log("homes >> :", data.homes.status, data.homes.total, data.homes.executionTime)

      // setDatas(data.homes.data)
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      // banlistInfoModule.getCallLogs((values)=>{
      //   console.log("getCallLogs : ", values)

      //   if(!_.isEmpty(values)){
      //     setDatas(JSON.parse(values))
      //   }
      // })

      // banlistInfoModule.getSMS((values)=>{
      //   console.log("getSMS : ", values)

      //   if(!_.isEmpty(values)){
      //     // setDatas(JSON.parse(values))
      //   }
      // })

      // requestMultiple([PERMISSIONS.ANDROID.CALL_PHONE, 
      //                  PERMISSIONS.ANDROID.READ_PHONE_STATE,
      //                  PERMISSIONS.ANDROID.READ_CALL_LOG,
      //                  PERMISSIONS.ANDROID.RECEIVE_SMS,
      //                 // PERMISSIONS.ANDROID.POST_NOTIFICATIONS
      //               ]).then((statuses) => {
      //   console.log('CALL_PHONE', statuses[PERMISSIONS.ANDROID.CALL_PHONE]);
      //   console.log('READ_PHONE_STATE', statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE]);
      //   console.log('READ_CALL_LOG', statuses[PERMISSIONS.ANDROID.READ_CALL_LOG]);
      //   console.log('RECEIVE_SMS', statuses[PERMISSIONS.ANDROID.RECEIVE_SMS]);
      //   // console.log('POST_NOTIFICATIONS', statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS]);
      // });
    }

    // toastRef.current.show('Error Saving Image');

 
  }, []);

  // useEffect(()=>{
  //   console.log(">>> datas :", datas)
  // }, [datas])

  imageViewerHeader = () =>{
    return (<View style={[
                          { position:'absolute',
                            top:10,
                            right:10,
                            opacity: 0.5,
                            zIndex: 9999},
                          Platform.OS === 'ios' ? { paddingTop: 48 } : { }
                        ]}>
              <TouchableOpacity style={{ borderRadius: 20,  backgroundColor:'white', }}>
                <MaterialIcons
                  name='close'
                  style={{alignSelf: 'flex-end',
                          color: 'black',
                          fontSize: 30,
                          padding:5
                          }}
                  onPress={()=>{
                    setModalVisible(false)
                  }}/>
              </TouchableOpacity>
            </View>)
  }

  viewToast = () =>{
    return <Toast
            ref={toastRef} 
            position='bottom'
            positionValue={220}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}/>
  }

  viewActionButton = () =>{
    return  <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={() => { 
                setModalVisible(true)
                // console.log(this.props.user)
                // if(isEmpty(this.props.user)){
                //   this.setState({showModalLogin: true})
                // }else{
                //   navigation.navigate('add_banlist', { updateState: this.onUpdateState })
                // }
              }}/>
  }

  viewModal = () =>{
    return <Modal 
            visible={modalVisible} 
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            <ImageViewer 
              renderHeader={this.imageViewerHeader}
              enableSwipeDown={true}
              onSwipeDown={() => {
                setModalVisible(false)
              }}
              imageUrls={images}/>
          </Modal>
  }

  viewFlatList = () =>{
    return  <FlatList
              data={ datas }
              renderItem={({item}) =>{
                return renderItem(item)
              }}
            />
  }

  renderItem = (item) =>{
    return <Text style={styles.item} >{item.type} : {item.phoneNumber} :: {item.messages}</Text>
  }
  
  return (
    <View style={styles.mainScreen}>
      {viewFlatList()}
      {viewModal()}
      {viewToast()}
      {viewActionButton()}
    </View>
  );
  
};

// Just some styles
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

// export default HomeScreen;
const mapStateToProps = (state, ownProps) => {
  // console.log("mapStateToProps  :", state)
  return {
  }
};

export default connect( mapStateToProps, null )(HomeTab);