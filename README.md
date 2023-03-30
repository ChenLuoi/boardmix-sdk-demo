# boardmix sdk demo

## 运行准备
1. 打开[pixso应用](https://pre.pixso.cn/app/)，注册账号并进入应用
2. 在控制台输入如下指令，获取当前登录用户给的token
   ```javascript
   JSON.parse(unescape(document.cookie.split(";").map(pair => pair.trim().split("=")).find(item => item[0] === "BOSYUNCurrent")[1]))["refresh_token"]
   ```
3. 复制.env中的环境变量配置，并创建.env.local配置文件（避免git提交）
4. 将该token赋给.env.local的环境变量VITE_USER_TOKEN
5. 如果有其他环境的配置需要，请修改.env.local中的VITE_SDK_ORIGIN和VITE_SERVER_ORIGIN，注意修改环境后，对应的token也需要重新生成并替换

## 接入方准备
当前项目以boardmix的接入方pixso为例，接入方如果需要验证自己的产品接入是否正常，请自行重写
src/request.ts中的Api的四个方法，以保证demo运行正常