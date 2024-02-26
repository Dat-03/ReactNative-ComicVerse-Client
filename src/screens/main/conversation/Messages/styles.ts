import { makeStyles, normalize } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { Device } from '../../../../utils';
import { fontFamilySetup } from '../../../../utils/font';

const WIDTH = Device.getDeviceWidth();
const HEIGHT = Device.getDeviceHeight();

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMessage,
  },
  body: {
    flex: 1,
    backgroundColor: colors.backgroundMessage,
    paddingHorizontal: normalize(12),
    paddingTop: normalize(3),
  },
  footer: {
    width: '100%',
    borderTopLeftRadius: normalize(16),
    borderTopRightRadius: normalize(16),
    backgroundColor: colors.white,
    alignSelf: 'center',
  },
  viewFLatlist: {
    width: '100%',
    height: normalize(HEIGHT * 0.84),
  },
  viewRow: {
    flexDirection: 'row',
  },
  profileImage: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(26),
    marginEnd: normalize(6),
  },
  viewText: {
    left: normalize(-14),
  },
  user: {
    alignItems: 'flex-end',
  },
  notuser: {
    alignItems: 'flex-start',
  },
  bubbleUser: {
    width: 'auto',
    maxWidth: normalize(600),
    borderRadius: normalize(15),
    marginVertical: normalize(5),
    padding: normalize(12),
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
    backgroundColor: colors.bubbleUserBackground,
  },
  bubbleNotUser: {
    width: 'auto',
    maxWidth: normalize(600),
    borderRadius: normalize(15),
    marginVertical: normalize(5),
    padding: normalize(12),
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    backgroundColor: colors.bubbleNotUserBackground,
  },
  textUser: {
    width: 'auto',
    maxWidth: normalize(200),
    flexWrap: 'wrap',
    fontFamily: fontFamilySetup.medium,
    fontSize: normalize(12),
    color: colors.blackDefault,
  },
  textNotUser: {
    width: 'auto',
    maxWidth: normalize(200),
    flexWrap: 'wrap',
    fontFamily: fontFamilySetup.medium,
    fontSize: normalize(12),
    color: colors.blackDefault,
  },
  styleTextLink: {
    color: colors.blue,
    textDecorationLine: 'underline',
    textDecorationColor: colors.blue,
    textDecorationStyle: 'dashed',
  },
  viewTime: {
    width: 'auto',
  },
  textTimeUser: {
    fontSize: normalize(8),
    fontFamily: fontFamilySetup.regular,
    marginBottom: normalize(18),
    alignSelf: 'flex-end',
    color: colors.black,
  },
  textTimeNotUser: {
    fontSize: normalize(8),
    fontFamily: fontFamilySetup.regular,
    marginBottom: normalize(18),
    alignSelf: 'flex-start',
    color: colors.black,
  },
  iconBack: {
    color: colors.black,
  },
  iconCall: {
    color: colors.black,
  },
  iconVideocam: {
    color: colors.black,
  },
  viewClearAll: {
    width: '100%',
    height: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: normalize(6),
  },
  btnArrowDown: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: normalize(90),
  },
  btnClearAll: {
    width: normalize(80),
    backgroundColor: colors.white,
  },
  textClearAll: {
    fontFamily: fontFamilySetup.bold,
    fontSize: normalize(14),
    color: colors.red,
    textAlign: 'center',
  },
  btnClose: {
    width: normalize(80),
    backgroundColor: colors.white,
  },
  textClose: {
    fontFamily: fontFamilySetup.bold,
    fontSize: normalize(14),
    color: 'blue',
    textAlign: 'center',
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(12),
    marginVertical: normalize(16),
  },
  rightIconLeft: {
    top: normalize(HEIGHT * 0.018),
    right: normalize(HEIGHT * 0.048),
  },
  rightIconRight: {
    top: normalize(HEIGHT * 0.018),
    right: normalize(HEIGHT * 0.01),
  },
  textInput: {
    width: normalize(WIDTH * 0.69),
    height: normalize(HEIGHT * 0.053),
    fontSize: normalize(15),
    fontFamily: fontFamilySetup.bold,
    paddingVertical: normalize(3),
    paddingStart: normalize(16),
    paddingEnd: normalize(48),
    borderRadius: normalize(26),
    borderWidth: 1,
    marginTop: normalize(HEIGHT * 0.008),
  },
  textInputHeightAutoLimit: {
    height: normalize(40),
  },
  viewFocus: {
    position: 'relative',
  },
  viewBlur: {
    height: normalize(HEIGHT * 0.04),
  },
  viewFocusSelectImage: {
    height: normalize(HEIGHT * 0.3),
  },
  viewEmoji: {
    height: normalize(HEIGHT * 0.4),
  },
  btnPB: {
    paddingBottom: normalize(36),
  },

  imageNoteUser: {
    width: normalize(36),
    height: normalize(36),
    marginTop: normalize(6),
    marginRight: normalize(12),
    borderRadius: normalize(100),
  },

  textStyle: {
    fontSize: normalize(16),
    marginLeft: normalize(12),
    color: colors.blackDefault,
    fontFamily: fontFamilySetup.bold,
  },
  iconStyle: {
    backgroundColor: colors.grey5,
    padding: normalize(8),
    borderRadius: normalize(1000),
  },

  viewEmojis: {
    width: '100%',
    height: normalize(HEIGHT * 0.38),
    // position: 'absolute',
  },

  iconScroll: {
    color: colors.black,
  },

  emojiSelector: {
    backgroundColor: colors.black,
  }
}));

export default useStyles;
