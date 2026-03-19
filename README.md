# 时光拾遗-weichuyi
本项目以原生HTML/JavaScript开发承载微信聊天记录、语音、照片等回忆内容的前端页面，

再通过Node.js安装Cordova打包工具，创建Cordova项目并添加安卓平台支持，

将开发好的www目录资源完整替换到Cordova项目的对应目录后，

借助Android Studio提供的安卓SDK环境，执行Cordova打包命令，

最终将前端静态资源编译封装为可在安卓设备安装运行的APK文件。

既是技术实践的产物，也是时光的具象化留存。

## 页面说明
项目前端页面均在www/目录下，核心页面职责：
- `www/index.html`：应用入口，加载核心文件、初始化UI，作为页面容器
- `www/login.html`：登录页，首次进入点击“不知道”，跳转主菜单
- `www/menu.html`：主导航，提供所有功能模块入口
- `www/OurStory.html`：核心聊天记录页，展示图文及互动内容
- `www/Star.html`：收藏页，收藏聊天记录与语音
- `www/Radio.html`：电台页，播放语音，配合全局背景音乐（icon/bgm.mp3）
- `www/Food.html`：美食页，展示过往
- `www/Report.html`：报告页，展示聊天记录年度汇总
- `www/About.html`：关于页，展示应用更新日志

## www 目录的其他资源

- `www/avatars/`：头像资源
- `www/icon/`：图标、美食照片、背景音乐
- `www/media/`：聊天表情、音频等资源
- `www/chatData.js`：静态数据/配置（存放聊天记录）
- `www/wechat.jpg`：OurStory.html页面背景图

## 主要工具与技术栈

### 开发与编辑
- **HTML / JavaScript**：页面与交互
- **Notepad++**：早期编辑
- **Visual Studio Code**：后期主力

### 移动端构建与打包
- **Android Studio**：构建、调试、打包
- **Cordova WebView 运行方式**：页面容器，打包生成APK

### AI 辅助工具
- **Google Gemini 3**：前期框架与结构建议
- **GitHub Copilot**：后期主要用于代码补全与快速生成脚本片段。
- **ChatGPT 5.2**：后期辅助排错与局部代码生成/优化。
- 
## 写给随笔

我把我们几年的聊天记录、语音、那些瞬间，都收进了这个小小的空间里。<br>

它像一个安静的盒子，用来装下时间能带走的东西。<br>

有些话当时没来得及好好说，有些声音后来再也听不到原来的语气。<br>

这一刻我才终于明白了，人，还是要好好告别。<br>

