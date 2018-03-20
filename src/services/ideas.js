import BaseService from './baseService';

class IdeasService extends BaseService {
  getIdeas = () => {
    const config = {
      url: 'ideas'
    };
    return this.doRequest(config);
  };

  updateIdea = (id, title, body) => {
    const config = {
      url: `idea/update`,
      method: 'post',
      data: {
        id: id,
        title: title,
        body: body
      }
    };

    return this.doRequest(config);
  };

  deleteIdea = (id) => {
    const config = {
      url: `idea/delete`,
      method: 'post',
      data: {
        id: id
      }
    };

    return this.doRequest(config);
  };
}

export { IdeasService as default };
