
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import tags from '../data/AvailableTags.json';

export default class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: this.props.passTagsToTagsComp,
    };
    this.allTags = tags;
    this.renderTags = this.renderTags.bind(this);
    this.renderCheckBox = this.renderCheckBox.bind(this);
  }

  selectTag(tag) {
    let tagIndex = this.state.selectedTags.indexOf(tag);
    if (tagIndex < 0) {
      // Tag was not selected.
      this.setState({
        selectedTags: [
          ...this.state.selectedTags,
          tag,
        ],
      });
    } else {
      // for all t in selectedTags,
      //   1. t != tag;
      //   2. if tag is one of the major tag, t is not in tag;
      //      otherwise, no need to check
      this.setState({
        selectedTags: this.state.selectedTags.filter((t) => t !== tag &&
          ((this.allTags[tag] && this.allTags[tag].indexOf(t) < 0)
            || !this.allTags[tag])),
      });
    }
    setTimeout(() => this.props.passTagsFromTagsComp(this.state.selectedTags), 100);
  }

  renderTags(tag, index) {
    return(
      <View key = {index}>
        <View style = {{flex: 1}}>
          <View style = {{flex: 1}}>
            {this.renderCheckBox(tag)}
          </View>
          <View style = {styles.subTagLayout}>
            {this.state.selectedTags.indexOf(tag) >= 0 ?
              this.allTags[tag].map(function(subTag) {
                return this.renderCheckBox(subTag);
              }.bind(this)) : null}
          </View>
        </View>
      </View>
    );
  }

  renderCheckBox(tag) {
    return (
      <CheckBox
        key = {tag}
        style = {{flex: 1, padding: 10}}
        onClick = {() => this.selectTag(tag)}
        isChecked = {this.state.selectedTags.indexOf(tag) >= 0}
        leftText = {tag}
      />);
  }

  render() {
    return (
      <View style = {styles.container}>
        <ScrollView>
          {Object.keys(this.allTags).map(this.renderTags)}
        </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 30
  },
  subTagLayout: {
    marginLeft: 50,
    flex: 1,
  },
});
