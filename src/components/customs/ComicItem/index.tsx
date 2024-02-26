import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import useStyles from './styles';
import {Icon} from '@rneui/themed';
import {CustomComicProps} from './type';
import {NavigationService} from '../../../navigation';
import {routes} from '../../../constants';
import FastImage from 'react-native-fast-image';
import {ComicActions, ComicType} from '../../../redux';
import {Skeleton} from '@rneui/base';
import {useAppDispatch} from '../../../hooks';

const ComicItem: React.FunctionComponent<CustomComicProps> = props => {
  const styles = useStyles();
  const comic: ComicType = props.data;
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onLoadStart = () => {
    setLoading(true);
  };
  const onLoadEnd = () => {
    setLoading(false);
  };

  const onPressNavDetail = () => {
    dispatch(ComicActions.clearPostFavorite());
    dispatch(ComicActions.clearListDataChapter());
    dispatch(ComicActions.clearListDataByTopicMore());
    NavigationService.navigate(routes.COMICDETAIL, {data: props.data});
  };

  return (
    <View style={props.viewStyle || styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={onPressNavDetail}>
        <FastImage
          key={comic.uuid}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          style={props.imageStyle || styles.imgComic}
          source={{uri: comic.image_url, priority: FastImage.priority.normal}}
          resizeMode={FastImage.resizeMode.cover}
        />
        {isLoading && (
          <Skeleton animation="wave" style={styles.skeletonStyle}></Skeleton>
        )}
        {isLoading && (
          <ActivityIndicator
            color={'#F89300'}
            size={'large'}
            style={{
              position: 'absolute',
            }}
          />
        )}
      </TouchableOpacity>

      <View style={props.contentStyle || styles.content}>
        {!props.topicStyle && (
          <Text style={styles.nameTopic}>{comic.topics[0]}</Text>
        )}
        <Text numberOfLines={2} style={styles.nameComic}>
          {comic.comic_name}
        </Text>
        <View style={styles.rate}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="eye-sharp" type="ionicon" color={'#F89300'} size={18} />
            <Text style={styles.textRate}>{comic.views}</Text>
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="star" type="fontawesome" color={'#F89300'} size={16} />
            <Text style={styles.textRate}>{comic.rating.toFixed(2)}</Text>
          </View> */}
        </View>
        {props.topicStyle && (
          <View style={props.topicStyle}>
            {comic.topics.map((text, index) => (
              <View key={index} style={styles.itemTopics}>
                <Text style={styles.textTopics}>{text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default ComicItem;
