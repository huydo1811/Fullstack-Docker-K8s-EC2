# # 1. Build stage
# FROM node:20-alpine AS build

# WORKDIR /app


# # Copy package.json và package-lock.json
# COPY package*.json ./

# # Cài dependencies
# RUN npm install

# # Copy toàn bộ source code
# COPY . .

# # Build project
# RUN npm run build

# # 2. Serve stage (serve static files)
# FROM nginx:alpine

# # Copy build ra thư mục nginx
# COPY --from=build /app/build /usr/share/nginx/html

# # Mở cổng 80
# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
