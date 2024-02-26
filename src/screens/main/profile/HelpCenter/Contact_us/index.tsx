import React from 'react';
import {View} from 'react-native';
import {ItemButton} from './components';
import useStyles from './styles';

const Contact_us: React.FC = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <ItemButton />
    </View>
  );
};

export default Contact_us;
