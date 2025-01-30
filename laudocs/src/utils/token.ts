export const saveToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const saveRole = (role: string) => {
    localStorage.setItem('role', role);
};

export const getRole = (): string | null => {
    return localStorage.getItem('role');
};
export const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

export const checkValidToken = () => {
    const token = getToken();
    if (!token) {
        return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;

    if (exp <= Date.now() / 1000) {
        return false;
    }

    return true;
};

export const isAdmin = () => {
    const role = getRole();
    return role?.toUpperCase() === 'ADMIN';
}