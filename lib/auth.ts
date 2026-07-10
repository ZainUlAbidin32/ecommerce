import jwt ,{JwtPayload} from "jsonwebtoken"

interface decodedToken extends JwtPayload {
    userId: string,
    email: string,
}

export const verifyToken= (token: string) => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as decodedToken
        return decoded
    } catch (err:any) {
        throw new Error ("Inavlid Token")
    }
}