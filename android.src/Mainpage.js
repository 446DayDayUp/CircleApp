import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

const FacebookTabBar = React.createClass({
    tabIcons: [],

    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            backgroundColor: null,
        };
    },

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    },

    setAnimationValue({ value }) {
        this.tabIcons.forEach((icon, i) => {
            const progress = Math.min(1, Math.abs(value - i));
            icon.setNativeProps({
                style: {
                    color: this.iconColor(progress),
                },
            });
        });
    },

    // color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
        const red = 216 + (204 - 216) * progress;
        const green = 19 + (204 - 19) * progress;
        const blue = 19 + (204 - 19) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    },

    render() {
        return <View style={[styles.tabs, this.props.style]}>
            {this.props.tabs.map((tab, i) => {
                if(i == 2 || i == 1) {
                    return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                        <Icon
                            name={tab}
                            size={30}
                            color={this.props.activeTab === i ? 'rgb(216, 19, 19)' : 'rgb(204,204,204)'}
                            ref={(icon) => {
                                this.tabIcons[i] = icon;
                            }}
                        />
                    </TouchableOpacity>;
                } else {
                    return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab2}>
                        <Icon
                            name={tab}
                            size={30}
                            color={this.props.activeTab === i ? 'rgb(216, 19, 19)' : 'rgb(204,204,204)'}
                            ref={(icon) => {
                                this.tabIcons[i] = icon;
                            }}
                        />
                    </TouchableOpacity>;
                }
            })}
        </View>;
    },
});

class MainPage extends Component {
    render() {
        return(
            <ScrollableTabView
                scrollWithoutAnimation = {true}
                initialPage={1}
                renderTabBar={() => <FacebookTabBar />}
            >
                <ScrollView tabLabel="md-person" style={styles.tabView}>
                    <View style={styles.card2}>
                        <Text>Friends</Text>
                    </View>
                </ScrollView>

                <ScrollView tabLabel="ios-chatbubbles" style={styles.tabView} >
                    <View style={styles.card}>
                        <Text>Friends</Text>
                    </View>
                </ScrollView>

                <ScrollView tabLabel="md-wifi" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Other nav</Text>
                    </View>
                </ScrollView>

                <ScrollView tabLabel="md-search" style={styles.tabView}>
                    <View style={styles.card2}>
                        <Text>Other nav</Text>
                    </View>
                </ScrollView>

            </ScrollableTabView>
        );
}
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    tab2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.01)',
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 530,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    card2: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 300,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});

export default MainPage;
