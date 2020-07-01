FROM node:10-alpine


WORKDIR /home/node/app
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

COPY . .

# USER node

RUN yarn
# RUN yarn build
# RUN cp -r ./src/templates ./build/

# COPY --chown=node:node . .

# EXPOSE 3001