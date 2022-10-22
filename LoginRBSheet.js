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
  Dimensions
} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import { gql, useQuery } from '@apollo/client'
import _ from "lodash"
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

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

const LoginRBSheet = (props) => {
    // const refRBSheet = useRef();
    const { width, height } = Dimensions.get('window');

    let {refRBSheet} = props

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: 'id, name,  first_name, last_name',
          },
        };
        const profileRequest = new GraphRequest(
          '/me',
          {token, parameters: PROFILE_REQUEST_PARAMS},
          (error, result) => {
            if (error) {
              console.log('login info has error: ' + error);
            } else {
              // this.setState({userInfo: result});
              console.log('result:', result);
            }
          },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    viewFB = () =>{
        return  <LoginButton
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        this.getInfoFromToken(accessToken);
                      });
                    }
                  }}
                  onLogoutFinished={() => this.setState({userInfo: {}})}
                />
    }

    googleSingUp = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn().then(result => { console.log(result) });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            alert('User cancelled the login flow !');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('Google play services not available or outdated !');
            // play services not available or outdated
          } else {
            console.log(error)
          }
        }
    };
    

    viewRBSheet = () =>{
        return <RBSheet
                  height={height-height/3}
                  ref={refRBSheet}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  customStyles={{
                    wrapper: {
                      backgroundColor: "transparent"
                    },
                    draggableIcon: {
                      backgroundColor: "red"
                    }
                  }}
                >
                  <View>
                    {viewFB()}

                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Standard}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={()=>googleSingUp()}
                        />
                  </View>
                </RBSheet>
    }

    return (
        <View style={styles.mainScreen}>
            {viewRBSheet()}    
        </View>
    )
}

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
  
  export default connect( mapStateToProps, null )(LoginRBSheet);