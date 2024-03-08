## Web Academy: Free Web Development Courses

**Web Academy** empowers you to master web development with free, interactive courses and insightful articles. Stay current and propel your skills forward in this dynamic field.

### Technologies Used

- **Next.js:** A React framework for building performant and scalable web applications.
- **Tailwind CSS:** A utility-first CSS framework for rapid and responsive UI development.
- **Mongoose:** An ODM (Object Data Modeling) library for interacting with MongoDB databases.
- **TypeScript:** A superset of JavaScript that adds static typing for improved code maintainability and developer experience.
- **MDX:** Markdown extension that allows embedding JSX components within Markdown files, enabling dynamic and interactive content.

### Content Management

Web Academy employs a custom content management system built with:

- **MDX files:** Content authored in MDX files resides within the `./content` folder.
- **MDX to JSON conversion:** A script generates JSON files from the MDX content, stored in the `.generated-content` folder.

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ikyawthetpaing/webacademy.git
   ```

2. **Install dependencies:**

   ```bash
   cd webacademy
   npm install
   ```

3. **Configure Database (Optional):**

   If you wish to leverage the Mongoose integration for data persistence, you'll need to configure your MongoDB connection details within the project's environment variables. Refer to the `.env.example` file for guidance.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   This will start the Next.js development server, accessible at http://localhost:3000 by default.

### Contributing

We welcome contributions to Web Academy! Please see the `CONTRIBUTING.md` file for guidelines on how to get involved.

### License

This project is licensed under the MIT License. See the `LICENSE` file for details.
