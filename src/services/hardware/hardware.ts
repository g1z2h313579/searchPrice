/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

//硬件类型
export async function queryHardwareTypelist() {
  return request('/api/hardwareType/query', {
    method: 'GET',
  });
}

export async function addHardwareType(params: { hardwareName: string }) {
  return request('/api/hardwareType/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function delHardwareType(params: { hardwareId: number }) {
  return request('/api/hardwareType/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateHardwareType(params: {
  hardwareName: string;
  hardwareId: number;
}) {
  return request('/api/hardwareType/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
