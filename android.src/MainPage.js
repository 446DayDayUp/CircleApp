import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './component/CustomTabBar.js';

export default class MainPage extends Component {
  render() {
    return <ScrollableTabView
      initialPage={1}
      renderTabBar={() => <CustomTabBar
        leftBtnLabel='Menu'
        rightBtnLabel='Search'/>}
    >
      <Text tabLabel='Tab #1'>tab content 1</Text>
      <Text tabLabel='Tab #2'>tab content 2</Text>
    </ScrollableTabView>;
  }
};