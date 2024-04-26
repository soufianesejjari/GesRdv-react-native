
# Overview 

Gestion de rendez-vous (Appointment Management): A web-based and mobile appointment management system developed using Spring Boot for the backend, incorporating Spring Security and Spring Data JPA, and React Native with Redux for the frontend mobile application. The system facilitates the scheduling of medical appointments, offering functionalities like user authentication, real-time availability checking, and appointment confirmation.

[Back-end  Spring Boot RestApi  Repository](https://github.com/soufianesejjari/GesRDV)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Objective](#objective)
- [Key Features](#key-features)
- [Screens](#screens)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.

## Usage

1. Start the development server using `npm start`.
2. Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- React Native
- Redux
- Expo

## Objective

The objective of GesRDv is to provide a simple and efficient way to manage appointments.

## Key Features

- User Authentication: Secure login system for users.
- Admin Panel: A dedicated admin panel for managing centers.
- Center Details: Detailed information about each center.
- User Profile: Users can view and update their profile information.
- Responsive Design: The app is responsive and works on mobile devices.
## Screens

- LoginScreen - This screen is used for user authentication.
- CentersScreen - This screen displays a list of centers.
- CenterDetailScreen - This screen provides detailed information about a specific center.
- Profile - This screen displays user profile information.
- MenuAdmin - This screen is used for admin tasks.
- CentreModifie - This screen is used for modifying center details.

## Project Structure

The project structure is as follows:

- `App.js` - The entry point of the app.
- `redux/` - Contains Redux store and reducers.
- `screens/` - Contains the different screens of the app.
- `services/` - Contains service-related files.
- `assets/` - Contains static assets such as images and fonts.
- `package.json` - Contains the project dependencies and scripts.graph TB
