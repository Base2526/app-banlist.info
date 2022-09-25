// How to Detect Call States in React Native App
// https://aboutreact.com/detect-call-states/

//Import React
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

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

// import { DeleteOutlineOutlined } from "@material-ui/icons";

import Ionicons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/FontAwesome';


const HomeScreen = (props) => {

  // React.useLayoutEffect(() => {
  //   this.props.navigation.setOptions({
  //     headerRight: () => (
  //       <Button title="Update count" />
  //     ),
  //   });
  // }, [this.props.navigation]);
  
  return (
    <View style={styles.mainScreen}>
    {/* <SafeAreaView style={{ flex: 1 }}> */}
      <Text>You have (undefined) friends.</Text>
      <Button
          title="Go to Search"
          onPress={() =>
            props.navigation.navigate('search')
          }
        />
        {/* <Ionicons size={30} color="#900" /> */}
        <Icon name="rocket" size={30} color="#900" />
    {/* </SafeAreaView> */}
    </View>
  );
  
};

// Just some styles
const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  name: {
    fontSize: 20,
  },
});

// export default HomeScreen;
const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps  :", state)
  return {
  }
};

export default connect( mapStateToProps, null )(HomeScreen);