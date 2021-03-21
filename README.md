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

## Short-Term Todo:

- Finish up post form
- Comment Edit and like/dislike
- Create a file upload service using cloudinary API. (https://stackoverflow.com/questions/47936183/angular-file-upload)
- Sanitise Author creates and edits using Regex

## Long-Term Todo: 

- Look at an alternative to Pagination.
- Find a way to preserve previous page (data: { detachable: 1 })
- Add AuthGuard to Routes once Authentication added
- Add confirmation dialogue on delete
- Consider alternative for Topic deleting all Posts first
- Document where needed