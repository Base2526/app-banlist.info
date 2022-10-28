import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Linking,
  Image,
} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import { gql, useQuery } from '@apollo/client'
import _ from "lodash"
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { useNavigation } from '@react-navigation/native'
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Entypo from 'react-native-vector-icons/Entypo'

import MasonryList from '@react-native-seoul/masonry-list';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

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


const datax = [
  {
    id: 'id123',
    imgURL:
      'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Pioneer LHS Chaise Lounger in Grey Colour',
  },
  {
    id: 'id124',
    imgURL:
      'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
    text: 'Precedant Furniture',
  },
  {
    id: 'id125',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
    text: 'Leverette Upholstered Platform Bed',
  },
  {
    id: 'id126',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
    text: 'Briget Accent Table',
  },
  {
    id: 'id127',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Rivet Emerly Media Console',
  },
  {
    id: 'id128',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Drew Barrymore Flower Home Accent Chair',
  },
  {
    id: 'id129',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Ecobirdy Charlie Chair',
  },
  {
    id: 'id130',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*',
    text: 'Hailey Sofa',
  },
  {
    id: 'id131',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*',
    text: 'Farmhouse Dining Table',
  },
  {
    id: 'id132',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Evelyn Coffee Table',
  },
  {
    id: 'id133',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Slope Nomad Leather Sofa',
  },
  {
    id: 'id134',
    imgURL:
      'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    text: 'Chair and Table',
  },
  {
    id: 'id223',
    imgURL:
      'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Pioneer LHS Chaise Lounger in Grey Colour',
  },
  {
    id: 'id224',
    imgURL:
      'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
    text: 'Precedant Furniture',
  },
  {
    id: 'id225',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
    text: 'Leverette Upholstered Platform Bed',
  },
  {
    id: 'id226',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
    text: 'Briget Accent Table',
  },
  {
    id: 'id227',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Rivet Emerly Media Console',
  },
  {
    id: 'id228',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Drew Barrymore Flower Home Accent Chair',
  },
  {
    id: 'id229',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Ecobirdy Charlie Chair',
  },
  {
    id: 'id230',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*',
    text: 'Hailey Sofa',
  },
  {
    id: 'id231',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*',
    text: 'Farmhouse Dining Table',
  },
  {
    id: 'id232',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Evelyn Coffee Table',
  },
  {
    id: 'id233',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Slope Nomad Leather Sofa',
  },
  {
    id: 'id234',
    imgURL:
      'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    text: 'Chair and Table',
  },
];

const HomeTab = (props) => {
  const toastRef = useRef();
  const refRBSheet = useRef();
  const menuRef = useRef();

  const banlistInfoModule = NativeModules.BanlistInfoNativeModule

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false)
  const [datas, setDatas] = useState([]);

  const [collapsed, setCollapsed] = useState(false);

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
      "perPage": 50,
      "keywordSearch": "",
      "category": "" }
  });

  useEffect(() => {
    

    navigation.setOptions({
      // headerTitle: 'Home', 
      headerTitle: () =>  <View style={{alignItems:'center', flexDirection: "row"}}>
                            <TouchableOpacity style={{paddingRight: 10}} onPress={()=>navigation.navigate('profile')}>
                              <FastImage
                                style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: "thistle",}}
                                source={{
                                    uri: "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                              />
                            </TouchableOpacity>
                            <Text style={{fontSize: 22, fontWeight: "400", color:"#000"}}>Home</Text>
                          </View>,
      headerRight: () => 
      <View style={{justifyContent:'center', paddingRight:5, flexDirection: "row"}}>
        <TouchableOpacity 
          style={{}}
          onPress={()=>{
            navigation.navigate('search')
          }}>
          <Ionicons name="search" size={28} color="#000" />
        </TouchableOpacity>
        <Menu
          ref={menuRef} 
          button={
            <TouchableOpacity 
              style={{ marginHorizontal: 10, paddingLeft:5 }}
              onPress={()=>{ 
                menuRef.current?.show()
              }}>
            <Entypo name="dots-three-vertical" size={28} color={'#000'}  />
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

              // Performance settings
              removeClippedSubviews={true} // Unmount components when outside of window 
              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={100} // Increase time between renders
              windowSize={7} // Reduce the window size
            />
    }else{
      return <ActivityIndicator color={"#fff"}  size={'large'}/>
    }
  }

  // renderItem = (item) =>{

  //   // _.find(item.p)

    
  //   return  <View style={{borderColor:'red',borderBottomWidth:1,borderTopWidth:1, padding: 5, marginBottom:5}}>
  //              <TouchableOpacity
  //                 onPress={()=>{
  //                   console.log("Home onPress")
  //                   if (Platform.OS !== 'android') {
  //                     Linking.openURL(`telprompt:0988264820`)
  //                   }
  //                   else  {
  //                     Linking.openURL(`tel:0988264820`)
  //                   }
                    
  //                 }}>
  //               <Text style={styles.item}>{item.title} : {item.nameSubname}</Text>
  //             </TouchableOpacity>
  //           </View>
  // }
  
  const renderItem = ({item, i}) => {
    return (
      <FurnitureCard item={item}  style={{ /*arginLeft: i % 2 === 0 ? 0 : 12*/ }} />
    );
  };

  const FurnitureCard = ({item, style}) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);
    // const {theme} = useTheme();

    return (
      <View key={item.id} style={[{marginTop: 5, flex: 1 }, style]}>
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
        <Text
          style={{
            marginTop: 8,
            // color: theme.text,
            borderWidth: 1,
            borderColor: "thistle",
            color: "black"
          }}
          onPress={()=>setCollapsed(!collapsed)}
        >
          {item.title}
        </Text>

        <Collapsible collapsed={collapsed}>
            <View  /*style={styles.content}*/>
              <Animatable.Text
                animation={collapsed ? undefined : 'zoomIn'}
                duration={300}
                useNativeDriver
              >
                Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                ribs
              </Animatable.Text>
            </View>
          </Collapsible>
      </View>
    );
  };

  return (
    <View style={styles.mainScreen}>
      {
      loading
      ? <ActivityIndicator color={"#fff"}  size={'large'}/>
      : <MasonryList
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          paddingHorizontal: 5,
          alignSelf: 'stretch',
        }}
        numColumns={1}
        data={data.homes.data}
        renderItem={renderItem}
      />
      }
       
    </View>
  )

  return2 (
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