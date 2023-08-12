import React, { useState, useEffect, Component} from "react";

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

export default class HomeScreen extends Component{
// const HomeScreen = ({ navigation }) => {
    render() {
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here'  })}
            />
        </View>
        )
        }
  }

//   export default HomeScreen;
  