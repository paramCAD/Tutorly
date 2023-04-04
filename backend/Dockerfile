FROM node:alpine 
WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 8080
