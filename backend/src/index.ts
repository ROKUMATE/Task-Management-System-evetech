import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 3001;

async function main() {
    try {
        console.log("trying to connect to db");
        await mongoose
            .connect(process.env.MONGODB_URI!)
            .then(() => {
                console.log("MongoDB Database has been connected");
                app.listen(PORT, () =>
                    console.log(`Server running on port ${PORT}`)
                );
            })
            .catch((err) => {
                console.error("DB connection error", err);
                process.exit(1);
            });
    } catch (error) {
        console.log("There was a error in the main()");
        process.exit(1);
    }
}

main();
