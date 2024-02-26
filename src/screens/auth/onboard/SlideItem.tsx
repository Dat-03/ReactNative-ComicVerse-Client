import LottieView from 'lottie-react-native';
import React from 'react';
import {Text, View} from 'react-native';
import useStyles from './styles';

const SlideItem: React.FunctionComponent<any> = ({item}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {/* <Image source={item.img} resizeMode="contain" style={[styles.image]}  srcSet=''/> */}
      <LottieView source={item.img} autoPlay style={[styles.image]} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;
