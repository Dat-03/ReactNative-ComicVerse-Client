import {makeStyles, normalize} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {fontFamilySetup} from '../../../utils/font';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    padding: normalize(24),
  },
  Headers: {
    marginTop: normalize(24),
    marginBottom: normalize(35),
  },
  marginError: {
    marginBottom: normalize(14),
  },
  titleInput: {
    fontSize: normalize(15),
    fontWeight: '500',
    fontFamily: 'Urbanist-Bold',
    color: colors.black,
    letterSpacing: normalize(0.2),
  },
  text2: {
    marginTop: normalize(8),
    color: colors.black,
    fontFamily: fontFamilySetup.medium,
    fontSize: normalize(15),
    lineHeight: normalize(22.4),
    letterSpacing: normalize(0.2),
  },
  viewCBFP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(3),
  },
  checkbox: {
    marginTop: normalize(-12),
    marginLeft: normalize(-19),
  },
  textCheckbox: {
    marginLeft: normalize(2),
    marginTop: normalize(-2),
    fontFamily: fontFamilySetup.medium,
    fontSize: normalize(15),
    color: colors.black,
  },
  viewBtnLogin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    borderRadius: normalize(30),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(24),
  },
  formContainer: {
    flex: 1,
  },
  textRM: {
    marginLeft: normalize(-10),
    marginTop: normalize(16),
    color: colors.black,
    fontFamily: fontFamilySetup.medium,
    fontSize: normalize(13),
    lineHeight: normalize(22.4),
    letterSpacing: normalize(0.2),
  },
  viewRow: {
    flexDirection: 'row',
  },
  viewBottom: {
    flex: normalize(0.93),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnContinue: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(18),
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: normalize(4),
      height: normalize(8),
    },
    shadowRadius: normalize(24),
    shadowOpacity: normalize(1),
    borderRadius: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(10),
    alignSelf: 'stretch',
  },
  textContinue: {
    color: colors.white,
    fontFamily: fontFamilySetup.bold,
    textAlign: 'center',
    fontSize: normalize(16),
    lineHeight: normalize(22.4),
    letterSpacing: normalize(0.2),
  },
}));
export default useStyles;
