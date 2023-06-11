Kelompok D4 - Recipes Website

# LaRicetta: An open cookbook created using the PEN (PostgreSQL, Express, Node.JS) framework stack
This README describes the making of LaRicetta, an online cookbook with recipes made by the people for the people to implement and be inspired.

## Project overview
This project was created as the final assignment of the 2022/2023 _Database Systems and Lab_ (ENCE604016) course for students in Computer Engineering major by Department of Electrical Engineering, Faculty of Engineering, University of Indonesia. The group that worked on the project, D4, consists of these student:

1. Alifya Zhafira Ananda
2. Muhammad Rizky Utomo
3. Andikha Wisanggeni

## Project details
This project uses an SQL-driven database managed by [`PostgreSQL`](https://www.postgresql.org/). This database is stored in a cloud owned by Neon, an open-source PostgreSQL database. This database connects to a [`Node.js`](https://nodejs.org/en/) backend that drives the database using [`pg`](https://www.npmjs.com/package/pg). This backend serves as a driver to the frontend, which is created using the [`React`](https://react.dev/) framework. 

The website has two types of user: regular user and Admin user. A regular user can register for an account if not created before. The user can then sign in using the credentials used to create said account. A regular user can do the following things:

1. Create a recipe and edit said recipe or even delete it
2. Comment and rate recipes made by other users
3. Follow other users in the website.

An Admin user manages the website as a whole except changing the website's schema. Here are the things that they can do:

1. Edit a recipe or delete it
2. Edit a comment or delete it
3. Delete an account


## Project details
