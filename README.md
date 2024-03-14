# ClimateTrackr

Welcome to the ClimateTrackr project! This document provides an overview of the project components, installation instructions, and usage guidelines.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
   - [Install with Docker](#install-with-docker)
   - [Install with Kubernetes](#install-with-kubernetes)
   - [Sensor Installation](#sensor-installation)
3. [Usage](#usage)

## Overview

The ClimateTrackr project is a comprehensive system designed to monitor and track climate data such as temperature and humidity. It consists of the following components:

- ClimateTrackr Server: A .NET Core Web API responsible for authentication, data ingestion from RabbitMQ, report generation, and email report sending.
- ClimateTrackr Client: A React-based web application that interacts with the ClimateTrackr Server to provide user interfaces for administration, data visualization, and user management.
- ClimateTrackr Sensor and ClimateTrackr SensorMicro: Python-based sensors used to gather climate data.
- MySQL Database: A relational database management system used for storing climate data and other relevant information.
- RabbitMQ Server: A message queuing system used for communication between the ClimateTrackr Server and sensors.

An overview schema of this project:

![Project Overview](https://raw.githubusercontent.com/mrapanu/ClimateTrackr-Sensor/main/images/project_overview.png)

## Installation

You can install the ClimateTrackr components using either Docker or Kubernetes.

### Install with Docker

#### Manual Installation:

1. **Create Network and Volume**

   Before running MySQL container, create a Docker network and volume:

   ```bash
   docker network create climatetrackr-default-network
   docker volume create ct_mysql_data
   ```

2. **Pull Docker Images or build manually the climatetrackr-server and climatetrackr-client images using Dockerfile from the repository**
   
   Run the following commands to pull the required Docker images:

   ```bash
   docker pull arm64v8/mysql
   docker pull rabbitmq:3-management
   docker pull mrapanu/climatetrackr-server:latest
   docker pull mrapanu/climatetrackr-client:latest
   ```

   Or clone the repository ClimateTrackr-Server / ClimateTrackr-Client and build the images:

   ```bash
   docker pull arm64v8/mysql
   docker pull rabbitmq:3-management
   git clone https://github.com/mrapanu/ClimateTrackr-Client.git
   cd ClimateTrackr-Client
   docker build -t climatetrackr-client .
   git clone https://github.com/mrapanu/ClimateTrackr-Server.git
   cd ClimateTrackr-Server
   docker build -t climatetrackr-server .
   ```

3. **Run MySQL Container**

   Change `MYSQL_ROOT_PASSWORD` environment variable:
   ```bash
   docker run -d \
   --name ct-mysql \
   -p 3306:3306 \
   -e MYSQL_ROOT_PASSWORD=<mysqlpasswd> \
   -v ct_mysql_data:/var/lib/mysql \
   --network climatetrackr-default-network \
   --restart unless-stopped \
   arm64v8/mysql
   ```
4. **Run RabbitMQ Container**

   ```bash
   docker run -d \
   --name ct-rabbitmq \
   -p 5672:5672 \
   -p 15672:15672 \
   --network climatetrackr-default-network \
   --restart unless-stopped \
   rabbitmq:3-management
   ```
5. **Run ClimateTrackr Server Container**

   Ensure that MySQL and RabbitMQ containers are started before starting the ClimateTrackr server. Change the `TZ`, `DB_CONN_STRING`,`RABBITMQ_CONN_STRING`, `RABBITMQ_EXCHANGE_NAME` `RABBITMQ_ROUTING_KEY`, `JWT_SECRET_TOKEN` environment variables.
   ```bash
   docker run -d \
   --name ct-server \
   -p 9081:80 \
   --network climatetrackr-default-network \
   --restart unless-stopped \
   -e TZ=<YOUR TIMEZONE> \
   -e DB_CONN_STRING="server=ct-mysql;userid=root;password=yourpassword;database=ClimateTrackr;port=3306" \
   -e RABBITMQ_CONN_STRING="amqp://guest:guest@ct-rabbitmq:5672/" \
   -e RABBITMQ_EXCHANGE_NAME=<exchange_name> \
   -e RABBITMQ_ROUTING_KEY=<your_routing_key> \
   -e JWT_SECRET_TOKEN=<secret_token_min_16_chars> \
   -e PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
   -e PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
   --depends-on ct-mysql \
   --depends-on ct-rabbitmq \
   mrapanu/climatetrackr-server:latest
   ```
6. **Run ClimateTrackr Client Container**

   Change `REACT_APP_API_URL` environment variable:
   ```bash
   docker run -d \
   --name ct-client \
   -p 9080:80 \
   --network climatetrackr-default-network \
   --restart unless-stopped \
   -e REACT_APP_API_URL=http://<Your_Docker_Server_IP>:9081/api/ \
   mrapanu/climatetrackr-client:latest
   ```

#### Install with Docker Compose

   To install ClimateTrackr using Docker Compose, follow these steps:

1. **Download docker-compose.yaml**

   Download the `docker-compose.yaml` file from ClimateTrackr-Server or ClimateTrackr-Client repository.

2. **Adjust Environment Variables**

   Open the downloaded `docker-compose.yaml` file in a text editor, and update the following environment variables with your specific values:
   - `TZ`: Your timezone.
   - `DB_CONN_STRING`: Connection string for MySQL. Replace `<mysqlpasswd>` with your MySQL root password.
   - `RABBITMQ_EXCHANGE_NAME`: Name of the RabbitMQ exchange.
   - `RABBITMQ_ROUTING_KEY`: Your RabbitMQ routing key.
   - `JWT_SECRET_TOKEN`: Your JWT secret token (minimum 16 characters).
   - `REACT_APP_API_URL`: API URL for the client. Replace `<Your_Docker_Server_IP>` with your Docker server's IP address.

3. **Run Docker Compose**

   Open a terminal in the directory where you downloaded `docker-compose.yaml` and run the following command:
   ```bash
   docker-compose up -d
   ```

4. **To Remove the entire stack**
   ```bash
   docker-compose down -v
   ```

### Install with Kubernetes

To install ClimateTrackr using Kubernetes, follow these steps:

`TO DO`

### Sensor Installation

Check the guides from:

- [ClimateTrackr Sensor](https://github.com/mrapanu/ClimateTrackr-Sensor)
- [ClimateTrackr SensorMicro](https://github.com/mrapanu/ClimateTrackr-SensorMicro)

## Usage

Once installed, you can use the ClimateTrackr system as follows:

1. Access the ClimateTrackr Client web application using a web browser.
2. Log in with your credentials to access the available features.
3. Admin users can perform tasks such as managing users, rooms, SMTP settings, and viewing reports.
4. Normal users can view climate data, graphs, and configure email notifications.
