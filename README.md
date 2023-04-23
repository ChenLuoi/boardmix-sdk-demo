# boardmix sdk demo

## 运行须知

当前demo支持以两种模式运行：基于pixso应用，以及用户自行注册应用

### 自行注册应用

1. 用户将获取到的client_id和client_secret，分别赋值给.env中的变量VITE_CLIENT_ID和VITE_CLIENT_SECRET
2. 修改.env中的VITE_SDK_ORIGIN为需要执行的boardmix sdk服务地址

### 以pixso运行

1. 打开[pixso应用](https://pre.pixso.cn/app/)，注册账号并进入应用
2. 在控制台输入如下指令，获取当前登录用户给的token
   ```javascript
   JSON.parse(unescape(document.cookie.split(";").map(pair => pair.trim().split("=")).find(item => item[0] === "BOSYUNCurrent")[1]))["refresh_token"]
   ```
3. 复制.env中的环境变量配置，并创建.env.local配置文件（避免git提交）
4. 将该token赋给.env.local的环境变量VITE_PIXSO_TOKEN
5. 如果有其他环境的配置需要，请修改.env.local中的VITE_SDK_ORIGIN和VITE_SERVER_ORIGIN，注意修改环境后，对应的token也需要重新生成并替换