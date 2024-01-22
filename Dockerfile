FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:18-alpine AS runtime

WORKDIR /app

COPY package*.json ./

RUN npm i --only=production

COPY --from=build /app/.next ./.next

COPY --from=build /app/public ./public

EXPOSE 3000

RUN mkdir -p /app/.next/cache/images && chown -R node:node /app/.next

CMD ["npm", "start"]