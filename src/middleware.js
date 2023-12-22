import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// Handled languages ISO compliant
let locales = ["en-US", "it-IT"];

// Determine user's preferred locale based on "accept-language" header
function getLocale(request) {
    let headers = { "accept-language": request.headers.get("accept-language") };
    let languages = new Negotiator({ headers }).languages();
    let defaultLocale = "en-US";

    return match(languages, locales, defaultLocale);
}

// Middleware to handle locale in URL paths
export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if the current URL path already contains a supported locale
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}`) || pathname === `/${locale}`
    );

    // Exit if the path already has a locale
    if (pathnameHasLocale) return;

    // Else, determine user's preferred locale and update URL path
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    // Redirect the user to the updated URL
    return Response.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)",
        // Optional: only run on root (/) URL
        // '/'
    ],
};
