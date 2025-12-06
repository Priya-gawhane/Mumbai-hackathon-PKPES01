import Credentials from "@auth/express/providers/credentials";
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const authConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // console.log("Authorize called with:", credentials?.email);
                if (!credentials || !credentials.email || !credentials.password) {
                    // console.log("Missing credentials");
                    return null;
                }

                try {
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        // console.log("User not found");
                        return null; // User not found
                    }

                    const isMatch = await bcrypt.compare(credentials.password, user.password);

                    if (!isMatch) {
                        // console.log("Password mismatch");
                        return null; // Password mismatch
                    }

                    // console.log("User authenticated:", user.name);
                    return { id: user._id, name: user.name, email: user.email };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],
    secret: process.env.AUTH_SECRET || "secret",
    trustHost: true,
};
