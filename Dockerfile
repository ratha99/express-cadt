FROM node:18.20.2-slim
ENV TZ="Asia/Bangkok"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD ["npm", "run", "dev"]