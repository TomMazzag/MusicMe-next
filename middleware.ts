import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ['/account'];

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

    if (isProtectedPath) {
        const accessToken = req.cookies.get('access_token')?.value;
        if (!accessToken) {
            const loginUrl = new URL('/', req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}