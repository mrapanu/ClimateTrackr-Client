# ClimateTrackr Project Documentation

Welcome to the ClimateTrackr project! This document provides an overview of the project components, installation instructions, and usage guidelines.

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
   - [Install with Docker](#install-with-docker)
   - [Install with Kubernetes](#install-with-kubernetes)
   - [Sensor Installation](#sensor-installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)

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
To install ClimateTrackr using Docker, follow these steps:
`TO DO`

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
