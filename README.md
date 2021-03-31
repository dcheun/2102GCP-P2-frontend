# Online Education - Front end

This is the front end for Revature's 2102 Java GCP curriculum - Project 2. It is built to the specifications outlined below. 

Online Education is an online platform that allows instructors to create courses and students to search for and enroll in courses.

Only registered users can login and create or enroll in courses. Users can sign up via the sign up page and select if they want to be an instructor or a student. Once the user logs in they are redirected to the main dashboard. From the main dashboard users can view their courses and list of all other available courses are presented in a bottom section. There is a search bar at the top where they can search for courses.

For instructors, they have a button that will allow them to create new courses or edit an existing one. Each course can have many course materials. Once this is saved, the course will be added to their MY COURSES section.

For students, they can enroll in a course by viewing it in the details page and clicking on Enroll. Students can start a course to begin viewing course materials. In this view they can also rate and leave comments for the courses they take.

Non-registered users are free to browse available courses on the platform and view it's details.

## Technical Specifications

The front end is written using the Angular Framework and created using Angular CLI. There is a separate repository for the backend.

## API Specifications

This project utilizes the corresponding backend API for full functionality. JWTs are created and stored locally. They are used to make authorized requests to the backend. When a user logs out, the JWT is deleted from local storage.

### Deployment - GCP and Firebase

- Frontend is deployed via firebase hosting

### Usage and installation

This project can be installed by cloning the repository, running npm install and ng serve to start the development server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
