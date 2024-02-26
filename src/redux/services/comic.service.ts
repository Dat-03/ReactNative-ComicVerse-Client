import {BASE_URL, ENDPOINTS} from '../../environment';
import apiService from './api.service';
import {configFormData, configNoCache} from './config.service';

export class ComicService {


  //get data
  static async getComic(action: number) {
    console.log(`${ENDPOINTS.COMIC}?page=${action}`);
    return await apiService.get(`${ENDPOINTS.COMIC}?page=${action}`);
  }
  //get comic by id
  static async getComicById(action: string) {
    return await apiService.get(`${ENDPOINTS.COMIC_UUID}${action}`);
  }

  static async getComicByTopic(action: any) {
    console.log(
      `${ENDPOINTS.COMIC_BY_TOPIC}?topic_name=${action.name}&page=${action.page}`,
    );
    return await apiService.get(
      `${ENDPOINTS.COMIC_BY_TOPIC}?topic_name=${action.name}&page=${action.page}`,
    );
  }

  static async getComicByTopicMore(action: any) {
    return await apiService.get(
      `${ENDPOINTS.COMIC_BY_TOPIC}?topic_name=${
        action.name[0]
      }&page=${1}&topic_name=${action.name[1]}&topic_name=${action.name[2]}`,
    );
  }

  static async getAllChapterByComic(action: any) {
    console.log(`${ENDPOINTS.CHAPTER}${action}?chapter_number=${0}`);
    return await apiService.get(
      `${ENDPOINTS.CHAPTER}${action}?chapter_number=${0}`,
    );
  }

  static async getChapterById(action: any) {
    console.log(
      `${ENDPOINTS.CHAPTER}${action.comic_uuid}?chapter_number=${action.chapter_number}`,
    );
    return await apiService.get(
      `${ENDPOINTS.CHAPTER}${action.comic_uuid}?chapter_number=${action.chapter_number}`,
    );
  }
  static async getChapterByNav(action: any) {
    console.log(`v1/api/${action}`);
    return await apiService.get(`v1/api/${action}`);
  }

  static async getComicBySearch(action: any) {
    console.log(
      `${ENDPOINTS.COMIC_BY_NAME}?comic_name=${action.key}&page=${action.page}`,
    );
    return await apiService.get(
      `${ENDPOINTS.COMIC_BY_NAME}?comic_name=${action.key}&page=${action.page}`,
    );
  }

  static async getComicByTopView() {
    console.log(`${ENDPOINTS.COMIC_TOP_20}`);
    return await apiService.get(`${ENDPOINTS.COMIC_TOP_20}`);
  }

  static async getComicByTopRating() {
    console.log(`${ENDPOINTS.TOP_RATING}`);
    return await apiService.get(`${ENDPOINTS.TOP_RATING}`);
  }

  static async getComicByTopFavorite() {
    console.log(`${ENDPOINTS.TOP_FAVORITE}`);
    return await apiService.get(`${ENDPOINTS.TOP_FAVORITE}`);
  }

  static async postFavorite(payload: string) {
    console.log(`${ENDPOINTS.POST_FAVORITE}`, payload);
    return await apiService.post(`${ENDPOINTS.POST_FAVORITE}`, {
      comic_uuid: payload,
    });
  }

  static async deleteFavorite(payload: string) {
    console.log(`${ENDPOINTS.DELETE_FAVORITE}${payload}`);
    return await apiService.delete(`${ENDPOINTS.DELETE_FAVORITE}${payload}`);
  }

  static async checkFavorite(payload: string) {
    console.log(`${ENDPOINTS.CHECK_FAVORITE}?comic_uuid=${payload}`);
    return await apiService.get(
      `${ENDPOINTS.CHECK_FAVORITE}?comic_uuid=${payload}`,
    );
  }

  static async getListFavorite(payload: number) {
    console.log(`${ENDPOINTS.ALL_FAVORITE}?page=${payload}`);
    return await apiService.get(`${ENDPOINTS.ALL_FAVORITE}?page=${payload}`);
  }

  static async getListHistory(payload: number) {
    console.log(`${ENDPOINTS.HISTORY_COMIC}?page=${payload}`);
    return await apiService.get(`${ENDPOINTS.HISTORY_COMIC}?page=${payload}`);
  }
}
