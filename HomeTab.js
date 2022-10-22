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
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Linking
} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import { gql, useQuery } from '@apollo/client'
import _ from "lodash"
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import Toast, {DURATION} from './vendor/node_modules/react-native-easy-toast'
import ActionButton from './vendor/node_modules/react-native-action-button/ActionButton';

import LoginRBSheet from "./LoginRBSheet"


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
  const refRBSheet = useRef();

  const banlistInfoModule = NativeModules.BanlistInfoNativeModule

  const [modalVisible, setModalVisible] = useState(false)
  const [datas, setDatas] = useState([]);

  const { width, height } = Dimensions.get('window');

  // ค่อยรับค่าส่งมากจาก android & ios native
  // DeviceEventEmitter.addListener('rnApp', (data) => {
  //   console.log("DeviceEventEmitter > rnApp :", [...datas, data])

  //   setDatas([...datas, data])
  // });

  const { loading, error, data }  = useQuery(GET_HOMES , {
    variables: { 
      "userId": "62a2f633cf7946010d3c74fc",
      "page": 0,
      "perPage": 4,
      "keywordSearch": "",
      "category": "" }
  });

  useEffect(() => {
   
  }, []);

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
                // setModalVisible(true)

                refRBSheet.current.open()

                // GoogleSingUp()

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

    if(!loading && data.homes.status){
      // console.log("homes >> :", data.homes.status, data.homes.total, data.homes.executionTime)
  
      // setDatas(data.homes.data)
      return  <FlatList
              data={ data.homes.data }
              renderItem={({item}) =>{
                // console.log("item :", item)
                return renderItem(item)
              }}
            />
    }else{
      return <ActivityIndicator color={"#fff"}  size={'large'}/>
    }
  }

  renderItem = (item) =>{
    return  <View style={{borderColor:'red',borderBottomWidth:1,borderTopWidth:1, padding: 5, marginBottom:5}}>
               <TouchableOpacity
                  onPress={()=>{
                    console.log("Home onPress")
                    if (Platform.OS !== 'android') {
                      Linking.openURL(`telprompt:0988264820`)
                    }
                    else  {
                      Linking.openURL(`tel:0988264820`)
                    }
                    
                  }}>
                <Text style={styles.item}>{item.title} : {item.nameSubname}</Text>
              </TouchableOpacity>
            </View>
  }
  
  return (
    <View style={styles.mainScreen}>
      {viewFlatList()}
      {viewModal()}
      {viewToast()}
      {viewActionButton()}

      
      <LoginRBSheet 
        refRBSheet={refRBSheet}/>
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