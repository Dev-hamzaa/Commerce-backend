import jwt from 'jsonwebtoken';
import { NextFunction, Response } from "express"
import { AuthenticatedRequest } from "../utility/interfaces"
import { User } from '../model/user';


const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const publicRoutes = [
        '/api/auth/login',
        '/api/auth/session',
        '/register',
        '/api/user/forget-password',
        '/api/user/reset-password',
    ]

    if (publicRoutes.some((route) => req.path.startsWith(route))) {
        next()
        return
    }

    try {
        const accessToken = req.headers.authorization?.split(' ')[1]


        // console.log("Access TOken",accessToken)
        if (!accessToken) {
            res
                .status(401)
                .json({ message: 'Unauthorized - No access token provided' })
            return
        }

        const verifyToken = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string,
        ) as jwt.JwtPayload
        console.log("Verify Token", verifyToken)
        if (!verifyToken) {
            res.status(401).json({ message: 'Unauthorized - Invalid token' })
            return
        }

        const authenticatedUser = await User.findById({
            _id: verifyToken.id
        })
        if (!authenticatedUser) {
            res.status(400).json(
                {
                    success: false,
                    message: "Invalid Token "
                }
            )
            return
        }

        // req.user=verifyToken




        next()
    } catch (err) {
        console.error('Auth Middleware Error:', err)
        res.status(500).json({ message: 'Internal server error' })
        return
    }
}
export default authMiddleware