### Install
- Install [NodeJs](https://nodejs.org/en/)
- Download project files from [Release](https://github.com/oscar60310/shipment-creator-2/releases)
- Install packages
> npm install --production
- Prepare a Postgre database
- Install [Flyway](https://flywaydb.org/)
- Update database
> flyway -url=jdbc:postgresql://localhost/sctest -user=sctest -password=sctest -connectRetries=60 -locations=migrations migrate
- Start service
> npm start