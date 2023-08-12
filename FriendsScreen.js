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


const FriendsScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Add friends here!</Text>
      <Button
          title="Back to home"
          onPress={() =>
            props.navigation.navigate('Home')
          }
        />
    </SafeAreaView>
  );
};

export default FriendsScreen;