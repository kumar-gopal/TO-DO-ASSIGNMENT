const mongoose = require("mongoose");

const Dbconnect = async () => {
    try {

        // Attempt to connect to MongoDB
        const DbConnectionMethod = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log("Database successfully connected!");
        console.log(`DB_HOST: ${DbConnectionMethod.connection.host}`);
        console.log(`DB_NAME: ${DbConnectionMethod.connection.name}`);
    } catch (error) {
        console.error("Database connection failed!", error.message);
        console.error(error.stack); // Log the stack trace for debugging
        process.exit(1); // Exit the application with a failure code
    }
};

// Graceful shutdown handler
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Database connection closed due to application termination.");
    process.exit(0);
});

module.exports = Dbconnect;
