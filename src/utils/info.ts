
const InfoKey = 'profile_info';
export function getInfo() {
    return localStorage.getItem(InfoKey) || '';
}

export function setInfo(token: string) {
    localStorage.setItem(InfoKey, token);
}

export function removeInfo() {
    localStorage.setItem(InfoKey, '');
}
