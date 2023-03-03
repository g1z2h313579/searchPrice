/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

//硬件详情
export async function queryHardwareDetaillist(params: {
  hardwareType: number;
}) {
  return request('/api/hardwareDetail/query', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function addHardwareDetail(params: API.hardwareDetail) {
  return request('/api/hardwareDetail/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function delHardwareDetail(params: { hardwareDetailId: number }) {
  return request('/api/hardwareDetail/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateHardwareDetail(params: API.hardwareDetail) {
  return request('/api/hardwareDetail/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
