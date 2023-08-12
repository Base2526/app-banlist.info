import React from 'react';
import {
  SectionList,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Platform,
  Button,
  StyleSheet
} from 'react-native';

// import { SearchBar, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import { addHistory, deleteHistory } from './actions/user';

class SearchScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        const { navigation, historys, deleteHistory } = props;

        console.log("SearchScreen :", navigation)
    }

    render() {
        return (
                <View style={styles.mainScreen}>
                {/* <SafeAreaView> */ }
                    <View style={{flexDirection:'row'}}>
                    <Text>SearchScreen</Text>

                    <Button
                        title="Go to Home"
                        onPress={() => 
                            this.props.navigation.navigate('home')
                        }
                    />
                    </View>
                {/* </SafeAreaView> */}
                </View>
                )
    }
}

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

export default SearchScreen