# Club Members Management System Project - Project Done Report

## Introduction

This report provides an overview of the completed Club Members Management System project, including the achieved goals, implemented features, and project outcomes.

## Project Overview

The Club Members Management System project aimed to develop a system for managing club members, events, and related data. The system's scope included features such as member database management, event management, user authentication, a member's area, role-based access, and a reporting dashboard.

## Implemented Features

The following features have been successfully implemented in the Club Members Management System:

1. Members Database:
   - Add new members with relevant information.
   - Edit existing member details.
   - Remove members from the database.
   - List all members with their respective details.

2. Event Management:
   - Create and manage club events.
   - Assign members to specific events.
   - Track event attendance and participation.

3. Blog Content Management:
   - Create and manage club blogs content.
   - Assign members to specific blogs content.
   - Track event attendance and participation.

3. Admin and Reporting Dashboard:
   - Generate detailed reports on membership statistics, including member count.
  

4. User Authentication:
   - Implement a secure login system for different user roles, such as administrators and members.
   - Ensure proper authentication and authorization mechanisms.

5. Members Area:
   - Provide a personalized area for members to view and manage their own information.
   - Allow members to update their profile, view event attendance, and access relevant resources.

6. Role-Based Access Control:
   - Differentiate access levels for administrators and members.
   - Admins have full control over system functionalities, while members have restricted access based on their roles.

## Project Outcomes

The Club Members Management System project has achieved the following outcomes:

1. Streamlined Management:
   - The system has significantly improved the efficiency of managing club activities and member data.
   - Manual tasks, such as maintaining spreadsheets and handling paperwork, have been replaced with automated processes.

2. Enhanced User Experience:
   - Members can easily access and update their information through the personalized members area.
   - Administrators have a comprehensive dashboard to monitor.

3. Improved Data Security:
   - User authentication ensures that only authorized individuals can access sensitive information.
   - Data encryption and validation mechanisms have been implemented to protect data integrity.

4. Efficient Event Management:
   - The event management feature allows administrators to create, assign members, and track attendance for club events.
   - This streamlines event organization and facilitates better communication with members.

## Additional Feature: 
### Multi-Division or Sub-Club Support

To further enhance the Club Members Management System, the implementation of multi-division or sub-club support can be considered. This feature allows the system to accommodate multiple divisions or sub-clubs within the main club, each having its own set of administrators, editors, and members. Here are the details of this proposed feature:

1. Division or Sub-Club Creation:
   - Administrators can create and define multiple divisions or sub-clubs within the main club.
   - Each division or sub-club can have its own unique name, description, and specific focus or purpose.

2. Division or Sub-Club Roles:
   - Administrator Role: Each division or sub-club will have its own administrator(s) responsible for managing the division's activities, members, and events.
   - Editor Role: Editors can be assigned to specific divisions or sub-clubs to assist the administrators in managing content and updates relevant to that division.
   - Member Role: Members can join one or more divisions or sub-clubs based on their interests or affiliations within the club.

3. Division or Sub-Club Access and Permissions:
   - Access Control: The system will enforce role-based access control, allowing division administrators, editors, and members to access and manage the respective division's data and functionalities.
   - Division-Specific Dashboards: Administrators and editors will have access to division-specific dashboards, providing them with insights and tools to manage their division efficiently.
   - Member Affiliation: Members can view and participate in division-specific events, discussions, and resources relevant to their affiliated divisions.

4. Cross-Division Communication and Collaboration:
   - Inter-Division Communication: Provide a platform for administrators, editors, and members from different divisions to communicate, collaborate, and share information.
   - Shared Resources: Allow the sharing of resources, such as documents, templates, and event plans, between divisions to promote knowledge exchange and collaboration.

5. Reporting and Analytics:
   - Division-Specific Reports: Generate reports and analytics specific to each division or sub-club, providing insights into membership statistics, event participation, and division-specific metrics.
   - Cross-Division Comparisons: Enable administrators to compare data and metrics across different divisions or sub-clubs to identify trends and make informed decisions.

The addition of multi-division or sub-club support will allow the Club Members Management System to scale and accommodate diverse club structures and activities. It promotes autonomy and efficient management within each division while facilitating collaboration and communication across divisions.

### Blog Content Management and Landing Page

To further enhance the Club Members Management System, the implementation of a blog content management feature and a landing page with a slide hero section and contact page can be considered. These features will help enhance the club's online presence and engage with members and visitors effectively. Here are the details of these proposed features:

1. Blog Content Management:
   - Admin Dashboard: Provide an admin dashboard to manage blog posts, categories, and tags.
   - Create and Edit Blog Posts: Allow administrators and editors to create and edit blog posts with features like rich text editing, image uploads, and formatting options.
   - Categorization: Enable the categorization of blog posts for easy navigation and content discovery..


2. Landing Page with Slide Hero Section:
   - Home Page Design: Create an attractive landing page with a slide hero section at the top to showcase important club announcements, upcoming events, or featured content.
   - Slideshow Feature: Implement a dynamic slideshow feature that displays multiple slides with captivating visuals and brief descriptions.
   - Call-to-Action Buttons: Include call-to-action buttons on the slides to direct visitors to relevant sections or actions, such as event registration or membership sign-up.

3. Contact Page:
   - Contact Information: Create a dedicated contact page that displays the club's contact information, such as email address, phone number, and social media links.
   - Contact Form: Implement a contact form where visitors can submit inquiries or messages directly to the club's designated contact email.
  

By incorporating blog content management, a visually appealing landing page, and a contact page, the Club Members Management System will provide an all-in-one platform for managing club activities, engaging with members, and attracting new visitors. These features will enhance the club's online presence, facilitate communication, and provide valuable information to both members and the general public.

### Media File Management (Images and Videos)

To further enhance the Club Members Management System, the implementation of media file management for images and videos can be considered. This feature will allow administrators to efficiently manage and organize media files related to club activities, events, and member content. Here are the details of this proposed feature:

1. Media Upload and Storage:
   - Image Upload: Provide a functionality to upload images and store them securely within the system.
   - Video Upload: Enable administrators to upload videos in common formats and manage them within the system.

2. Media Access Control:
   - Role-Based Access: Define access levels and permissions for different user roles to ensure appropriate access to media files.



## Conclusion

The Club Members Management System project has successfully developed a comprehensive system for managing club activities and member data. The implemented features provide efficient member database management, event organization, user authentication, and reporting capabilities. The project outcomes have resulted in streamlined processes, enhanced user experience, improved data security, and efficient event management.

----
# Setup Guide for Club Members Management System

Prerequisites:
- Node.js v18.x or higher
- npm (Node Package Manager) v9.x or higher
- TypeScript
- PostgreSQL or Docker Compose (for simplified database setup)
- Git and GitHub account (for code version control and collaboration)

Step 1: Install Node.js and npm
1. Visit the official Node.js website (https://nodejs.org) and download the latest LTS version of Node.js.
2. Run the installer and follow the installation instructions.
3. Open a terminal or command prompt and verify the installation by running the following commands:
   ````
   node --version
   npm --version
   ```
   You should see the installed versions of Node.js and npm.

Step 2: Install TypeScript
1. Open a terminal or command prompt.
2. Run the following command to install TypeScript globally:
   ````
   npm install -g typescript
   ```
   This command will install the TypeScript compiler (`tsc`).

Step 3: Set Up Git and GitHub
1. Install Git on your system by visiting the official Git website (https://git-scm.com) and following the installation instructions.
2. Create a GitHub account if you don't have one already.
3. Configure Git with your username and email by running the following commands in the terminal or command prompt:
   ````
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
   Replace "Your Name" and "your.email@example.com" with your actual name and email associated with your GitHub account.

Step 4: Clone the Project Repository
1. Open a terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command to clone the project repository:
   ````
   git clone <repository_url>
   ```
   Replace `<repository_url>` with the URL of the Club Members Management System project repository.

Step 5: Install Project Dependencies
1. In the project directory, run the following command to install the project dependencies:
   ````
   npm install
   ```
   This command will read the `package.json` file and install all the required dependencies.

Step 6: Configure the Database
- Option 1: PostgreSQL
  1. Install PostgreSQL on your system and make sure it is running.
  2. Create a new PostgreSQL database for the Club Members Management System.
  3. Update the database configuration in the project. Locate the configuration file (e.g., `config/database.ts` or `config/database.json`) and provide the necessary details such as host, port, username, password, and database name.

- Option 2: Docker Compose (simplified setup)
  1. Install Docker and Docker Compose on your system.
  2. In the project directory, find the Docker Compose configuration file (e.g., `manifests/postgres-db/docker-compose.yaml`).
  3. Customize the configuration if needed (e.g., database credentials, ports).
  4. Run the following command to start the containers defined in the Docker Compose file:
     ```
     docker-compose up -d --build
     ```

Step 7: Run the Project: In the project directory
2. Start the server by running the following command:
   ````
   npx nx run client:serve
   `````
   The server should now be running and ready to accept requests.

3. Start the client by running the following command in a separate terminal or command prompt:
   ````
   npx nx run server:serve
   `````
   The client application should start and can be accessed in a web browser at the specified URL (e.g., `http://localhost:4200`).



Step 8: Access the Club Members Management System
1. Open a web browser and navigate to the URL or IP address where the server is running (e.g., `http://localhost:4200`).
2. You should see the landing page or login page of the Club Members Management System.

Congratulations! You have successfully set up the Club Members Management System. You can now explore and customize the system according to your club's requirements. Use Git and GitHub to manage code changes, collaborate with other team members, and track project versions. Refer to the project documentation or configuration files for further customization options and features.

## To access pgAdmin after running the Docker Compose file, follow the instructions below:

Step 1: Start the Docker Containers
1. Open a terminal or command prompt.
2. Navigate to the directory where the `docker-compose.yml` file is located.
3. Run the following command to start the Docker containers:
   ````
   docker-compose up -d
   ```
   The containers for PostgreSQL and pgAdmin will start running in the background.

Step 2: Access pgAdmin Web Interface
1. Open a web browser.
2. Enter the following URL in the address bar:
   ````
   http://localhost:5050
   ```
   The pgAdmin login page should appear.

Step 3: Log in to pgAdmin
1. Enter the email address specified in the `PGADMIN_DEFAULT_EMAIL` environment variable (e.g., `postgres@gmail.com`).
2. Provide the password specified in the `PGADMIN_DEFAULT_PASSWORD` environment variable (e.g., `postgres`).
3. Click the "Sign In" button.

Step 4: Add PostgreSQL Server Connection
1. Once logged in to pgAdmin, click on the "Add New Server" button or navigate to the "Servers" section in the left sidebar and right-click on it.
2. Select "Create" > "Server".
3. In the "Create - Server" dialog, enter a name for the server (e.g., "Club Members PostgreSQL").
4. Switch to the "Connection" tab and provide the following details:
   - Hostname/address: Enter `postgres-db` (the name of the PostgreSQL container).
   - Port: Enter `5432`.
   - Maintenance database: Enter `postgres`.
   - Username: Enter `postgres`.
   - Password: Enter `postgres`.
5. Click the "Save" button to save the server connection.

Step 5: Access the PostgreSQL Database
1. In the pgAdmin interface, expand the "Servers" section in the left sidebar to see the server connection you created.
2. Expand the server connection to see the databases.
3. Right-click on a database and choose the desired management options, such as creating tables, executing queries, or modifying database objects.

You should now be able to access and manage the PostgreSQL database using pgAdmin via the web interface at `http://localhost:5050`.

---

# Main Technologies used
**Front-end Technologies:**
- React: A JavaScript library for building user interfaces. [Docs](https://reactjs.org/)
- React DOM: Provides DOM-specific methods for React components. [Docs](https://reactjs.org/docs/react-dom.html)
- React Redux: A library for managing state in React applications using Redux. [Docs](https://react-redux.js.org/)
- React Icons: A collection of popular icons for React applications. [Docs](https://react-icons.github.io/react-icons/)
- Formik: A library for building forms in React. [Docs](https://formik.org/)
- Yup: A JavaScript schema builder for value parsing and validation. [Docs](https://github.com/jquense/yup)
- Tailwind CSS: A utility-first CSS framework. [Docs](https://tailwindcss.com/docs)
- React Quill: A React component for a rich text editor. [Docs](https://github.com/zenoamaro/react-quill)
- React Intersection Observer: A wrapper component for observing elements entering or exiting the viewport. [Docs](https://github.com/researchgate/react-intersection-observer)

**Back-end Technologies:**
- Next.js: A React framework for building server-side rendered and static web applications. [Docs](https://nextjs.org/docs)
- Express: A web application framework for Node.js. [Docs](https://expressjs.com/)
- Express Formidable: Middleware for parsing forms in Express applications. [Docs](https://github.com/hatashiro/formidable)
- JSON Web Token (jsonwebtoken): A library for creating and validating JSON Web Tokens. [Docs](https://github.com/auth0/node-jsonwebtoken)
- Bcrypt: A library for hashing passwords. [Docs](https://github.com/kelektiv/node.bcrypt.js)
- Cors: Middleware for enabling Cross-Origin Resource Sharing in Express applications. [Docs](https://github.com/expressjs/cors)
- Axios: A promise-based HTTP client for making API requests. [Docs](https://axios-http.com/)

**Database Technologies:**
- Prisma: An Object-Relational Mapping (ORM) tool for Node.js and TypeScript. [Docs](https://www.prisma.io/docs/)

**Other Technologies:**
- TypeScript: A superset of JavaScript that adds static typing. [Docs](https://www.typescriptlang.org/docs/)
- Jest: A testing framework for JavaScript applications. [Docs](https://jestjs.io/)
- Cypress: A JavaScript end-to-end testing framework. [Docs](https://docs.cypress.io/)
- Prettier: A code formatter. [Docs](https://prettier.io/docs/en/)
- Eslint: A tool for identifying and reporting code quality issues. [Docs](https://eslint.org/docs/user-guide/getting-started)
- Vite: A fast development server and build tool. [Docs](https://vitejs.dev/guide/)
- PostCSS: A tool for transforming CSS with JavaScript plugins. [Docs](https://postcss.org/)
- Nx: A set of extensible dev tools for monorepos. [Docs](https://nx.dev/)

Please note that the provided links are for documentation references and may be subject to change based on updates to the respective technologies.