/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

//用户管理
export async function queryUser() {
  return request('/api/user/query', {
    method: 'GET',
  });
}

export async function addUser(params: API.userInfo) {
  return request('/api/user/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function delUser(params: { id: number }) {
  return request('/api/user/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateUser(params: API.userInfo) {
  return request('/api/user/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
