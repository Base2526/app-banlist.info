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


const HomeScreen = (props) => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>You have (undefined) friends.</Text>
      <Button
          title="Add some friends"
          onPress={() =>
            props.navigation.navigate('Friends')
          }
        />
    </SafeAreaView>
  );
  
};

export default HomeScreen;

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
