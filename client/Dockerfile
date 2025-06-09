FROM node:18-alpine
WORKDIR /app
COPY package.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html ./
RUN npm install
COPY public ./public
COPY src ./src
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]