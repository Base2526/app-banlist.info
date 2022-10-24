import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  Button,
  NativeModules,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import BackgroundTimer from 'react-native-background-timer';

import { gql, useQuery } from '@apollo/client'
import { connect } from "react-redux";

//Import Call Detector
import CallDetectorManager from "react-native-call-detection";
// import { createAppContainer } from "react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import SplashScreen from 'react-native-splash-screen'
import _ from "lodash";
import FastImage from 'react-native-fast-image'
import moment from "moment";

import HomeTab from './HomeTab'
import CallLogsTab from './CallLogsTab'
import SmsTab from './SmsTab'
import SearchScreen from './SearchScreen'
import ProfileScreen from "./ProfileScreen"
import SettingScreen from "./SettingScreen"

import {HOST_GRAPHAL} from "./constants"

import { add_call_logs } from "./redux/actions/call_logs"
import { add_smss } from "./redux/actions/sms"
import { add_contacts } from "./redux/actions/contact"

import Entypo from 'react-native-vector-icons/Entypo'

import {secondsToHms} from "./Utils"

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Search"
//         onPress={() => 
//           // navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here' })
//         navigation.navigate('search')
        
//       }
//       />
//     </View>
//   );
// }

const DetailsScreen=({route, navigation})=> {

  // const { itemId, otherParam } = route.params;

  console.log("DetailsScreen :", route)
  return (
    <View >
      <Text>Details Screen </Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// BackgroundTimer.runBackgroundTimer(() => { 
//   //code that will be called every 3 seconds 
//   console.log(">> x")
//   }, 
//   3000);

const Stack = createNativeStackNavigator();
const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();

const HomeStackScreen =({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // if (  routeName == "result_search" || 
    //       routeName == "add_banlist" || 
    //       routeName == "search" || 
    //       routeName == "detail" ||
    //       routeName == "login" ||
    //       routeName == "forgot_password" ||
    //       routeName == "sign_up" ||
    //       routeName == "report" ||
    //       routeName == "filter" ){
    //     navigation.setOptions({tabBarVisible: false});
    // }else {
        // navigation.setOptions({tabBarVisible: true});
    // }

    // console.log("HomeStackScreen :", routeName)
  }, [navigation, route]);

  return (
    
    <HomeStack.Navigator
        // headerMode="screen"
        screenOptions={{
          // headerShown: false,
        }}>
        <HomeStack.Screen
          name="home"
          component={HomeTab} 
          // options={{  
                      // headerTitle: ' Home ', 
                      // headerStyle: {
                      //   backgroundColor: '#f4511e',
                      // },
                      // headerRight: () => (
                      //   <Button
                      //     onPress={() => alert('This is a button!')}
                      //     title="Info"
                      //     color="#fff"
                      //   />
                      // ),
                      // headerShown: true, 
                      // headerBackTitle: 'Back', 
                      // // headerMode: "screen",
                      // headerRight: () => (
                      //   <TouchableOpacity 
                      //     style={{ marginHorizontal: 10 }}
                      //     onPress={()=>{
                      //       navigation.navigate('search')
                      //     }}>
                      //     <Ionicons name="search" size={28} color="#000" />
                      //   </TouchableOpacity>
                      // )
          // }}
        />

        <HomeStack.Screen
          name="profile"
          component={ProfileScreen}
          options={{  
            headerTitle: 'Profile', 
          }}
        />

        {/* <HomeStack.Screen
          name="sms"
          component={SmsTab}
          options={{  
            headerTitle: 'SMS', 
          }}
        /> */}
        <HomeStack.Screen
          name="search"
          component={SearchScreen}
          options={{  
            headerTitle: 'Search', 
          }}
          // options={{
          //   title: 'Search',
          //   headerShown:false
          // }}
          // options={{
          //   headerShown: false,
          // }}
        />
        {/* 
        <HomeStack.Screen 
          name="result_search" 
          component={ResultScreen}
          // options={{ title: 'Result Search',  }}
          options={{
            title: 'Result search',
            tabBarVisible: false,
          }}
        />
        <HomeStack.Screen 
          name="add_banlist" 
          component={AddBanlistScreen} 
          options={{ title: 'Add Banlist' }}
        />
        <HomeStack.Screen 
          name="detail" 
          component={DetailScreen}
          // options={{ title: 'Result Search',  }}
          options={{
            title: 'Detail',
            tabBarVisible: false,
          }}
        />
        <HomeStack.Screen 
          name="login" 
          component={LoginScreen}
          options={{
            title: 'Login',
            tabBarVisible: false,
        }}/>
        <HomeStack.Screen 
          name="forgot_password" 
          component={ForgotPassword} 
          options={{ title: 'Forgot password' }}/>
        <HomeStack.Screen 
          name="sign_up" 
          component={SignUp} 
          options={{ title: 'Sign Up' }}/>  
        <HomeStack.Screen 
          name="report" 
          component={ReportScreen} 
          options={{ title: 'Report' }}/>  
        <HomeStack.Screen 
          name="filter" 
          component={FilterScreen} 
          options={{ title: '' }}/>  
          */}
    </HomeStack.Navigator>
  );
}

const CallLogsStackScreen =({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
  }, [navigation, route]);

  return (
    <HomeStack.Navigator screenOptions={{ }} >
        <HomeStack.Screen
          name="calllogs"
          component={CallLogsTab}
          options={{  
            headerTitle: 'Call Logs', 
            headerRight: () => (
              <TouchableOpacity 
                style={{ marginHorizontal: 10 }}
                onPress={()=>{
                  navigation.navigate('search')
                }}>
                <Entypo name="dots-three-vertical" size={24} color="#000" />
              </TouchableOpacity>
            )
          }}
        />
    </HomeStack.Navigator>
  );
}

const SMSStackScreen =({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
  }, [navigation, route]);

  return (
    <HomeStack.Navigator screenOptions={{}}>
      <HomeStack.Screen
          name="sms"
          component={SmsTab}
          options={{  
            headerTitle: 'SMS', 
          }}
        />
    </HomeStack.Navigator>
  );
}

const SettingStackScreen =({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // if (  routeName == "result_search" || 
    //       routeName == "add_banlist" || 
    //       routeName == "search" || 
    //       routeName == "detail" ||
    //       routeName == "login" ||
    //       routeName == "forgot_password" ||
    //       routeName == "sign_up" ||
    //       routeName == "report" ||
    //       routeName == "filter" ){
    //     navigation.setOptions({tabBarVisible: false});
    // }else {
        // navigation.setOptions({tabBarVisible: true});
    // }

    // console.log("HomeStackScreen :", routeName)
  }, [navigation, route]);

  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="setting"
        component={SettingScreen} 
        options={{  
                    headerTitle: 'Settings', 
                    // headerStyle: {
                    //   backgroundColor: '#f4511e',
                    // },
                    // headerRight: () => (
                    //   <Button
                    //     onPress={() => alert('This is a button!')}
                    //     title="Info"
                    //     color="#fff"
                    //   />
                    // ),
        }}
      />
      <SettingStack.Screen
        name="search"
        component={SearchScreen}
        options={{  
          headerTitle: 'Search', 
        }}
        // options={{
        //   title: 'Search',
        //   headerShown:false
        // }}
        // options={{
        //   headerShown: false,
        // }}
      />
    </SettingStack.Navigator>
  );
}


// import Home from "./src/Home";


const GET_LOCATIONS = gql`
query Query($userId: ID, $page: Long, $perPage: Long, $keywordSearch: String, $category: String) {
  homes(userId: $userId, page: $page, perPage: $perPage, keywordSearch: $keywordSearch, category: $category)
}
`;

const GET_HOMES = gql`
query Homes($userId: ID, $page: Long, $perPage: Long, $keywordSearch: String, $category: String) {
  homes(userId: $userId, page: $page, perPage: $perPage, keywordSearch: $keywordSearch, category: $category)
}
`;

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home
//   },
//   About: {
//     screen: Home
//   }
// });

// const AppContainer = createAppContainer(AppNavigator);

const Tab = createBottomTabNavigator();

const App = (props) => {
  const banlistInfoModule = NativeModules.BanlistInfoNativeModule

  // const { loading, error, data } = useQuery(GET_LOCATIONS , {
  //   variables: { "userId": "62a2f633cf7946010d3c74fc",
  //   "page": 0,
  //   "perPage": 1,
  //   "keywordSearch": "",
  //   "category": "" }
  // });
  // console.log("data >> :", loading, error, data)

  console.log("data >> :", moment.unix(1666342799032/1000).format("DD/MM/YYYY HH:mm:ss"), secondsToHms("6010") )

  
  // ค่อยรับค่าส่งมากจาก android & ios native
  DeviceEventEmitter.addListener('rnApp', (data) => {
    console.log("DeviceEventEmitter > rnApp :", data, props)
    switch(data.type){
      case "call-logs":{
        getCallLogs(props)
        break;
      }
      case "sms":{
        getSMS(props)
        break;
      }
    }
  });

  getContacts = (props) =>{
    if(props == null){
      return;
    }

    banlistInfoModule.getContacts((values)=>{
      console.log("getContacts : ", values, JSON.parse(values))

      if(!_.isEmpty(values)){

        props.add_contacts( _.map(JSON.parse(values), v=>v ))
      // add_contacts
        // props.add_contacts( _.map(JSON.parse(values), v=>{ return {"_id":v[0], 
        // "number":v[1],
        // "name":v[2], 
        // "type":v[3], 
        // "duration":v[4], 
        // "date":v[5]} }) )
      }
    })
  }

  getCallLogs = (props) =>{
    if(props == null){
      return;
    }

    banlistInfoModule.getCallLogs((values)=>{
      console.log("getCallLogs : ", values, JSON.parse(values), props)

      if(!_.isEmpty(values)){

        props.add_call_logs( _.map(JSON.parse(values), v=>v ) )
        // props.add_call_logs( _.map(JSON.parse(values), v=>{ return {"_id":v[0], 
        //                                                             "number":v[1],
        //                                                             "name":v[2], 
        //                                                             "type":v[3], 
        //                                                             "duration":v[4], 
        //                                                             "date":v[5]} }) )

        /*
        CallLog.Calls._ID,
        CallLog.Calls.NUMBER,
        CallLog.Calls.CACHED_NAME,
        CallLog.Calls.TYPE,
        CallLog.Calls.DURATION,
        CallLog.Calls.DATE
        */
      }
    })
  }
  
  getSMS = (props) =>{

    if(props == null){
      return;
    }

    banlistInfoModule.getSMS((values)=>{
      console.log("getSMS : ", values, JSON.parse(values))

      if(!_.isEmpty(values)){
        props.add_smss( _.map(JSON.parse(values), v=>v ) )

        /*
        Telephony.Sms.Inbox._ID,
        Telephony.Sms.Inbox.ADDRESS,
        Telephony.Sms.Inbox.TYPE,
        Telephony.Sms.Inbox.SUBJECT,
        Telephony.Sms.Inbox.BODY,
        Telephony.Sms.Inbox.DATE,
        Telephony.Sms.Inbox.DATE_SENT,
        Telephony.Sms.Inbox.READ,
        Telephony.Sms.Inbox.SEEN,
        Telephony.Sms.Inbox.STATUS
        */
      }
    })
  }

  useEffect(async()=>{

    await FastImage.preload([{ uri: 'https://app.box.com/shared/static/dz6tvgka56ub8xfii6v4516zco0bmvwq.jpg' }])

    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: "693724870615-m3htr43a3fsqn7trq3gm62fe9upokfj6.apps.googleusercontent.com", 
      offlineAccess: true
    });

    if (Platform.OS === 'android') {

      let configs = {"HOST_GRAPHAL": "http://"+ HOST_GRAPHAL +"/graphql"}

      banlistInfoModule.initConfigs(JSON.stringify(configs),(result)=>{
        console.log(result)
      })

      requestMultiple([PERMISSIONS.ANDROID.CALL_PHONE, 
                        PERMISSIONS.ANDROID.READ_PHONE_STATE,
                        PERMISSIONS.ANDROID.READ_CALL_LOG,
                        PERMISSIONS.ANDROID.RECEIVE_SMS,
                        PERMISSIONS.ANDROID.READ_SMS,
                        PERMISSIONS.ANDROID.READ_CONTACTS,
                    ]).then((statuses) => {
        console.log('CALL_PHONE', statuses[PERMISSIONS.ANDROID.CALL_PHONE]);
        console.log('READ_PHONE_STATE', statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE]);
        console.log('READ_CALL_LOG', statuses[PERMISSIONS.ANDROID.READ_CALL_LOG]);
        console.log('RECEIVE_SMS', statuses[PERMISSIONS.ANDROID.RECEIVE_SMS]);
        console.log('READ_SMS', statuses[PERMISSIONS.ANDROID.READ_SMS]);
        console.log('READ_CONTACTS', statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);

        getCallLogs(props)
        getSMS(props)
        getContacts(props)
      });
    }
  }, [])
  
  return (
    <NavigationContainer> 
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="Home" 
          component={HomeStackScreen} 
          options={({ route }) => ({
            tabBarBadge: 3,
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              console.log(routeName)
              if (routeName === 'search' ||
                  routeName === 'profile') {
                return { display: "none" }
              }
              return
            })(route),
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          })}/>
        <Tab.Screen 
          name="Call Logs" 
          component={CallLogsStackScreen} 
          options={({ route }) => ({
            tabBarBadge: 3,
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              console.log(routeName)
              if (routeName === 'search') {
                return { display: "none" }
              }
              return
            })(route),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" color={color} size={size} />
            ),
          })}/>
        <Tab.Screen 
          name="SMS" 
          component={SMSStackScreen} 
          options={({ route }) => ({
            tabBarBadge: 3,
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              console.log(routeName)
              if (routeName === 'search') {
                return { display: "none" }
              }
              return
            })(route),
            tabBarIcon: ({ color, size }) => (
              <Icon name="sms" color={color} size={size} />
            ),
          })}/>
        <Tab.Screen 
          name="Settings" 
          component={SettingStackScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }) }/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};


// Just some styles
const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
  },
});

// export default App;

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps  :", state)
  return {
    sms: state.sms,
    call_logs: state.call_logs
  }
};

const mapDispatchToProps = {
  add_contacts,
  add_call_logs,
  add_smss
}

export default connect( mapStateToProps, mapDispatchToProps )(App);