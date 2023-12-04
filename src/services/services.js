import axios from 'axios'

export const getDataFromServer = async function (urlToRequestDataFromServer) {
  try {
    const response = await axios.get(urlToRequestDataFromServer);
    return {
      response: response,
    };
  } catch (error) {
    console.log('Ошибка получения данных', error);
    return error;
  }
};


export const putNewDataToServer = async function (urlToRequestDataFromServer, data) {
  try {
    const response = await axios.put(urlToRequestDataFromServer, data);
    return {
      response: response,
    };
  } catch (error) {
    console.log('Ошибка получения данных', error);
    return error;
  }
};

