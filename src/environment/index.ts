import {config} from 'dotenv';
import Config from 'react-native-config';

// //URL
// export const BASE_URL = process.env.REACT_APP_BASE_URL;
//export const BASE_URL = Config.BASE_URL;
export const BASE_URL = `https://comicverse.fun/`;
export const ENDPOINTS = {
  LOGIN: Config.LOGIN,
  REGISTER: Config.REGISTER,
  LOGIN_GOOGLE: Config.LOGIN_GOOGLE,
  UPDATE_PASSWORD: Config.UPDATE_PASSWORD,
  REFRESH_TOKEN: Config.REFRESH_TOKEN,
  SEND_OTP: Config.SEND_OTP,
  VERIFY_OTP: Config.VERIFY_OTP,
  GET_USER_RANDOM: Config.GET_USER_RANDOM,

  PROFILE: Config.PROFILE,
  GET_ALL_USER: Config.GET_ALL_USER,
  GET_USER_BY_UUID: Config.GET_USER_BY_UUID,
  UPLOAD_AVATAR: Config.UPLOAD_AVATAR,
  DELETE_AVATAR: Config.DELETE_AVATAR,
  FOLLOWER_USER: Config.FOLLOWER_USER,
  GET_ALLPOST_BY_ID: Config.GET_ALLPOST_BY_ID,

  IMAGE: Config.IMAGE,
  UPLOAD_IMAGES: Config.UPLOAD_IMAGES,
  //Change password
  UPLOAD_PASSWORD: Config.UPLOAD_PASSWORD,
  TOPIC: Config.TOPIC,
  GET_TOPIC_BY_UUID: Config.GET_TOPIC_BY_UUID,
  UPDATE_TOPIC: Config.UPDATE_TOPIC,
  DELETE_TOPIC: Config.DELETE_TOPIC,

  FORUM: Config.FORUM,
  LIKE: Config.LIKE,
  UNLIKE: Config.UNLIKE,
  FORUM_BY_UUID: Config.FORUM_BY_UUID,
  FORUM_DELETE_POST: Config.FORUM_DELETE_POST,

  //COMIC
  COMIC: Config.COMIC,
  COMIC_BY_TOPIC: Config.COMIC_BY_TOPIC,
  COMIC_BY_NAME: Config.COMIC_BY_NAME,
  COMIC_UUID: Config.COMIC_UUID,
  COMIC_UPDATE: Config.COMIC_UPDATE,
  COMICS_DELETE: Config.COMICS_DELETE,
  COMIC_UPDATE_IMAGE: Config.COMIC_UPDATE_IMAGE,
  CHAPTER: Config.CHAPTER,
  CHAPTER_UUID: Config.CHAPTER_UUID,
  COMIC_TOP_20: Config.COMIC_TOP_20,
  POST_FAVORITE: Config.POST_FAVORITE,
  DELETE_FAVORITE: Config.DELETE_FAVORITE,
  CHECK_FAVORITE: Config.CHECK_FAVORITE,
  ALL_FAVORITE: Config.ALL_FAVORITE,
  HISTORY_COMIC: Config.HISTORY_COMIC,
  TOP_FAVORITE: Config.TOP_FAVORITE,
  RATING_CHART: Config.RATING_CHART,
  RATING_BY_UUID: Config.RATING_BY_UUID,
  ALL_RATING_COMIC: Config.ALL_RATING_COMIC,
  TOP_RATING: Config.TOP_RATING,
  LIKE_RATING: Config.LIKE_RATING,
  UNLIKE_RATING: Config.UNLIKE_RATING,

  //CONVERSATION
  CONVERSATION: Config.CONVERSATION,
  MESSAGES: Config.MESSAGES,

  //COMMENT_FORUM
  GET_COMMENT_FORUM: Config.GET_COMMENT_FORUM,
  POST_COMMENT_FORUM: Config.POST_COMMENT_FORUM,
  POST_REP_COMMENT_FORUM: Config.POST_REP_COMMENT_FORUM,
  POST_LIKE_COMMENT_FORUM: Config.POST_LIKE_COMMENT_FORUM,
  DELETE_LIKE_COMMENT_FORUM: Config.DELETE_LIKE_COMMENT_FORUM,
  GET_REP_COMMENT_FORUM: Config.GET_REP_COMMENT_FORUM,
  DELETE_COMMENT_FORUM: Config.DELETE_COMMENT_FORUM,

  //COMMENT_COMIC
  POST_COMMENT_COMIC: Config.POST_COMMENT_COMIC,
  GET_COMMENT_COMIC: Config.GET_COMMENT_COMIC,
  POST_LIKE_COMMENT_COMIC: Config.POST_LIKE_COMMENT_COMIC,
  GET_REP_COMMENT_CHAPTER: Config.GET_REP_COMMENT_CHAPTER,
  DELETE_LIKE_COMMENT_COMIC: Config.DELETE_LIKE_COMMENT_COMIC,
  ALL_POST_BY_USER: Config.ALL_POST_BY_USER,
  PUT_SUMMARY: Config.PUT_SUMMARY,
};
