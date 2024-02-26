import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {CommentForumAction} from '../../../../redux/reducer/comment.forum.reducer';
import {
  getCurrenPageCommentForum,
  getListCommentForum,
  getNextPageCommentForum,
} from '../../../../redux/selectors/comment.forum.selector';
import {getIsLoadingPage} from '../../../../redux/selectors/loading.selector';
import {CommentForumType} from '../../../../redux/types/comment.forum.type';
import {HeaderComment} from './components';
import ItemCommnent from './components/ItemComment';
import useStyles from './styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {ForumActions, commentCountForum} from '../../../../redux';
import {getCountComment} from '../../../../redux/selectors/comic.selector';

const CommentForum: React.FC = () => {
  const styles = useStyles();
  const route = useRoute();

  const uuid = (route.params as {uuid?: CommentForumType})?.uuid;

  const countCount = (route.params as {comment_count?: any})?.comment_count;

  const dataComment = useAppSelector(getListCommentForum);
  const countComment = useAppSelector(commentCountForum);

  const canNext = useAppSelector(getNextPageCommentForum);
  const currentPage = useAppSelector(getCurrenPageCommentForum);
  const [value, setvalue] = useState('');
  const isLoading = useAppSelector(getIsLoadingPage);
  const flatListRef = useRef<FlatList<CommentForumType>>();
  const [sizeContent, setSizeContent] = useState<number>(0);
  const [size, setSize] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      CommentForumAction.getCommentForum({
        forum_uuid: uuid,
        page: 1,
      }),
    );
    dispatch(ForumActions.getPostById(uuid));
  }, []);

  useEffect(() => {
    console.log('==========>aaaaaaaaaaaaaaa');
    setCount(countComment!);
  }, [countComment]);

  const onPressPostComment = () => {
    setIncrease();
    dispatch(
      CommentForumAction.postCommentForum({
        forum_uuid: uuid,
        comment: value,
      }),
    );
    console.log('forum_uuid: ', uuid, '\ncomment: ', value);
    setvalue('');
  };

  const loadMoreComic = () => {
    if (canNext && !isLoading) {
      dispatch(
        CommentForumAction.getCommentForum({
          forum_uuid: uuid,
          page: currentPage ? currentPage + 1 : 1,
        }),
      );
      setSize(true);
    }
  };

  const setIncrease = () => {
    setCount(count + 1);
  };

  const setReduce = () => {
    setCount(count - 1);
  };
  const onContentSizeChange = useCallback(
    (contentWidth: number, contentHeight: number) => {
      flatListRef.current?.setNativeProps({
        contentSize: {width: contentWidth, height: contentHeight},
      });
      setSizeContent(contentHeight);
      if (size) {
        setSizeContent(sizeContent + 3000);
        setSize(false);
      }
    },
    [size, sizeContent],
  );

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator color={'#F89300'} size={'large'} />;
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: CommentForumType;
    index: number;
  }) => {
    return <ItemCommnent setReduce={setReduce} data={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={dataComment?.length}
        data={dataComment}
        keyExtractor={item => item.uuid}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: 65, paddingHorizontal: 16}}
        onContentSizeChange={onContentSizeChange}
        onScroll={({nativeEvent}) => {
          const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
          const numberOfPixelsFromBottomThreshold = 100;
          const isNearBottom =
            contentOffset.y + layoutMeasurement.height >=
            sizeContent - numberOfPixelsFromBottomThreshold;
          // console.log(
          //   'size scroll',
          //   contentOffset.y + layoutMeasurement.height,
          // );
          // console.log('size content', sizeContent);

          if (isNearBottom) {
            loadMoreComic();
          }
        }}
        ListFooterComponent={isLoading ? listFooterComponent() : <View />}
      />

      <View style={styles.viewTextInput}>
        <TextInput
          value={value}
          onChangeText={text => setvalue(text)}
          placeholder="Shoot your comment..."
          placeholderTextColor={'#939297'}
          onSubmitEditing={onPressPostComment}
          returnKeyType="send"
          style={styles.textInput}
        />
      </View>

      <HeaderComment currentCommentCount={count} />
    </View>
  );
};

export default CommentForum;
