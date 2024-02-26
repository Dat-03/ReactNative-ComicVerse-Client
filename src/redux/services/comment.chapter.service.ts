import apiService from './api.service';

import {ENDPOINTS} from '../../environment';

export class CommentChapterService {
  static async postCommentChapter(payload: any) {
    console.log(`${ENDPOINTS.POST_COMMENT_COMIC}`, payload);
    return await apiService.post(`${ENDPOINTS.POST_COMMENT_COMIC}`, {
      chapter_uuid: payload.chapter_uuid,
      comment: payload.comment,
    });
  }

  static async postRepCommentChapter(payload: any) {
    console.log(`${ENDPOINTS.POST_COMMENT_COMIC}`, payload);
    return await apiService.post(`${ENDPOINTS.POST_COMMENT_COMIC}`, {
      chapter_uuid: payload.chapter_uuid,
      comment: payload.comment,
      parents_comment_uuid: payload.parents_comment_uuid,
    });
  }

  static async getCommentChapter(payload: any) {
    console.log(
      `${ENDPOINTS.GET_COMMENT_COMIC}?chapter_uuid=${payload.chapter_uuid}&page=${payload.page}`,
    );
    return await apiService.get(
      `${ENDPOINTS.GET_COMMENT_COMIC}?chapter_uuid=${payload.chapter_uuid}&page=${payload.page}`,
    );
  }

  static async postLikeCommentChapter(payload: any) {
    console.log(`${ENDPOINTS.POST_LIKE_COMMENT_COMIC}`, payload);
    return await apiService.post(`${ENDPOINTS.POST_LIKE_COMMENT_COMIC}`, {
      comment_uuid: payload.comment_uuid,
    });
  }

  static async postUnlikeCommentChapter(payload: any) {
    console.log(`${ENDPOINTS.DELETE_LIKE_COMMENT_COMIC}`, payload);
    return await apiService.delete(`${ENDPOINTS.DELETE_LIKE_COMMENT_COMIC}`, {
      data: {comment_uuid: payload.comment_uuid},
    });
  }

  static async getRepCommentChapter(payload: any) {
    console.log(
      `${ENDPOINTS.GET_REP_COMMENT_CHAPTER}?parents_comment_uuid=${payload.parents_comment_uuid}&page=${payload.page}`,
    );
    return await apiService.get(
      `${ENDPOINTS.GET_REP_COMMENT_CHAPTER}?parents_comment_uuid=${payload.parents_comment_uuid}&page=${payload.page}`,
    );
  }

  static async deleteCommentRepChapter(payload: any) {
    console.log(`${ENDPOINTS.DELETE_COMMENT_FORUM}`, payload);
    return await apiService.delete(`${ENDPOINTS.DELETE_COMMENT_FORUM}`, {
      data: {comment_uuid: payload.uuid},
    });
  }

  static async deleteCommentChapter(payload: any) {
    console.log(`${ENDPOINTS.DELETE_COMMENT_FORUM}`, payload);
    return await apiService.delete(`${ENDPOINTS.DELETE_COMMENT_FORUM}`, {
      data: {comment_uuid: payload},
    });
  }
}
