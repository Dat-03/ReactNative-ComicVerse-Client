import {Header, Icon} from '@rneui/base';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import useStyles from './styles';
import {CustomHeaderProps} from './types';

const HeaderCustomV1: React.FunctionComponent<CustomHeaderProps> = props => {
  const styles = useStyles();
  return (
    <Header
      barStyle="dark-content"
      centerComponent={
        <Text style={props.titleStyle || styles.textTitle}>{props.title}</Text>
      }
      centerContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      containerStyle={styles.container}
      leftComponent={
        <View style={styles.viewRow}>
          <TouchableOpacity
            style={styles.viewiconLeft}
            onPress={props.onPressLeftIcon}>
            {props.leftIcon?.name && (
              <Icon
                type={props.leftIcon.type}
                name={props.leftIcon.name}
                size={30}
                color={props.leftIcon.color || styles.leftIcon.color}
              />
            )}
          </TouchableOpacity>

          {props.imageUri?.uri && (
            <Image
              style={styles.profileImage}
              source={{uri: `${props.imageUri.uri}`}}
            />
          )}
          <View style={styles.viewTextLeft}>
            <Text style={styles.textFullName}>{props.fullName}</Text>
            <Text style={styles.textUserStatus}>{props.userStatus}</Text>
          </View>
        </View>
      }
      leftContainerStyle={{justifyContent: 'center'}}
      linearGradientProps={{}}
      placement="left"
      rightComponent={
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.rightIconRight}
            onPress={props.onPressRightIconRight}>
            {props.rightIconRight?.name && (
              <Icon
                type={props.rightIconRight?.type}
                color={props.rightIconRight.color || styles.rightIcon.color}
                size={props.sizeIcon}
                name={props.rightIconRight?.name}
              />
            )}
          </TouchableOpacity>
        </View>
      }
      rightContainerStyle={{justifyContent: 'center'}}
      hideStatusBar={true}
      backgroundColor="transparent"
    />
  );
};
export default HeaderCustomV1;
