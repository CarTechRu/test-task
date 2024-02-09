export interface IConfig {
  API_BASEPATH?: string;
  IMAGES_BASEPATH?: string;
  POLLING_INTERVAL?: string;
}

export default {
  API_BASEPATH: 'http://localhost:3000/api',
  IMAGES_BASEPATH: 'http://localhost:3000',
  POLLING_INTERVAL: 20,
};
