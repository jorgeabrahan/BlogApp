# (CRUD) Blog Posts

Full-Stack web application that allows users to create, read, update, and delete blog posts. The application is built using React v16 (with class components and hooks components), OAuth2, SCSS, Redux, Node.js, Express, and MongoDB.

For both projects you need .env files, I'll provide those files through chat.

- [(CRUD) Blog Posts](#crud-blog-posts)
  - [Back End](#back-end)
    - [Getting Started](#getting-started)
  - [Front End](#front-end)
    - [Prerequisites](#prerequisites)
      - [Change Node.js version using nvm](#change-nodejs-version-using-nvm)
      - [Change Node.js version using fnm](#change-nodejs-version-using-fnm)
    - [Getting Started](#getting-started-1)

## Back End

### Getting Started

Open your terminal and navigate to the backend directory of the project:

```bash
cd back-end
```

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

To start the server, you have two options"

1. For a standard start, run:

```bash
npm run start
```

2. If you want the server to watch for changes and restart automatically, run:

```bash
npm run dev
```

## Front End


### Prerequisites

This project is built using React v16. To ensure compatibility, you need to use Node.js version 14. 
In this documentation I'll explain how to change your Node.js version using two different tools, you should choose the one that best suits your needs:

#### Change Node.js version using nvm

1. **Install nvm (Node Version Manager):** If you don’t have nvm installed, please refer to the nvm GitHub repository for installation instructions.

2. **Install Node.js v14:** Use nvm to install Node.js version 14 (if you've already installed Node.js v14, you can skip this step):

> **Note**: the use command will only set the version 14 while the terminal session is active, therefore, you'll need to run the use command every time you open a new terminal session before running the project, or you could also set the version 14 as the default version if you don't want to run the use command every time you open a new terminal session

```bash
nvm install 14
```

3. **Use Node.js v14:** Set Node.js v14 as the active version:

```bash
nvm use 14
```

4. **Verify Node.js Version:** Ensure that you are using the correct version of Node.js:

```bash
node -v
```

This should output something like v14.x.x.

#### Change Node.js version using fnm

1. **Install fnm (Fast Node Manager):** If you don’t have fnm installed, please refer to the fnm GitHub repository for installation instructions.

2. **Install Node.js v14:** Use fnm to install Node.js version 14 (if you've already installed Node.js v14, you can skip this step):

```bash
fnm install 14
```

3. **Use Node.js v14:** Set Node.js v14 as the active version:

> **Note**: the use command will only set the version 14 while the terminal session is active, therefore, you'll need to run the use command every time you open a new terminal session before running the project, or you could also set the version 14 as the default version if you don't want to run the use command every time you open a new terminal session

```bash
fnm use 14
```

4. **Verify Node.js Version:** Ensure that you are using the correct version of Node.js:

```bash
node -v
```

This should output something like v14.x.x.

### Getting Started

Once you have changed the Node.js version, navigate to the front-end directory and install the dependencies:

```bash
cd front-end
npm install
```

Lastly, start the project:

```bash
npm start
```
