# Docker Setup and Basic Commands – Step-by-Step Guide for Beginners

Hi everyone,

I hope you are doing well!

Before starting your project with Docker, please make sure that Docker Desktop and WSL (Windows Subsystem for Linux) are properly installed and configured on your PC.

If you are using Windows, **WSL 2 is generally recommended for running Docker Desktop with the WSL 2 backend.** Please complete the initial setup first, then follow the steps in this guide to build and run your application using Docker.

## Step 1: Enable Virtual Machine Platform

First, open **Command Prompt (CMD) as Administrator**.

To do this:
1. Open the Start menu.
2. Search for `cmd`.
3. Right-click **Command Prompt** and select **Run as administrator**.
4. Execute the following command:

```cmd
DISM /Online /Enable-Feature /FeatureName:VirtualMachinePlatform /All
```

Wait for the command to complete. If Windows asks you to restart your PC, please do so.

## Step 2: Install WSL

After restarting your PC, open Command Prompt or PowerShell as Administrator and execute:

```cmd
wsl --install
```

This command installs WSL and, by default, a Linux distribution if one is not already installed.

Next, restart your PC if prompted and complete the Linux distribution setup by creating a username and password.

To check whether WSL is installed correctly, run:

```cmd
wsl --status
wsl --list --verbose
```

If necessary, set WSL 2 as the default version:

```cmd
wsl --set-default-version 2
```

**Note:** If WSL is already installed and working correctly, you may skip the installation steps.

## Step 3: Install and Configure Docker Desktop

1. Download Docker Desktop from the official website: https://www.docker.com/products/docker-desktop/
2. Install Docker Desktop by following the installation instructions.
3. If prompted, select the **WSL 2 backend**.
4. Open Docker Desktop and wait until it finishes starting.
5. If required, open Docker Desktop settings and ensure that WSL 2 integration is enabled for your Linux distribution.

To verify that Docker is working, open a new terminal and run:

```bash
docker --version
docker info
docker run hello-world
```

If the `hello-world` container runs successfully, Docker is ready to use.

If you encounter an error, please resolve the Docker Desktop or WSL configuration issue before proceeding to the next steps.

## Step 4: Create the Docker Files

Open your project in Visual Studio Code (VS Code).

In the root directory of your project, create the following two files:

- `Dockerfile`
- `.dockerignore`

**Important:** Make sure the filename is exactly `Dockerfile`, without any file extension such as `.txt`.

The `.dockerignore` file helps prevent unnecessary files and folders from being included in the Docker build context.

For a Node.js project, you can start with the following `.dockerignore` example:

```text
node_modules
.git
.env
npm-debug.log
```

Please do not include sensitive information, such as passwords, API keys, or environment variables, in your Docker image.

## Step 5: Install the Container Tools Extension in VS Code

To make working with Docker easier, please install the **Container Tools** extension in Visual Studio Code.

1. Open VS Code.
2. Click the Extensions icon in the sidebar.
3. Search for `Container Tools`.
4. Install the appropriate extension.

This extension can help you view and manage containers and images directly from VS Code.

## Step 6: Write the Dockerfile

Add the following example to your `Dockerfile`. This example is suitable for a basic Node.js application that has a `package.json` file and an `npm start` script.

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Explanation of each instruction

- **`FROM node:22-alpine`** – Specifies the base image containing Node.js.
- **`WORKDIR /app`** – Sets `/app` as the working directory inside the container.
- **`COPY package*.json ./`** – Copies the package manifest and, if present, the npm lock file into the container.
- **`RUN npm install`** – Installs the application's dependencies.
- **`COPY . .`** – Copies the remaining project files into the container, excluding files matched by `.dockerignore`.
- **`EXPOSE 3000`** – Documents that the application is expected to use port `3000` inside the container.
- **`CMD ["npm", "start"]`** – Specifies the command that runs when the container starts.

**Important:** Please make sure that your `package.json` contains a valid `start` script and that your application listens on port `3000`. If your application uses a different port or startup command, adjust the Dockerfile accordingly.

Dockerfile instructions are conventionally written in uppercase for readability, although Docker does not require uppercase instruction names.

## Step 7: Build the Docker Image

Open the VS Code terminal in your project's root directory and execute:

```bash
docker build -t docker-img-1 .
```

### Explanation

- `docker build` – Builds a Docker image using the instructions in the Dockerfile.
- `-t docker-img-1` – Assigns the name `docker-img-1` to the image.
- `.` – Uses the current directory as the build context.

Wait for the build process to finish successfully before moving to the next step.

To verify that the image was created, run:

```bash
docker images
```

You should see `docker-img-1` in the list of available images.

## Step 8: Create and Run a Container

After building the image, execute the following command:

```bash
docker run -d --name my-node-container -p 8080:3000 docker-img-1
```

This command creates a new container from the image and starts it.

### Explanation of the options

- **`-d`** – Runs the container in the background.
- **`--name my-node-container`** – Assigns a readable name to the container.
- **`-p 8080:3000`** – Maps port `8080` on your PC to port `3000` inside the container.
- **`docker-img-1`** – Specifies the image used to create the container.

Since the example application listens on port `3000`, you can try accessing it at:

http://localhost:8080

**Important:** The port mapping follows this format:

`-p HOST_PORT:CONTAINER_PORT`

For example, `-p 8080:3000` means that you access the application through port `8080` on your PC, while the application runs on port `3000` inside the container.

If your application listens on port `8080` inside the container instead, use a matching mapping such as `-p 8080:8080`.

## Step 9: Manage Docker Containers Using the Terminal

Please familiarize yourself with the following basic Docker commands.

### 1. Check running containers

```bash
docker ps
```

Displays containers that are currently running.

### 2. Check all containers, including stopped containers

```bash
docker ps -a
```

Displays both running and stopped containers.

### 3. Stop a container

```bash
docker stop my-node-container
```

Stops the specified running container gracefully.

### 4. Start a stopped container

```bash
docker start my-node-container
```

Starts an existing stopped container.

### 5. Restart a container

```bash
docker restart my-node-container
```

Stops and starts the specified container again.

### 6. View container logs

```bash
docker logs my-node-container
```

Displays the logs generated by the application inside the container.

To follow the logs continuously, use:

```bash
docker logs -f my-node-container
```

Press `Ctrl + C` to stop following the logs. This does not normally stop the container.

### 7. View Docker images

```bash
docker images
```

Lists the Docker images available locally.

### 8. Remove a stopped container

```bash
docker rm my-node-container
```

Removes the specified stopped container. If it is still running, stop it first.

### 9. Remove a Docker image

```bash
docker rmi docker-img-1
```

Removes the image if it is not being used by an existing container. You may need to remove dependent containers first.

## Step 10: Common Issues and Troubleshooting

If you encounter problems, please check the following:

**Issue 1: Docker commands are not recognized**

- Confirm that Docker Desktop is installed.
- Open Docker Desktop and wait for it to start.
- Open a new terminal and run `docker --version`.

**Issue 2: WSL is not working**

Run the following command in an Administrator terminal:

```cmd
wsl --update
```

Then check the installed distributions:

```cmd
wsl --list --verbose
```

If a distribution is using WSL 1 and you need WSL 2, you can convert it using:

```cmd
wsl --set-version Ubuntu 2
```

Replace `Ubuntu` with the actual distribution name shown on your PC.

**Issue 3: The application is not accessible in the browser**

- Check that the container is running using `docker ps`.
- Check the application logs using `docker logs my-node-container`.
- Confirm that the application is listening on the expected port.
- Verify that the host and container ports are mapped correctly.

**Issue 4: The container exits immediately**

Run:

```bash
docker ps -a
docker logs my-node-container
```

Review the logs to identify possible issues with the application, dependencies, or startup command.

**Issue 5: The container name is already in use**

Container names must be unique. Stop and remove the old container if it is no longer needed, or choose a different name for the new container.

## Final Checklist

Before you start working on your project, please confirm that:

- [ ] Virtual Machine Platform is enabled.
- [ ] WSL 2 is installed and working.
- [ ] Docker Desktop starts successfully.
- [ ] The Docker CLI works in your terminal.
- [ ] The `Dockerfile` and `.dockerignore` files are present in the project root.
- [ ] The Docker image builds successfully.
- [ ] The container starts and the application is accessible through the correct port.
- [ ] You understand the basic commands for checking, stopping, starting, restarting, and inspecting containers.

Please follow the steps in the given order. If your WSL and Docker Desktop setup is already complete and working correctly, you can proceed directly to the project setup and Docker commands.

If you face any issues, please review the troubleshooting section and share the exact error message so that we can identify and resolve the problem together.

Thank you for your time and cooperation!
