import express from "express";

const app = express();

app.listen(8080);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Get Endpoint Is Working Fine!"
    });
});

/* 

Please find below the Dockerfile configuration for the Node.js application. 
Kindly make the following adjustments based on the project requirements:

- Use `FROM node:lts` as the base image.
- Set the working directory to `/my-app`.
- Copy the `package.json` and `package-lock.json` files.
- Use `RUN npm install --only=production` for JavaScript projects, if applicable.
- Copy the remaining project files using `COPY . .`.
- For TypeScript projects, include `RUN npm run build` to compile the application.
- Expose port `8080`.
- Configure the startup command using `pm2-runtime`:
  - For JavaScript projects, use `index.js`.
  - For TypeScript projects, use the compiled entry point `dist/index.js`.

Please ensure that the Dockerfile is updated according to the project's requirements.

Thank you!

*/
