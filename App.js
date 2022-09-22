// How to Detect Call States in React Native App
// https://aboutreact.com/detect-call-states/

//Import React
import React, { useState, useEffect } from "react";

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


import { gql, useQuery } from '@apollo/client'

//Import Call Detector
import CallDetectorManager from "react-native-call-detection";
// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from 'react-navigation-stack'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here'  })}
      />
    </View>
  );
}

const DetailsScreen=({route, navigation})=> {

  const { itemId, otherParam } = route.params;

  console.log("DetailsScreen :", itemId, otherParam)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen {itemId} {otherParam}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const Stack = createNativeStackNavigator();




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
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  );
  
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    color:"#e1e1e1"
  },
  header: {
    backgroundColor: "#ff8c21",
    padding: 10
  },
  headerTextLarge: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  headerText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 18,
    color: "white"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ff8c21",
    padding: 10,
    justifyContent: "center",
    height: 60,
    width: "100%"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white"
  },
  callLogs: {
    padding: 16,
    fontSize: 16,
    color: "#333333"
  },
  fabStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "yellow"
  },
  fabImageStyle: {
    resizeMode: "contain",
    width: 20,
    height: 20
  }
});
