## Prerequisites
Make sure you have the following installed:

   - Node.js (v18+ recommended)
   - Docker
   - Redis
   - Mongo compass
   - Git
## Installation
   
    npm install

## Environment Variables
Create a .env file in the project root with the following variables:
```bash
PORT=3000
DB_NAME=mydb
JWT_SECRET="1(&h85d~OR:A,-K`G1`{ssv["
CACHE_SERVER=cadt-redis-1
API_HOST=localhost:3000
```
Or you can copy from .env.template
   cp .env.template .env
## Docker Setup

The project uses docker-compose.yml to define services:
   - app: The Express.js application.
   - redis: Redis service for caching.
   - nginx: Load balancer and reverse proxy.

## Build and run the project
After set up .env in project and install npm install node package already
you can build and rund the project following the docker command:

   
    docker compose build
    
       run this command to build container and pull images for this project

   
    docker compose up -d
    
       run this command to start the services that build in container

    docker compose down
    
        run this command to stop services that running in container
   

