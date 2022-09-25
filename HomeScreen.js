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
    {/* </SafeAreaView> */}
    </View>
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

// export default HomeScreen;
const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps  :", state)
  return {
  }
};

export default connect( mapStateToProps, null )(HomeScreen);