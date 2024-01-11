FROM nginx
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - 
RUN apt-get install -y nodejs npm

WORKDIR /temp
COPY ./ /temp
RUN npm run build

WORKDIR /build
RUN mv /temp/build/* .
RUN rm -rf /temp

COPY ./prod/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80:80
CMD ["nginx", "-g", "daemon off;"]