// 自定义 api接口返回的 Promise<HttpResponse>
export interface HttpResponse {
    code?: number;
    data?: any;
    msg?: string | Record<string, any>; // 定义 字符串，对象类型
    [propname: string]: any;
  }
