const ROUTES = {
    MAIN: { path: '/main', name: 'main' },
    NOT_FOUND: { path: '/:catchAll(.*)', name: 'NotFound' },
    HOME: { name: 'home', path: '/' },
    AUTH: { name: 'auth', path: '/auth' },
    LOGIN: { name: 'login', path: 'login' },
    SIGN_UP: { name: 'signup', path: 'signup' },
    CONTACT_US: { name: 'contact-us', path: '/contactus' },
    RESET_PASSWORD: { name: 'reset-password', path: '/resetpassword' },
    UPDATE_PASSWORD: { name: 'update-password', path: '/updatepassword' },
}
export default ROUTES
