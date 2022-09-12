FROM node:14.20 as node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
CMD ["npm", "run", "start"]