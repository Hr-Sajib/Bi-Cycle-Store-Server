import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });


export default {
 port: process.env.port,
 database_url: process.env.mongodb_user_pass_databse,
};
