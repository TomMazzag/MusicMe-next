FROM node:22.22.0-alpine3.23 AS dev

# Set the working directory inside the container
WORKDIR /app

RUN npm install -g pnpm

# Copy package.json and package-lock.json (if available)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install

# Copy project files
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
