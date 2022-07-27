## Platforms

|Components |Platforms | Version |
| :---      |   :---            | :---            |
|Database|[![PostgreSQL][postgresql]][postgresql-url]| 14.4 |
|Web Server| [![NodeJS][nodejs]][nodejs-url]| 16.15.0 |

# Implementation

## Database

You can restore the database of this system from the file in this path: `delivery-app-api/database/ddl_for_restore.sql`. If you don't know how to restore, do the following steps:

- Install PostgreSQL (choose port `5432`)
- Open Pgadmin 4 (in port: `5050`)
- To enable `Restore` database, you have to correct the Binary Path in the Preferences dialog first ([more details](https://dba.stackexchange.com/questions/149169/binary-path-in-the-pgadmin-preferences)):
    - Open `File` &#8594; `Preferences` &#8594;  `Paths` &#8594; `Binary Paths`
    - Find `PostgreSQL 14` (your PostgreSQL version) and paste the binary path (e.g. `C:\Program Files\PostgreSQL\14\bin`) to that box 

- Create a database name `webstore`.

- Restore `webstore` database with source code from this path: `delivery-app-api/database/ddl_for_restore.sql`.

(You can also paste the content in `delivery-app-api/database/ddl_in_text.sql` to `Query Tool` of `webstore` database to restore the database)
## Web Application

- Run `$ npm install`
- Create `.env.database` file in root level

- Fill the code like below to `.env.database` file:
    ```
    HOST="localhost"
    PORT=5432
    UNAME="postgres"
    PASSWORD="root"
    DATABASE_NAME="webstore"
    ```
- Create private/public key:
    - To create private key, run `openssl genrsa -des3 -out private.pem 2048` in root level
    - Enter passphrase
    - Fill the passphrase like below to `.env.auth` file:  
        ```
        passphrase='your-passhrase'
        ```
    - To create public key, run `openssl rsa -in private.pem -outform PEM -pubout -out public.pem` in root level


- Run `$ npm run prod`
