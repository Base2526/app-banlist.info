// How to Detect Call States in React Native App
// https://aboutreact.com/detect-call-states/

//Import React
import React, { useState, useEffect, useLayoutEffect } from "react";

//Import required component
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
  Button
} from "react-native";
import BackgroundTimer from 'react-native-background-timer';

import { gql, useQuery } from '@apollo/client'

//Import Call Detector
import CallDetectorManager from "react-native-call-detection";
// import { createAppContainer } from "react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from './HomeScreen'
import SearchScreen from './SearchScreen'

import SettingScreen from "./SettingScreen"

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

BackgroundTimer.runBackgroundTimer(() => { 
  //code that will be called every 3 seconds 
  console.log(">> x")
  }, 
  3000);

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

    console.log("HomeStackScreen :", routeName)
  }, [navigation, route]);

  return (
    
    <HomeStack.Navigator
        // headerMode="screen"
        screenOptions={{
          // headerShown: false,
          
        }}
        >
        <HomeStack.Screen
          name="home"
          component={HomeScreen} 
          options={{  
                      headerTitle: ' Home ', 
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
          //             // headerShown: true, 
          //             // headerBackTitle: 'Back', 
          //             // // headerMode: "screen",
          //             // headerRight: () => (
          //             //   <TouchableOpacity 
          //             //     style={{ marginHorizontal: 10 }}
          //             //     onPress={()=>{
          //             //       navigation.navigate('search')
          //             //     }}>
          //             //     <Ionicons name="search-outline" size={28}  />
          //             //   </TouchableOpacity>
                    
          //             // )
          }}
        />
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

    console.log("HomeStackScreen :", routeName)
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

const App = () => {
  //to keep callDetector reference
  let callDetector = undefined;

  let [text, setText] = useState(undefined);

  let [callStates, setCallStates] = useState([]);
  let [isStart, setIsStart] = useState(false);
  let [flatListItems, setFlatListItems] = useState([]);

  const { loading, error, data } = useQuery(GET_LOCATIONS , {
    variables: { "userId": "62a2f633cf7946010d3c74fc",
    "page": 0,
    "perPage": 1,
    "keywordSearch": "",
    "category": "" }
  });
  console.log("data >> :", loading, error, data)

  // 

  useEffect(()=>{
    setText(data)
  }, [data])

  const callFriendTapped = () => {
    // Linking.openURL("tel:5555555555").catch((err) => {
    //   console.log(err);
    // });


    /*
    
    */
    
  };

  const startStopListener = () => {
    if (isStart) {
      console.log("Stop");
      callDetector && callDetector.dispose();
    } else {
      console.log("Start");
      callDetector = new CallDetectorManager(
        (event, number) => {
          console.log("event -> ", event + (number ? " - " + number : ""));
          var updatedCallStates = callStates;
          updatedCallStates.push(event + (number ? " - " + number : ""));
          setFlatListItems(updatedCallStates);
          setCallStates(updatedCallStates);

          // For iOS event will be either "Connected",
          // "Disconnected","Dialing" and "Incoming"

          // For Android event will be either "Offhook",
          // "Disconnected", "Incoming" or "Missed"
          // phoneNumber should store caller/called number

          if (event === "Disconnected") {
            // Do something call got disconnected
          } else if (event === "Connected") {
            // Do something call got connected
            // This clause will only be executed for iOS
          } else if (event === "Incoming") {
            // Do something call got incoming

            Alert.alert(
              //title
              'Hello',
              //body
              'I am two option alert. Do you want to cancel me ?',
              [
                {
                  text: 'Yes',
                  onPress: () => console.log('Yes Pressed')
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'), style: 'cancel'
                },
              ],
              {cancelable: false},
              //clicking out side of alert will not cancel
            );

          } else if (event === "Dialing") {
            // Do something call got dialing
            // This clause will only be executed for iOS
          } else if (event === "Offhook") {
            //Device call state: Off-hook.
            // At least one call exists that is dialing,
            // active, or on hold,
            // and no calls are ringing or waiting.
            // This clause will only be executed for Android
          } else if (event === "Missed") {
            // Do something call got missed
            // This clause will only be executed for Android
          }
        },
        true, // To detect incoming calls [ANDROID]
        () => {
          // If your permission got denied [ANDROID]
          // Only if you want to read incoming number
          // Default: console.error
          console.log("Permission Denied by User");
        },
        {
          title: "Phone State Permission",
          message:
            "This app needs access to your phone state in order to react and/or to adapt to incoming calls."
        }
      );
    }
    setIsStart(!isStart);
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#ebebeb"
        }}
      />
    );
  };

  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <View style={styles.container}>
  //       <View style={styles.header}>
  //         {/* <Text style={styles.headerText}>https://www.banlist.info</Text> */}
  //         <Text style={styles.headerText}>{text===undefined ? "1" : text.homes.executionTime + " | " + text.homes.total }</Text>
  //       </View>
  //       <FlatList
  //         style={{ flex: 1 }}
  //         data={flatListItems}
  //         ItemSeparatorComponent={listSeparator}
  //         renderItem={({ item }) => (
  //           <View style={{ flex: 1 }}>
  //             <Text style={styles.callLogs}>{JSON.stringify(item)}</Text>
  //           </View>
  //         )}
  //         keyExtractor={(item, index) => index.toString()}
  //       />

          
 
  //       <TouchableOpacity style={styles.button} onPress={startStopListener}>
  //         <Text style={styles.buttonText}>
  //           {isStart ? "Stop Listner" : "Start Listener"}
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         activeOpacity={0.7}
  //         // onPress={callFriendTapped}
  //         onPress={(e)=>{
  //           console.log("onPress")
  //         }}
  //         style={styles.fabStyle}
  //       >
  //         <Image
  //           source={{
  //             uri:
  //               "https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_phone.png"
  //           }}
  //           style={styles.fabImageStyle}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   </SafeAreaView>
  // );

  // return <AppContainer />;

  
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
              if (routeName === 'search') {
                return { display: "none" }
              }
              return
            })(route),
          })}/>
        <Tab.Screen name="Settings" component={SettingStackScreen} />
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

export default App;