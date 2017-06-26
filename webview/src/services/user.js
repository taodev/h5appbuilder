import { post } from '../utils/request';

export function fetchUsers(pageCount, params) {
  return post('/api/v1/auth/queryuser', { results: 10, ...params });
}
