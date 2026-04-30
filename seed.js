const mongoose = require ('mongoose');
const Topic = require ('./model/Topic');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("Error connecting to MongoDB:", err);
})

const topics = [
  { 
    name: "jwt", 
    desc: "JSON Web Token (JWT) is a secure method used for authentication. It allows the server to verify a user without storing session data. After login, a token is generated and sent to the client, which is used for accessing protected routes." 
  },
  { 
    name: "mongoose", 
    desc: "Mongoose is an Object Data Modeling (ODM) library for MongoDB. It helps in defining schemas, models, and provides an easy way to interact with the database using structured rules." 
  },
  { 
    name: "bcrypt", 
    desc: "Bcrypt is a password hashing library used to securely store passwords. It converts plain text passwords into encrypted form so that even if database is leaked, passwords remain protected." 
  },
  { 
    name: "mvc", 
    desc: "MVC (Model View Controller) is a design pattern used to organize code. Model handles data, View handles UI, and Controller manages logic between model and view, making code clean and maintainable." 
  },
  { 
    name: "middleware", 
    desc: "Middleware is a function that runs between request and response in Express. It is used for tasks like authentication, logging, validation, and controlling access to routes." 
  },
  { 

    name: "ssr", 
    desc: "Server Side Rendering (SSR) is a technique where HTML pages are generated on the server and sent to the browser, improving SEO and initial page load speed." 
  },
  {  
    name: "csr", 
    desc: "Client Side Rendering (CSR) is a method where the browser loads a minimal HTML page and JavaScript renders the content dynamically on the client side, commonly used in React applications." 
  },
  { 

    name: "schema", 
    desc: "A schema defines the structure of data in a database. It specifies what fields are allowed, their types, and rules, ensuring consistent and organized data storage." 
  }
];

const seedData = async ()=>{
    try {
        await Topic.deleteMany();
        await Topic.insertMany(topics);
        console.log("Data seeded successfully");
        process.exit(0);    
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seedData();