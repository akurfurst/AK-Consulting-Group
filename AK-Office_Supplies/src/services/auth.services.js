import db from "../model/db.connect.js";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(plainPassword, salt);
};

export const createUser = async (username, password, role = "user") => {

    const hash = await hashPassword(password);

    const [result] = await db.execute(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, hash, role]
    );

    return {
        userId: result.insertId,
        username,
        role
    };
};