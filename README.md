# TODO APP #

## Project overview ##
- This is a simple todo app api made to solve this [coding challenge](https://github.com/DSIntegrations/software_engineer_challenge)
 It's functionality is to authenticate via a user, and perform CRUD operations to todo item with some restrictions, for example updates and deletes can only be performed on your todos


## Local Set up ##
- **BACKEND**
    * Download the repository, either via git clone, or github desktop
    * Open the project folder and then navigate to the folder containing the app ``cd backend``
    * Define the .env variables, change the name of .env.example for .env and fill out the variables (DB_PASSWORD is the only optional variable)
    * Install packages ``npm install``
    * Seed the database ``npm run seed``, executing this will create the DB and insert the corresponding test users
    * Start the development server ``npm run dev``, executing this will start the server for local use


## API routes guide ##

- ### Auth ###
    * POST /api/login
        - This api call will authenticate you in the todo api and return a token, this token must be sent as Bearer token to be used in future requests, it does not require auth headers

        > How to use?
            > 1. In postman, set the body to RAW JSON and send ``{"userName": "example user", "password": "example password"}`` where the value of each is the value of the user details
            > 2. After the request was sent, a token will be returned, if using postman, set this token in the "Authorization" tab as Bearer token

- ### Todo ###
    * GET /api/todos
        - This API call will return all todos created in the system. The user must be authenticated to use this api call (see [`auth`](#auth)).

        > How to use?
            > 1. In Postman, send a GET request with the base_url of your app (localhost if locally hosted) followed by the route. It doesn't require any body or params, just the auth token. It will return the list of todos or `[]` if no todos exist in the database.

    * GET /api/todos/:id
        - This API call returns a todo item by it's id, replace `:id` with the id you want to use. User must be authenticated to use this api call (see [`auth`](#auth)).

        > How to use?
            > 1. In Postman, send a GET request with the base_url of your app followed by `/api/todos/:id`, where `:id` is the identifier of the todo item and must be sent as part of the url. This will return the details of the specified todo, or a 404 if the todo is not found.

    * POST /api/todos/create
        - This API call creates a new todo item. User must be authenticated to use this api call (see [`auth`](#auth)).

        > How to use?
            > 1. In Postman, send a POST request to `/api/todos/create` with the base_url of your app. Set the body to RAW JSON with the details of the todo to be created (`{"title": "Example Todo", "description": "Detailed description of the todo"}`). This will create a new todo in the database assigned to the user who created it.

    * PUT /api/todos/:id
        - This API call updates a todo item by it's id, replace `:id` with the id you want to use. User must be authenticated to use this api call (see [`auth`](#auth)).

        > How to use?
            > 1. In Postman, send a PUT request to `/api/todos/:id` with the base_url of your app, where `:id` is the identifier of the todo item to update and must be sent as part of the url. Set the body to RAW JSON with the fields to update (`{"title": "Updated Todo Title", "description": "Updated description", "completed": true}`) **At least one field must be sent, if a field not considered by the system is sent it will return a code 400**. This will update the specified todo item if it belongs to the authenticated user.

    * DELETE /api/todos/:id
        - This API call deletes a todo item by it's id, replace `:id` with the id you want to use. User must be authenticated to use this api call (see [`auth`](#auth)).

        > How to use?
            > 1. In Postman, send a DELETE request to `/api/todos/:id` with the base_url of your app, where `:id` is the identifier of the todo item to delete and must be sent as part of the url. This will delete the specified todo item if it belongs to the authenticated user.