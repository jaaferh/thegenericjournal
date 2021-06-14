# The Generic Journal
The most generic journal you can find online.
A project mainly to practice using MongoDB and Express.js as an API.

Uses MEAN stack 

## Running DEV

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

**API: localhost:3000**

**SPA: localhost:4200**

## UML Diagram (Rough sketch)

![UML Diagram](https://github.com/jaaferh/thegenericjournal/blob/main/UML%20Diagram.png)

Check out this UML diagram in MySQL form using DrawSQL: https://drawsql.app/jaafer-s-team/diagrams/tgj

## Short-Term Todo:

- Make all dev changes in development branch and then merge to main. Make all deployment changes in main
- Add debug messages to other controllers after testing it works
- NgModel issue with comment edits on the same level
- Add 'back to top' button
- Find a way to preserve previous page (data: { detachable: 1 })
- Deploy a DEV build to Heroku

## Long-Term Todo: 

- Add authentication using JWT tokens
- Add AuthGuard to Routes once Authentication added
- Consider alternative for Topic deleting all Posts first
- Document where needed
- Add natural keys to Topics and other relevant schemas
- Consider a preview for posts before updating/creating

## Extra Plans:

- Experiment with Docker
- Create Progressive WebApp version of the site using Chrome Lighthouse