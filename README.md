# A motion detection Web App

🐒 A Web app that uses motion detection to take a snapshot when something moves, then send the images to your telegram bot.

![](https://greenido.files.wordpress.com/2018/08/img_7763-effects.jpg?w=696)

### Notes

- you can read more about a similar project I did with [Raspberry Pi](https://greenido.wordpress.com/2018/10/09/raspberry-pi-as-security-camera-with-motion-detection/)

- To run: `npm install`, then `gulp` (or `gulp watch`), then `npm start`. Everything is built to `/dist`. If you're in dev, hit `http://localhost:3000` to run the web app.

- In dev, you'll want to create a `.env` file in the root with the following contents (edit as appropriate):

```javascript
process.env.ENVIRONMENT = "dev";
process.env.PORT = 8080;
process.env.SESSION_SECRET = "your secret string";
```

---

⚽️ This web app does require `https` to run in production. It will run fine under `http` on localhost, though.
