# Sử dụng bản Node 20 làm base image
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file 'package.json' và 'package-lock.json' (nếu có)
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Sao chép tất cả các file còn lại từ dự án vào thư mục làm việc trong container
COPY . .

# Build ứng dụng Next.js
RUN npm run build
EXPOSE 4001
CMD ["npm", "start"]