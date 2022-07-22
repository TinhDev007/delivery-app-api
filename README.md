

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/TinhDev007">
    <img src="./resources/TinhDev007.jpg" alt="Logo" >
  </a> -->

  <h3 align="center">Delivery App API</h3>

  <p align="center">
    Backend API for delivery App.
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
<summary><b>Table of content</b></summary>
<ol>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#built-with">Built with</a>
    </li>
    <li>
      <a href="#implementation">Implementation</a>
    </li>
  </ol>
</details>

---

# About

>This project provides a subsystem participating in storing user data and providing API for calling from front-end.


# Built with

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
- Run `$ npm run prod`

[contributors-shield]: https://img.shields.io/github/contributors/TinhDev007/delivery-app-api.svg?style=for-the-badge
[contributors-url]: https://github.com/TinhDev007/delivery-app-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/TinhDev007/delivery-app-api.svg?style=for-the-badge
[forks-url]: https://github.com/TinhDev007/delivery-app-api/network/members
[stars-shield]: https://img.shields.io/github/stars/TinhDev007/delivery-app-api.svg?style=for-the-badge
[stars-url]: https://github.com/TinhDev007/delivery-app-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/TinhDev007/delivery-app-api.svg?style=for-the-badge
[issues-url]: https://github.com/TinhDev007/delivery-app-api/issues
[license-shield]: https://img.shields.io/github/license/TinhDev007/delivery-app-api.svg?style=for-the-badge
[license-url]: https://github.com/TinhDev007/delivery-app-api/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/xdtn7
[product-screenshot]: images/screenshot.png

[EMQX]: https://www.emqx.io/docs/docs-assets/img/logo-broker.da1e68d6.png
[EMQX-url]: https://www.emqx.io/docs/en/v5.0/
[postgresql]: https://img.shields.io/badge/postgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white
[postgresql-url]: https://www.postgresql.org/docs/10/index.html
[nodejs]: https://img.shields.io/badge/NodeJS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[nodejs-url]: https://nodejs.org/dist/latest-v18.x/docs/api/
[Expressjs]: https://img.shields.io/badge/ExpressJS-F7DF1E?style=for-the-badge&logo=express&logoColor=black
[Expressjs-url]: https://nodejs.org/dist/latest-v18.x/docs/api/
[tts]: https://www.thethingsnetwork.org/docs/quick-start/tts-ce.png
[tts-url]: https://nodejs.org/dist/latest-v18.x/docs/api/

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 