import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from '@rneui/themed';
import {Icon} from '@rneui/themed';
import useStyles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../../../../../hooks';
import {ComicActions} from '../../../../../../redux';
import {
  getCountComment,
  getDataDetailChapter,
  getNextChapter,
  getPreviousChapter,
} from '../../../../../../redux/selectors/comic.selector';
import {NavigationService} from '../../../../../../navigation';
import {routes} from '../../../../../../constants';
import {CommentChapterAction} from '../../../../../../redux/reducer/comment.chapter.reducer';
import {getTotaComment} from '../../../../../../redux/selectors/comment.chapter.selector';
interface FooterChapterProps {
  incrementChapter: () => void;
  decrementChapter: () => void;
}

const FooterChapter: React.FC<FooterChapterProps> = props => {
  const Next = useAppSelector(getNextChapter);
  const Previous = useAppSelector(getPreviousChapter);
  const dispath = useAppDispatch();
  const dispatch = useAppDispatch();
  const dataDetailChapter = useAppSelector(getDataDetailChapter);
  const totalComment = useAppSelector(getCountComment);

  const onPressNext = () => {
    if (Next) {
      dispath(ComicActions.getListDetailChapterNav(Next));
      props.incrementChapter();
    }
  };

  const onPressPrevious = () => {
    if (Previous) {
      dispath(ComicActions.getListDetailChapterNav(Previous));
      props.decrementChapter();
    }
  };

  const styles = useStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate(routes.COMMENT_COMIC),
            dispatch(CommentChapterAction.clearCommentChapter());
        }}
        style={styles.commentButtonStyle}>
        <Icon
          name="chatbubble-ellipses"
          type="ionicon"
          size={24}
          color={styles.iconStyle.color}
        />
        <Text style={styles.textComment}>{totalComment}</Text>
      </TouchableOpacity>
      <View style={styles.navChapter}>
        <TouchableOpacity style={styles.nextChapter} onPress={onPressPrevious}>
          <Icon
            name="caret-back-outline"
            size={24}
            type="ionicon"
            color={styles.iconStyle.color}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextChapter} onPress={onPressNext}>
          <Icon
            name="caret-forward-outline"
            size={24}
            type="ionicon"
            color={styles.iconStyle.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterChapter;
