# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:14.6
# Set the working directory
WORKDIR /pipelineApi
# copy package.json into the container at /client
COPY package*.json /pipelineApi/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . /pipelineApi/
# Make port 3000 available to the world outside this container
EXPOSE 3001
# Run the app when the container launches
CMD ["npm", "start"]
