import {Avatar, Icon, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {AuthActions, getAuthUserProfile} from '../../../redux';
import {showToastError, showToastSuccess} from '../../../utils';
import ModalWrapContent from '../ModalWrapContent';
import useStyles from './styles';
import {AvatarProps} from './type';

const AnimatedView = Animated.createAnimatedComponent(View);

const AvatarComponets: React.FunctionComponent<AvatarProps> = props => {
  const styles = useStyles();
  const user = useAppSelector(getAuthUserProfile);

  const dispatch = useAppDispatch();

  const [selectImageCamera, setSelectImageCamera] = useState('');
  const [selectImageGallery, setSelectImageGallery] = useState('');

  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  // animation
  const progress = useSharedValue(0.5);

  // when is show changed => run animation and reverse animation
  useEffect(() => {
    if (isZoomed) {
      progress.value = withSpring(1);
    } else {
      progress.value = withSpring(0.5);
    }
  }, [isZoomed]);

  // when animation run => update overlayStyle
  const overlayStyle = useAnimatedStyle(() => {
    const background = interpolateColor(
      progress.value,
      [0, 1, 0],
      ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.6)'],
    );

    return {
      backgroundColor: background,
    };
  }, []);

  // when animation run => update containerStyle
  const containerStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1, 0],
      [0.3, 1, 0.3],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale: scale}],
    };
  }, []);

  //show menu choose image
  const [isShow, setIsShow] = useState<boolean>(false);
  const toggleShow = () => setIsShow(!isShow);

  const optionCamera: ImagePicker.CameraOptions = {
    mediaType: 'mixed',
    cameraType: 'front',
    quality: 1,
    saveToPhotos: true,
    includeBase64: false,
    maxWidth: 500,
    maxHeight: 500,
  };

  const optionLibrary: ImagePicker.ImageLibraryOptions = {
    mediaType: 'mixed',
    quality: 1,
    selectionLimit: 1,
    includeBase64: false,
    maxWidth: 500,
    maxHeight: 500,
  };

  const handleCamera = async () => {
    setIsShow(false);

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const result = await launchCamera(optionCamera);
        if (result?.assets && result.assets[0].uri) {
          const formdata = new FormData();
          formdata.append('avatar', {
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
            type: result.assets[0].type,
          });
          handleUploadImage(formdata);
          setSelectImageCamera(result.assets[0].uri);
          showToastSuccess('Image taken successfully');
        } else {
          showToastError('User cancelled launchCamera!');
        }
      } else {
        showToastError('Camera permission denied!');
      }
    } catch (error) {
      console.warn(error);
    }
    setIsShow(false);
  };

  const handleGallery = async () => {
    setIsShow(false);

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'Your app needs access to your gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted) {
        const result = await launchImageLibrary(optionLibrary);
        if (result.didCancel) {
          showToastError('User cancelled launchImageLibrary');
        } else {
          if (result?.assets && result.assets[0].uri) {
            const formdata = new FormData();
            formdata.append('avatar', {
              uri: result.assets[0].uri,
              name: result.assets[0].fileName,
              type: result.assets[0].type,
            });
            handleUploadImage(formdata);
            setSelectImageGallery(result.assets[0].uri);
            showToastSuccess('Image taken successfully');
          } else {
            showToastError('Image URI is missing in the response!');
          }
        }
      }
    } catch (error) {
      console.warn(error);
    }

    setIsShow(false);
  };

  const handleUploadImage = async (formdata: any) => {
    dispatch(AuthActions.handleUpdateAvatar(formdata));
  };

  const handleDeleteImage = async () => {
    setIsShow(false);
    dispatch(AuthActions.handleDeleteAvatar());
  };

  if (!isZoomed) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleShow}>
          <Avatar
            size={70}
            rounded
            source={{
              uri:
                user?.image_url ||
                'https://cdn3d.iconscout.com/3d/premium/thumb/colombian-people-9437719-7665524.png?f=webp',
            }}
          />

          <Avatar
            size={24}
            rounded
            icon={{name: 'pencil', type: 'font-awesome'}}
            containerStyle={styles.pencilStyle}
          />
          {isShow && (
            <ModalWrapContent
              isVisible={isShow}
              onBackdropPress={() => setIsShow(false)}
              contentStyle={styles.contentStyle}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => toggleZoom()}>
                <Icon
                  type="ionicon"
                  name={'person-circle-outline'}
                  color={'black'}
                  size={28}
                  containerStyle={styles.iconStyle}
                />
                <Text style={styles.textStyle}>See your images</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleCamera()}>
                <Icon
                  type="ionicon"
                  name={'camera-outline'}
                  color={'black'}
                  size={28}
                  containerStyle={styles.iconStyle}
                />
                <Text style={styles.textStyle}>Take a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleGallery()}>
                <Icon
                  type="ionicon"
                  name={'images-outline'}
                  color={'black'}
                  size={28}
                  containerStyle={styles.iconStyle}
                />
                <Text style={styles.textStyle}>Select a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={handleDeleteImage}>
                <Icon
                  type="ionicon"
                  name={'trash-outline'}
                  color={'black'}
                  size={28}
                  containerStyle={styles.iconStyle}
                />
                <Text style={styles.textStyle}>Remove photo</Text>
              </TouchableOpacity>
            </ModalWrapContent>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <AnimatedView style={[styles.overlay, overlayStyle]}>
      <TouchableOpacity onPress={toggleZoom}>
        <AnimatedView style={[styles.avatarContainer, containerStyle]}>
          <Avatar
            size={styles.avatarContainer.width}
            rounded
            source={{
              uri:
                user.image_url ||
                'https://cdn3d.iconscout.com/3d/premium/thumb/colombian-people-9437719-7665524.png?f=webp',
            }}
          />
        </AnimatedView>
      </TouchableOpacity>
    </AnimatedView>
  );
};

export default AvatarComponets;
