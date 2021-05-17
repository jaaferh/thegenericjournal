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

- Add 'back to top' button
- Set limit to Bio and Topic characters 
- Add confirmation dialogue on delete
- Sort lists properly
- Fix the security issue with cloudinary (mixed insecure display content)
- Get doTopicFilter in post-form component to display properly
- Implement comment collapse and hide
- Find a way to preserve previous page (data: { detachable: 1 })
- Make sure suitable for mobile
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