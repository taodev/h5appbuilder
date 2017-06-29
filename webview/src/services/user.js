import { post } from '../utils/request';

export function fetchUsers(pageCount, params) {
  return post('/api/v1/user', { results: 10, ...params });
}

export function addUser(params) {
  return post('/api/v1/user/add', params);
}
