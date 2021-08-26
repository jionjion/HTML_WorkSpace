FROM node

MAINTAINER JionJion <jionjion@aliyun.com>

# 工作空间
WORKDIR /root/

# 拷贝
COPY ./dist/ /root/app

# 安装软件并运行
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
 && cnpm install -g http-server

# 暴露容器的端口,并未实际打开.镜像生成容器时绑定端口
EXPOSE 8080

# 默认命令
ENTRYPOINT ["http-server", "app"]

# 打包 docker build -t my-vue-fish -f docker/Dockerfile .
# 运行 docker run -it --rm --name local-test-vue -p 8094:8080 my-vue-fish
