
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    // ── Admin route protection ──────────────────────────────────────────────
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin-login') && !pathname.startsWith('/admin-signup')) {
        // Allow the login and signup pages themselves so they are accessible
        
        // For every other /admin/* page:
        // 1. Must be authenticated
        if (!user) {
            const loginUrl = new URL('/admin-login', request.url)
            loginUrl.searchParams.set('next', pathname) // preserve intended destination
            return NextResponse.redirect(loginUrl)
        }

        // 2. Must have the 'admin' role (set in Supabase user_metadata or app_metadata)
        const role = user.user_metadata?.role ?? user.app_metadata?.role
        if (role !== 'admin') {
            // Authenticated but not an admin — show a 403-like redirect
            return NextResponse.redirect(new URL('/admin-login?error=forbidden', request.url))
        }
    }

    if (pathname === '/admin-login' || pathname === '/admin-signup') {
        if (user) {
            const role = user.user_metadata?.role ?? user.app_metadata?.role
            if (role === 'admin') {
                return NextResponse.redirect(new URL('/admin', request.url))
            }
        }
    }

    return response
}
