import {RootState} from '../store';

export const getListForum = (state: RootState): any =>
  state.forum.listDataForum?.data;

export const getForumByUuid = (state: RootState) =>
  state.forum.listDataForum?.data?.find(item => item.uuid);

export const getCurrentPageForum = (state: RootState) =>
  state.forum.listDataForum?.currentPage;

export const getNextForum = (state: RootState) =>
  state.forum.listDataForum?.canNext;

export const commentCountForum = (state: RootState) =>
  state.forum.postById?.comment_count;
