FROM node:18-alpine
WORKDIR /app
COPY package.json tsconfig.json .env.example ./
RUN npm install
COPY src ./src
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]