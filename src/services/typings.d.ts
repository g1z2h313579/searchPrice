/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface userInfo {
    id: number;
    userName: string;
    nickName?: string;
    password?: string;
    status?: string;
    email?: string;
    phonenumber?: string;
    sex?: string;
    avatar?: string;
    userType?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    delFlag?: string;
    permission?: string;
  }

  interface hardwareType {
    hardwareId: number;
    hardwareName: string;
  }

  interface hardwareDetail {
    hardwareDetailId: number;
    type: number;
    typename: string;
    brand?: string;
    model?: string;
    inventory?: number;
    price?: number;
    onshelves?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    delFlag?: number;
    imgUrl?: string;
  }

  interface order {
    orderId: number;
    hardwareDetailInfo?: string;
    customerName?: string;
    customerPhone?: string;
    createTime?: string;
    isCompleted?: number;
  }

  interface orderHardwareDetail {
    [hardwareType: number]: number;
  }

  interface PageInfo {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    code?: number;
    msg?: string;
    data?: any;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  type definitions_0 = null;
}
