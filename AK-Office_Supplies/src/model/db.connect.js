import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const{DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const pool = mysql2.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

//db test connection
export const testConnection = async () => {
    try{
        const connection = await pool.getConnection();
        connection.release();
        console.log("Database connection OK");
    }catch(err){
        console.log(err);
        throw err;
    }
}

export default pool;
