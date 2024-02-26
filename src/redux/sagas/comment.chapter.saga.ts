import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UserService } from '../services';
import { UserAction } from '../reducer/user.reducer';
import { CommentChapterAction } from '../reducer/comment.chapter.reducer';
import { CommentChapterService } from '../services/comment.chapter.service';
import { ComicActions, LoadingActions } from '../reducer';
import { ToastAndroid } from 'react-native';
import { CommentForumAction } from '../reducer/comment.forum.reducer';

function* postCommentSaga(action: PayloadAction<any>): Generator {
  yield put(LoadingActions.showLoading());
  try {
    console.log('run===========>');
    const { data }: any = yield call(
      CommentChapterService.postCommentChapter,
      action.payload,
    );
    if (data.code == 200) {
      console.log(data.data);
      yield put(CommentChapterAction.posCommentChapterSucces(data.data));
      yield put(ComicActions.setCountComment());
      console.log('run push tookit');
    } else {
      ToastAndroid.show('Error 😖😖!!!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoading());
  }
}

function* postLikeCommentSaga(action: PayloadAction<any>): Generator {
  yield put(LoadingActions.showLoading());
  try {
    console.log('run===========>');
    const { data }: any = yield call(
      CommentChapterService.postLikeCommentChapter,
      action.payload,
    );
    if (data.code == 200) {
      if (action.payload.type) {
        yield put(
          CommentChapterAction.handleLikeAndUnlikeRepSuccess(
            action.payload.comment_uuid,
          ),
        );
      } else {
        yield put(
          CommentChapterAction.handleLikeAndUnlikeSuccess(
            action.payload.comment_uuid,
          ),
        );
      }
      console.log('run push tookit');
    } else {
      ToastAndroid.show('Error 😖😖!!!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoading());
  }
}

function* postUnlikeCommentSaga(action: PayloadAction<any>): Generator {
  yield put(LoadingActions.showLoading());
  try {
    console.log('run===========>');
    const { data }: any = yield call(
      CommentChapterService.postUnlikeCommentChapter,
      action.payload,
    );
    console.log(data);
    if (data.code == 200) {
      if (action.payload.type) {
        yield put(
          CommentChapterAction.handleLikeAndUnlikeRepSuccess(
            action.payload.comment_uuid,
          ),
        );
      } else {
        yield put(
          CommentChapterAction.handleLikeAndUnlikeSuccess(
            action.payload.comment_uuid,
          ),
        );
      }
      console.log('run push tookit');
    } else {
      ToastAndroid.show('Error 😖😖!!!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoading());
  }
}

function* postRepCommentSaga(action: PayloadAction<any>): Generator {
  yield put(LoadingActions.showLoading());
  try {
    console.log('run===========>');
    const { data }: any = yield call(
      CommentChapterService.postRepCommentChapter,
      action.payload,
    );
    if (data.code == 200) {
      yield put(CommentChapterAction.postRepCommentChapterSucces(data.data));
      yield put(ComicActions.setCountComment());
      console.log('run push tookit');
    } else {
      ToastAndroid.show('Error 😖😖!!!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoading());
  }
}

function* getCommentComicSaga(action: PayloadAction<any>): Generator {
  yield put(LoadingActions.showLoadingPage());
  try {
    console.log('run===========>');
    const { data }: any = yield call(
      CommentChapterService.getCommentChapter,
      action.payload,
    );
    if (data.code == 200) {
      yield put(CommentChapterAction.setCommentChapter(data.data));
      console.log('run push tookit');
    } else {
      ToastAndroid.show('Error 😖😖!!!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoadingPage());
  }
}

function* deleteCommentSaga(action: PayloadAction<string>): Generator {
  try {
    yield put(LoadingActions.showLoading());
    console.log('run===========>');
    const { data }: any = yield call(
      CommentChapterService.deleteCommentChapter,
      action.payload,
    );
    if (data.code == 200) {
      yield put(
        CommentChapterAction.deleteCommentChapterSuccess(action.payload),
      );
      yield put(ComicActions.reduceCountComment());
      console.log('run push tookit');
    } else {
      ToastAndroid.show('Error 😖😖!!!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoading());
  }
}

function* deleteRepCommentSaga(action: PayloadAction<string>): Generator {
  try {
    yield put(LoadingActions.showLoading());
    console.log('run===========>');
    const { data }: any = yield call(
      CommentChapterService.deleteCommentRepChapter,
      action.payload,
    );
    if (data.code == 200) {
      yield put(
        CommentChapterAction.deleteRepCommentChapterSuccess(action.payload),
      );
      yield put(CommentChapterAction.reduceCountRep(action.payload));
      yield put(ComicActions.reduceCountComment());
      console.log('run push tookit');
    } else {
      ToastAndroid.show('Error 😖😖!!!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoading());
  }
}

function* getRepCommentComicSaga(action: PayloadAction<any>): Generator {
  yield put(LoadingActions.showLoadingPage());
  try {
    console.log('run===========>');
    const { data }: any = yield call(
      CommentChapterService.getRepCommentChapter,
      action.payload,
    );
    if (data.code == 200) {
      yield put(CommentChapterAction.setRepCommentChapter(data.data));
      console.log('run push tookit');
    } else {
      ToastAndroid.show('Error 😖😖!!!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoadingPage());
  }
}

export default function* watchCommentChapterSaga() {
  yield takeLatest(
    CommentChapterAction.postCommentChapter.type,
    postCommentSaga,
  );
  yield takeLatest(
    CommentChapterAction.getCommentChapter.type,
    getCommentComicSaga,
  );

  yield takeLatest(
    CommentChapterAction.postRepCommentChapter.type,
    postRepCommentSaga,
  );

  yield takeLatest(
    CommentChapterAction.postLikeCommentChapter.type,
    postLikeCommentSaga,
  );
  yield takeLatest(
    CommentChapterAction.postUnlikeCommentChapter.type,
    postUnlikeCommentSaga,
  );

  yield takeLatest(
    CommentChapterAction.getRepCommentChapter.type,
    getRepCommentComicSaga,
  );

  yield takeLatest(
    CommentChapterAction.deleteCommentChater.type,
    deleteCommentSaga,
  );

  yield takeLatest(
    CommentChapterAction.deleteRepCommentChater.type,
    deleteRepCommentSaga,
  );
}
