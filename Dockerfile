FROM node:22-alpine
WORKDIR /opt/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production
EXPOSE 3000
EXPOSE 27017
# CMD ["node", "dist/main.js"]
CMD ["tail", "-f", "/dev/null"]
