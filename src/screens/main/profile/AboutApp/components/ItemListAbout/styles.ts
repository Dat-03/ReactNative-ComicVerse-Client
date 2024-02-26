import { makeStyles, normalize } from '@rneui/themed';
import { Device } from '../../../../../../utils';
import { fontFamilySetup } from '../../../../../../utils/font';

const WIDTH = Device.getDeviceWidth();
const HEIGHT = Device.getDeviceHeight();

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    gap: normalize(20),
  },
}));
export default useStyles;
