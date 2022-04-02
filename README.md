#### 效果

浏览器并未下载jpg格式图片, 而是下载的txt

![image-20220402103358923](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20220402103358923.png)



#### 创建base64的txt格式

> 将生成的图片base64数据拷贝到txt文件中



#### 编译txt文件, 生成图片数据

```shell
## 先通过ajax下载文件
## 然后通过FileReader进行解析txt文件
#### readAsText读取txt文件内容
## 然后将base64转化为blob格式
## 最后通过 URL.createObjectURL 生成图片链接
## 将图片链接绑定到img src即可

#### 另外注意的是, createObjectURL 在不需要的时候需要销毁(使用URL.revokeObjectURL), 防止内存溢出
```



#### nginx发布预览

**需要发布代理地址, 否则上述功能无法预览(平常开发时正常发布到服务器即可, 测试时可以使用临时nginx代理)**

```shell
## 1. 下载
http://nginx.org/

## 2. 解压后, 修改配置文件
#### nginx配置文件在 nginx-x.x.x\conf\nginx.conf
http {
     gzip  on;

    #html
    server {
        listen       8888;
        server_name  localhost;

        location / {
            ## root   G:/source/static_cnblog_com;
            root   html;
            index  index.html index.htm n1.html;
        }
        ## 使用/read url时, 会自动引用alias配置的路径
        ## localhost:8888/read/
        location /read {
            alias html/readBase64Txt;
        }
    }

}
```

