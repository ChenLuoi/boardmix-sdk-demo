# boardmix sdk demo

## 运行准备
1. 打开[pixso应用](https://pre.pixso.cn/app/)，注册账号并进入应用
2. 在控制台输入如下指令，获取当前登录用户给的token
   ```javascript
   JSON.parse(unescape(document.cookie.split(";").map(pair => pair.trim().split("=")).find(item => item[0] === "BOSYUNCurrent")[1]))["refresh_token"]
   ```
3. 将该token赋给.env的环境变量VITE_USER_TOKEN