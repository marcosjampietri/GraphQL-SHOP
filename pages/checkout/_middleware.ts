import { NextRequest, NextResponse } from 'next/server'


export default async function Middleware(req: NextRequest) {
    const token = req.cookies['auth-token']
    const { pathname } = req.nextUrl
    console.log(`log do auth token: ${token} e req.nextUrl ${pathname}`)
    // console.log(red)

    // const url = process.env.NODE_ENV == 'production' ? 'https://new-shop-tau.vercel.app/signIU' : `http://localhost:3000/signIU`;


    if (token !== undefined) {
        return NextResponse.next()
    }
    else {
        return NextResponse.next()
        // return NextResponse.redirect(url)
        // return NextResponse.redirect(`/signIU?red=${pathname}`)
        // return NextResponse.redirect(`/profile/${userInfo._id}`)
    }
}
