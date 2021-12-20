/** 响应数据 */
type ResponseData = object | undefined | null

/**
 * 响应结果模型
 */
type ResponseModel = {
  data: ResponseData
  message: string
  errno: number
}

/**
 * 响应结果函数类型
 */
type ResponseResult = (data?: ResponseData, message?: string) => ResponseModel

/**
 * 成功响应
 * @param data 响应数据
 * @param message 响应消息
 * @returns 响应结果模型
 */
export const successResult: ResponseResult = (data, message = 'success') => {
  return {
    data,
    message,
    errno: 0
  }
}

/**
 * 失败响应
 * @param data 响应数据
 * @param message 响应消息
 * @returns 响应结果模型
 */
export const failResult: ResponseResult = (data, message = 'failed') => {
  return {
    data,
    message,
    errno: -1
  }
}
