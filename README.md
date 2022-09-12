# The Generic Journal
The most generic journal you can find online.
A project mainly to practice using MongoDB and Express.js as an API.

Uses MEAN stack 

## Running DEV

### Manually

Install npm dependencies for both the API and SPA using:

```
npm install
```

Run API after navigating to the TGJ-API folder:

```
cd TGJ-API

npm run serverstart
```

Then navigate to the SPA and run the SPA:

```
cd ..
cd TGJ-SPA

ng serve
```

### With Docker

```
docker compose up
```

**API: localhost:3000**

**SPA: localhost:4200**

## UML Diagram (Rough sketch)

![UML Diagram](https://github.com/jaaferh/thegenericjournal/blob/main/UML%20Diagram.png)

Check out this UML diagram in MySQL form using DrawSQL: https://drawsql.app/jaafer-s-team/diagrams/tgj

## Short-Term Todo:

- Add RouteGuard to prevent users from reaching form pages they shouldnt reach. Consider including role checks as well
- Fix errors toasting as objects
- Forgot password and change password
- Link comments to user/author
- Add debug messages to other controllers after testing it works
- NgModel issue with comment edits on the same level
- Add 'back to top' button
- Find a way to preserve previous page (data: { detachable: 1 })

## Long-Term Todo: 

- Consider alternative for Topic deleting all Posts first
- Document where needed
- Add natural keys to Topics and other relevant schemas
- Consider a preview for posts before updating/creating

## Extra Plans:

- Fix Docker compose dev build not listening to file changes
- Create Progressive WebApp version of the site using Chrome Lighthouse