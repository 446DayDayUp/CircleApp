import {
  StyleSheet,
  Dimensions,
} from 'react-native';

exports.listItemStyle = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    padding: 5,
  },
  iconView: {
    width: 40,
    height: 40,
  },
  msgContainerRecv: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 5,
    //justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
  },
  msgText: {
    maxWidth: Dimensions.get('window').width - 150,
    flexWrap: 'wrap',
    color: 'black',
    fontSize: 15,
    lineHeight: 24,
  },
  containerSend: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  },
  noticeText: {
    fontSize: 15,
    color: '#A4A4A4',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  audioContainerRecv: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 3,
    marginLeft: 5,
    width: 100,
  },
  audioContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
    width: 100,
  },
  audioMsgRecvIcon: {
    transform: [{ rotate: '90deg' }],
  },
  audioMsgSendIcon: {
    transform: [{ rotate: '270deg' }],
  },
  smallpicture: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
