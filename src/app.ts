// 运行时配置

import { AxiosResponse, history } from '@umijs/max';
import { RequestOptions } from '@umijs/max';
import { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { RunTimeLayoutConfig } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  return { name: '电脑硬件后台管理平台', token: localStorage.getItem('token') };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    menu: {
      locale: false,
    },
    logout: () => {
      localStorage.setItem('token', '');
      history.push('/login');
    },
    // rightRender:logout
  };
};

export const request: RequestConfig = {
  timeout: 3000,
  // other axios options you want
  errorConfig: {
    errorHandler(err) {
      // @ts-ignore
      if (err?.response.data.msg === 'login first') {
        localStorage.setItem('token', '');
        message.error('登陆过期，请重新登陆');
        history.push('/login');
      }
    },
    errorThrower(...err) {
      console.log('err2', err);
    },
  },
  requestInterceptors: [
    (config: RequestOptions) => {
      // console.log(config)
      config.headers!.token = localStorage.getItem('token') ?? '';
      return config;
    },
  ],
  responseInterceptors: [
    (response: AxiosResponse) => {
      if (response.data.msg === 'login first') {
        message.error('请先登陆');
        localStorage.setItem('token', '');
        history.push('/login');
      }
      return response;
    },
  ],
};
