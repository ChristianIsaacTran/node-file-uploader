# purpose of this repo

- This is a project going over the things I learned in the previous ORM section with Prisma in the odin project.

- Make sure to download all of the required prisma packages. Outlined in the project directions on:

        https://www.theodinproject.com/lessons/nodejs-file-uploader

## project notes

- When installing prisma, the required packages are:

        - prisma -> prisma client itself, allows CLI prisma commands

        - @prisma/adapter-pg -> to connect prisma to postgreSQL database

        - @prisma/client -> to interact with the database and send queries

        - dotenv -> to load environment variables into prisma

- node has automatic module detection. As long as I don't mix ES6 modules and commonJS, it should automatically detect which is which. Also, the "type" attribute in package.json is not required for this, so I will omit this from my future projects unless needed.

- One problem I ran into was I was unable to run npx prisma migrate dev, but that was because I forgot to install the prisma library itself.

- The main CLI prisma commands are:

        npx prisma migrate dev --name init
            - This is to read the schema and apply changes to the database itself

        npx prisma generate
            - This is to generate a new client to interact with the database. Has basic CRUD methods.

        - Now that the prisma schema is synced with the database and I generated a client, I have to explicitly create a prisma client. I would have to make a new file and export the client to use.

- I kept forgetting that when importing the prisma client that I made in models/prisma.js, I exported it inside an object {prisma}, so I need to destructure it first before it is usable. so the proper import is:

            const {prisma} = require(path to prisma.js);

            or

            import {prisma} from "path to prisma.js";

- The universal hash salt amount for this project is 15 with bcryptjs
