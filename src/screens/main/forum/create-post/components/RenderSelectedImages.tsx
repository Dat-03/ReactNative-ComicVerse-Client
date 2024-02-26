import React, {useState} from 'react';
import {Dimensions, FlatList, Modal, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import FBCollage from 'react-native-fb-collage';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {Asset} from 'react-native-image-picker';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useStyles from '../styles';

interface SelectedImagesProps {
  images: Asset[];
}

const SelectedImages: React.FC<SelectedImagesProps> = props => {
  const styles = useStyles();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [selectedImage, setSelectedImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const openModal = (image: any) => {
    setShowModal(true);
    setSelectedImage(image);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event: any) => {
      scale.value = event.scale < 1 ? 1 : event.scale;
      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
    },
    onEnd: () => {
      scale.value = withSpring(scale.value);
    },
  });

  const tapHandler = useAnimatedGestureHandler({
    onActive: (event: any) => {
      console.log('Double tap detected!');
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <View>
      <FlatList
        data={props.images}
        renderItem={({item, index}) => {
          if (!item.uri) {
            return <View />;
          }
          return (
            <View>
              {item && (
                <>
                  <FBCollage
                    key={0}
                    images={[{uri: item.uri}] as any}
                    borderRadius={6}
                    imageOnPress={() => openModal(item.uri)}
                    style={{
                      flex: 1,
                      width: screenWidth,
                      height: screenHeight / 2,
                    }}
                  />
                </>
              )}
              <Modal
                visible={showModal}
                transparent={true}
                onRequestClose={closeModal}>
                <View style={styles.viewModalImage}>
                  <GestureHandlerRootView>
                    <PinchGestureHandler onGestureEvent={pinchHandler}>
                      <Animated.View style={animatedStyle}>
                        <TapGestureHandler
                          numberOfTaps={2}
                          onGestureEvent={tapHandler}>
                          <Animated.View>
                            <FastImage
                              key={index}
                              source={{
                                uri: selectedImage,
                                priority: FastImage.priority.normal,
                              }}
                              style={{
                                width: screenWidth,
                                height: screenHeight,
                              }}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                          </Animated.View>
                        </TapGestureHandler>
                      </Animated.View>
                    </PinchGestureHandler>
                  </GestureHandlerRootView>
                </View>
              </Modal>
            </View>
          );
        }}
        onMomentumScrollEnd={ev => {
          const newIndex = Math.floor(
            ev.nativeEvent.contentOffset.x / screenWidth,
          );
          setCurrentIndex(newIndex);
          console.log('New Index:', newIndex);
        }}
        horizontal
        pagingEnabled
        style={{
          width: screenWidth,
          height: screenHeight / 2,
        }}
      />
      {props.images.length > 1 && (
        <View style={styles.viewImagesLength}>
          <Text style={styles.textImagesLength}>
            {props.images ? currentIndex + 1 : 0}/{props.images.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SelectedImages;
