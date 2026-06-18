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

- Assume that two or more users cannot have the same exact username in the database. Will probably add a check for that later.

- I am going to ignore how slow the prisma ORM takes when running queries with the generated client. I just need to get this working properly.

- When using the prisma client to query the database, the model/table
  name is going to be lowercase since it follows the class-property naming
  convention, where properties are lowercase and model names are starting
  with uppercase.

- Has an issue with prisma's .findUnique();, but in the documentation
  since it is doing a search off of a unique field value, the where: option is supposed to contain a literal value rather than an object value. For example:

        .findUnique({
            where: {
                id: uniqueId
            }
        });

        but in something that does support filtering like .findFirst():

        .findFirst({
            where: {
                id: {
                    equals: uniqueId

                    //other filtering options
                }
            }
        });

- For simplicity and time, I am not going to code in the authentication check for the routes to prevent a non-authenticated user
  from manually visiting other routes through url.

- The multer library is to parse file fields from the form. The "file" field in the form is a different kind of form field data, so the 
express "urlencoded()" cannot parse the file field, I need something like the multer middleware to help parse it. Different files 
require different libraries to help parse files or a specific type of file, but in this case, multer is used with the form HTML attribute
of "enctype="

- For the folders functionality, I'll try to let users create folders in terms of routes, but dynamic route creation is something I have to research.
