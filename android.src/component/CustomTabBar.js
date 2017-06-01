import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  ViewPropTypes,
  TouchableNativeFeedback,
  Button,
} from 'react-native';


const CustomTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      activeBackgroundColor: 'black',
      inactiveBackgroundColor: null,
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, activeBackgroundColor, inactiveBackgroundColor } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const backgroundColor = isTabActive ? activeBackgroundColor : inactiveBackgroundColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    return <TouchableNativeFeedback
      style={[styles.flexOne, {background: 'black'}]}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </TouchableNativeFeedback>;
  },

  renderBtn(label) {
    if (!label) return null;
    return <Button style={styles.flexOne} title={label}
      onPress={() => {}}/>
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      // position: 'absolute',
      // width: containerWidth / (numberOfTabs + 2),
      // height: 4,
      // backgroundColor: 'navy',
      // bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.renderBtn(this.props.leftBtnLabel)}
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        {this.renderBtn(this.props.rightBtnLabel)}
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

module.exports = CustomTabBar;
