/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

//订单详情
export async function queryOrderlist() {
  return request('/api/order/query', {
    method: 'GET',
  });
}

export async function addOrder(params: API.order) {
  return request('/api/order/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function delOrder(params: { orderId: number }) {
  return request('/api/order/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateOrder(params: API.order) {
  return request('/api/order/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
