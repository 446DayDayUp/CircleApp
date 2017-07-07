import React from 'react';
import { Animated, View, Easing } from 'react-native';

export default class FadeInView extends React.Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  };

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })
    return (
      <Animated.View
        style={{
          opacity: opacity,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}