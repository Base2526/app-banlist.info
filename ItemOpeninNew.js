import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  SectionList,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Platform,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import _ from "lodash"
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ItemOpeninNew = (props) => {
  let {onPress} = props
  return (<TouchableOpacity style={{padding:10}} onPress={onPress}>
            <MaterialIcons name="open-in-new" size={28} color="#000" />
          </TouchableOpacity>)
}

export default ItemOpeninNew