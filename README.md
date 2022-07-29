## Platforms

|Components |Platforms | Version |
| :---      |   :---            | :---            |
|Database|[![PostgreSQL][postgresql]][postgresql-url]| 14.4 |
|Web Server| [![NodeJS][nodejs]][nodejs-url]| 16.15.0 |

# Implementation

## Database

You can **restore** the database of this system from the file in this path: `delivery-app-api/database/ddl_for_restore.sql`. If you don't know how to **restore**, do the following steps:

- Install PostgreSQL (choose port `5432`)
- Open Pgadmin 4 
- To enable `Restore` database, you have to correct the Binary Path in the Preferences dialog first ([more details](https://dba.stackexchange.com/questions/149169/binary-path-in-the-pgadmin-preferences)):
    - Open `File` &#8594; `Preferences` &#8594;  `Paths` &#8594; `Binary Paths`
    - Find `PostgreSQL 14` (your PostgreSQL version) and paste the binary path (e.g. `C:\Program Files\PostgreSQL\14\bin`) to that box 

- Create a database name `webstore`.

- Restore `webstore` database with source code from this path: `delivery-app-api/database/ddl_for_restore.sql`.

(You can also paste the content in `delivery-app-api/database/ddl_in_text.sql` to `Query Tool` of `webstore` database to restore the database)
## Web Application

- Run `$ npm install`
- Create `.env.database` file in root level

- Fill your database information to `.env.database` file:
    ```
    HOST="<host-name>"
    PORT=<your postgresql port>
    UNAME="postgres"
    PASSWORD="root"
    DATABASE_NAME="webstore"
    ```
- Create private/public key (For JWT authentication):
    - Install [OpenSSL](https://slproweb.com/products/Win32OpenSSL.html) (version 63MB)
    - Add the path of binary file `...\OpenSSL-Win64\bin` to environment variables.
    - To create private key, run this cmd in root level:
    `openssl genrsa -des3 -out private.pem 2048` 
    - Enter passphrase
    - Fill the passphrase like below to `.env.auth` file in root level:  
        ```
        passphrase='your-passhrase'
        ```
    - To create public key, run this cmd in root level: `openssl rsa -in private.pem -outform PEM -pubout -out public.pem` 

- Create `.env.webserver` file in root level

- Fill your database information to `.env.webserver` file:
    ```
    PORT=<your webserver port>
    ```
- Run `$ npm run prod` for **production** environment, run `$ npm run dev` for **development** environment

[postgresql]: https://img.shields.io/badge/postgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white
[postgresql-url]: https://www.postgresql.org/docs/10/index.html
[nodejs]: https://img.shields.io/badge/NodeJS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[nodejs-url]: https://nodejs.org/dist/latest-v18.x/docs/api/