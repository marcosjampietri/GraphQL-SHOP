import { NextRequest, NextResponse } from 'next/server'
import jwt, { Secret } from "jsonwebtoken";

export default async function Middleware(req: NextRequest) {
    const token = req.cookies['auth-token']
    // const red = req.nextUrl.searchParams.get('red')
    // console.log(`log do auth token: ${token} e req.nextUrl ${red}`)

    try {
        const verified = jwt.verify(token, <Secret>process.env["JWT_TOKEN_SECRET"])

        if (verified) {
            return NextResponse.redirect(`/checkout`)
        } else {
            return NextResponse.next()
        }
        // return NextResponse.redirect(`${red}`)

    } catch {
        return NextResponse.next()
        // return NextResponse.redirect(`/profile/${userInfo._id}`)
    }
}
