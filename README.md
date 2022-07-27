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

- Fill the code like below to `.env.auth` file:  
    ```
    passphrase='zxcvbnm'
    secretkey='-----BEGIN RSA PRIVATE KEY-----
    Proc-Type: 4,ENCRYPTED
    DEK-Info: DES-EDE3-CBC,06E151DA1581D532

    pxVerqZsx4dAapS1iiXaMxjQ6DdljvHJVi4dg6VpqjgQepHPe2+PHajQuOe5PjWO
    OQPHENrLqzLk7+AkpTTvdYYNGSGsAH4OF38vBu7ciNOVHDVHyNYioCWgwGE9TfTx
    wOiXr7WeEl0ssmTqr2nA1ihFKWzvBwaYCyf6zEK40i+1gpwYyqt4Bw7K3nqJUdNy
    1EiUgoLhkm70uyp9r+iBqXxoVBr+I1VcLQfrpOde+h0a4iF0+1oXhNA+aBi2Hhxv
    Vo8m5UDIRpFMvkhXaNDsQTNUT/VOHOueF5a9kGdzbmKp3fxz+UnpX10rDHmby94u
    AyFPLW/s3s3r+btdxSsMMLtrZRfMDfuqw7uBuXpYoESuVjG9HpKVmRptg3V+IkiF
    Dc/jKfQ7hVK3X2NG7IAhp9HawmPRsNDyfnuU9QI2iXesc8qTrIv0IPY2AmVZPiUw
    pmvYX7uxXSaZ5nrwk2NusnQ6/0o2drqsxiMoARAg6+2W7FAYAc8fmw2vTYAMwWHd
    h9rOdn3/jh4sQHZUmBRPuBV6sYN3FlaeSwl8UT5urZT55IF97tC6B8g1juNB4VgS
    3CWJhTLGAE5Tbth/HmO9v8kfFN4riEeVcioMqMDAB3/F4N1qOG+Zdm/WNOnJI+vb
    CVeE/aUlVh4JP/+U30WA1OG1uBNznptToqrh+n/QhbG+IT8oHLT+kurQVUpRa8nV
    5x+H05pfUaFeBF9UmMFTUAj3b43020auW6fwxvEPM4H+uo+vH0V0cUc2r7yhfKz9
    MUFOhKXJ4e1N++42QFo005a3VGY+jnf7Tm+HP7zNBWzp9Ebo+hHOwV8iZKuHH6GT
    WSMx80JH9ZGvnaGIUeak/zP2DrcvqAcOX4wWE65GXoklm9kvkLAKEkwfMAAOYDfq
    Z6skESssdZoto6FhhYYGKo2ouEc/LH2zt8R4a8570d1xLBKbmMaD3VNnR81tNa6O
    7YPaPuyhE6DY3Hfr3hQrusvQwePgnXClPi+i0ml6mq+vIzE7NKml9OKN3Uhk38uV
    ZzkkuKHbxO0ht0X6CBT62HyH5cNQT9V+HEpfYrOr60aKgBVP2elutINFm1hEYlMI
    DzHDVLYC4M1WwIT+5+52kbdEVt7yTg+9CDhyYwQpuV4Zn0UfQA2Nk3Uw/ySU4dCH
    Vs4/Clq4S44p0U/dxU286r5RnW+8frfARHVOO/FO7N++Uz88R6gPEdiXVMzC4eLg
    TiSyaGR/N+tXQ1XCJtHGhp/yqRh9aYYfQQrs3s+FLnZhyRgbg3pr+VWZBBM9yWlz
    pBOZzdGHnfTLwXRFRB5fRNKHNNofpKZ1IaPgmDRNbf6UzYC4ZBxoXxBPu3lsLr9L
    T0CxmIJhtWXrGK6uKWSJ/wuNAH+yPXQ6wM9OcsIyFt5JFmCLIr7bsIn+4yU9069n
    fjtnGJx2CyudyFx26oyIkLoilinF+d6E/AsZZEZTq3bUB4MF15SteTUMH4vmb42T
    0A/yVw8KOWo+ORjBn5/ItAj2rn2k9ffepoY9Z/NBvEgv4arcbmEE0Z95EfWpY9sd
    h5NEI6GqfIrmxDQPJJYEIOFfOQbAASdhOP0jy/UOu67bYFrASKvYbw==
    -----END RSA PRIVATE KEY-----
    '
    ```
- Run `$ npm run prod`
