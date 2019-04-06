export const AUTH_PATH = 'http://52.56.152.192:6002';
export const RES_PATH = 'http://52.56.152.192:80';

export const CLIENT_ID = 'sample-client-id';
export const CLIENT_SECRET = 'sample-client-secret';

let access_token = '';

export function set_access_token(accessToken) {
    access_token = accessToken;
}

export function get_access_token() {
    return access_token;
}