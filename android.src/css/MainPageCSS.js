import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({
    tab: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.01)',
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
        //padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        flex: 1,
        // borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: Dimensions.get("window").height - 100,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    flexOne: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
      backgroundColor: '#ff5722',
      borderColor: '#ff5722',
      borderWidth: 1,
      height: 70,
      width: 70,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      right:20,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0,
      }
    }
});
