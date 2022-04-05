import { NextRequest, NextResponse } from 'next/server'
import jwt, { Secret } from "jsonwebtoken";

export default async function Middleware(req: NextRequest) {
    const token = req.cookies['auth-token']
    const { pathname } = req.nextUrl
    console.log(`log do auth token: ${token} e req.nextUrl ${pathname}`)
    // console.log(red)
    // return NextResponse.next()
    if (token !== undefined) {
        return NextResponse.next()
    } else {
        return NextResponse.redirect(`/signIU`)
    }
    // try {
    //     jwt.verify(token, <Secret>process.env.JWT_TOKEN_SECRET)
    // } catch {
    //     return NextResponse.redirect(`/signIU`)
    //     // return NextResponse.redirect(`/signIU?red=${pathname}`)
    //     // return NextResponse.redirect(`/profile/${userInfo._id}`)
    // }
}
