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
        user_id: result.insertId,
        username,
        role
    };
};

export const findUserByUsername = async (username) => {
    const [results] = await db.query(
        "SELECT user_id, username, password, role FROM users WHERE username = ? LIMIT 1",
        [username]
    );
    return results[0];
};

export const validatePassword = async (plainPassword, storedPassHash) => {
    const matched = await bcrypt.compare(plainPassword, storedPassHash);
    return matched;
}
