import {makeStyles, normalize} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {fontFamilySetup} from '../../../../../../utils/font';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textTitle: {
    fontSize: normalize(18),
    fontFamily: fontFamilySetup.bold,
    color: colors.black,
  },
}));

export default useStyles;
