import React from 'react';
import {View} from 'react-native';
import ItemFilters from './components/RenderItem/ItemFilters';
import useStyles from './styles';
import {HeaderCustom} from '../../../../components';
import {NavigationService} from '../../../../navigation';
import {RouteProp, useRoute} from '@react-navigation/native';
interface FiltersProps {
  route: RouteProp<{
    params: {
      setHightView: Function;
      setLowView: Function;
      setFilterArray: Function;
      setLowRate: Function;
      setHighRate: Function;
    };
  }>;
}

const Filters: React.FC<FiltersProps> = ({route}) => {
  const styles = useStyles();
  const {setHightView, setLowView, setFilterArray, setHighRate, setLowRate} =
    route.params;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <HeaderCustom
          title="Filters"
          leftIcon={{
            name: 'arrow-back-outline',
            type: 'ionicon',
            color: styles.colorIcon.color,
          }}
          onPressLeftIcon={() => {
            NavigationService.goBack();
          }}
        />
        <View style={styles.viewItemFilters}>
          <ItemFilters
            setFilterArray={setFilterArray}
            setHightView={setHightView}
            setLowView={setLowView}
            setHighRate={setHighRate}
            setLowRate={setLowRate}
          />
        </View>
      </View>
    </View>
  );
};

export default Filters;
