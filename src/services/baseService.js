import axios from 'axios';

class BaseService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: /** url **/
    });

    this.getConfig();
  }

  doRequest(config) {
    this.getConfig();

    return this.axiosInstance
      .request(configData)
      .then(response => {
        return response.data
          ? Promise.resolve(response)
          : Promise.reject(response);
      })
      .catch(e => {
        return Promise.reject(e);
      });
  }
}

export default BaseService;
