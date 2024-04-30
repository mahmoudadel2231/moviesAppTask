import axios from 'axios';
import { handleError } from '../utils/axios';

export default function getMainMovies() {
  return axios
    .get(`discover/movie`, {})
    .then(response => {
      if (response.data.success) {
        return response.data.results;
      }
    })
    .catch(error => {
      handleError(error);
    });
}
