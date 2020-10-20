# node-express-upload-storage

An example Node.js app that receives uploaded files and stores them into cloud storage.

# Build production container image

> docker build -t uploadtest .

# Run production container

> docker run -it --rm -p3000:3000 --env-file .env uploadtest

# Develop with docker-compose

> docker-compose up -d

Open http://localhost:3000 in a browser.

> docker-compose down

# Develop with VSCode Remote Container extension

Open this folder with VSCode, then select "Remote-Containers: Reopen in Container" menu. Once open in the container, go to integrated terminal, then run:

> npm run dev

Open http://localhost:3000 in a browser.

## Note:

You should create a .env file and put your access keys etc in there before running the container.
