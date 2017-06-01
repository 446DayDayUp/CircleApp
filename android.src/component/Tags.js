
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
} from 'react-native'
import CheckBox from 'react-native-check-box'
import tags from './AvailableTags.json'
import Toast from 'react-native-easy-toast'

export default class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: []
        }
        this.allTags = tags;
        this.renderTags = this.renderTags.bind(this);
        this.renderCheckBox = this.renderCheckBox.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            dataArray: tags
        })
    }

    selectTag(tag) {
      let tagIndex = this.state.selectedTags.indexOf(tag);
      if  (tagIndex < 0) {
        // Tag was not selected.
        this.setState({
          selectedTags: [
            ...this.state.selectedTags,
            tag,
          ],
        })
      } else {
        this.setState({
          selectedTags: this.state.selectedTags.filter((t) => t !== tag)
        });
      }
      setTimeout(() => this.props.passTags(this.state.selectedTags), 100);
    }

    renderTags(tag, index) {
      return(
        <View key = {index}>
            <View style = {{flex: 1}}>
                <View style = {styles.level1}>
                    {this.renderCheckBox(tag)}
                </View>
                <View style = {styles.level2}>
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
                <Toast ref={e=>{this.toast=e}}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop:30
    },
    level1: {
        flex: 1,
    },
    level2: {
        marginLeft: 50,
        flex: 1,
    },
    item: {
        flexDirection: 'row',
    },
    horizontalLine: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})