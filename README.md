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

## Todo:

- Do update, create and delete methods for Author
- Look at an alternative to Pagination.
- Draw Topic and Post pages
- Find a way to preserve previous page (data: { detachable: 1 })
