import dotenv from 'dotenv';
dotenv.config();

/*
 * @type {{
 * MONGODB_URI: string,
 * PORT: number,
 * JWT_SECRET: string
 * }}
 */
const env = {
    MONGODB_URI:    process.env.MONGODB_URI,
    PORT:          +process.env.PORT || 5000,
    JWT_SECRET:  process.env.JWT_SECRET,
}


if (!env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

if (!env.JWT_SECRET) {
    console.error('❌ JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

export default env;
