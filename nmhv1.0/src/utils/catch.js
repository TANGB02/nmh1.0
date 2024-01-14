/*
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 15:58:20
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2023-12-31 22:35:01
 * @FilePath: \nmhv1.0\nmhv1.0\src\utils\catch.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class LocalCatch {
  // 后台返回的是json数据
  setToken(key, value) {
    window.localStorage.setItem(key, value);
  }
  getToken(key) {
    const value = window.localStorage.getItem(key);
    // return JSON.stringify(value);
    return value;
  }
  deleteToken(key) {
    window.localStorage.removeItem(key);
  }
  clearToken() {
    window.localStorage.clear();
  }
}
export default new LocalCatch();
