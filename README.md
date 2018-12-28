# zpSaHelper

自动上报zpPageRequestId, 初始化神策

## 注意事项

神策的字段中不能使用 ‘-’ 做分隔符，非法字段将导致整条数据抛弃，请一律使用 ‘_’ 作为分隔符，切记切记

## 构建及发布

1. 执行如下命令构建工程

``` shell
npm run build
```

2. 通过大前端网站的CDN资源功能发布到common bucket

## 文件列表

1. index.js       导入 xhrHelper 和 saInit
2. xhrHelper.js   自动上报zpPageRequestId工具
3. saInit.js      神策初始化, 绑定 zpPageVIewConfig 和 zpPageRequestId

## zpPageConfig

当前页面的配置信息，将上报到神策的所有事件

zpPageConfig 一定要放在index.server.js里面页面html的header中，保证提前初始化

-- appid      页面标识，必须
-- debug_mode 是否开启调试模式
-- show_log   是否开启控制台日志

``` html
<html>
<head>
...
<script>
var zpStatConfig = {
  // 页面相关配置
  page: {
    appid: 'a123, // 页面标识，必须
    'other params': 'other params value'  // 其他参数
  }
  // 神策相关配置
  sa: {
    debug_mode: true,  // 是否开启调试模式
    show_log: true // 是否开启控制台日志
  }
}
</script>
</head>
<body>
...
</body>
</html>
```
