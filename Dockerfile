#stage-1(----frontend----)
FROM node:20-slim AS frontend-builder

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend .

RUN npm run build

#stage-2(----backend----)

FROM node:20-slim

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./backend ./backend

COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

EXPOSE 5000

CMD ["npm","start"]
