export const validEmail = (email : string) => {
    return /^[^@]+@\w+(\.\w+)+\w$/.test(email);
}

export const validPassWord = (password : string) => {
    return password.length >= 6;
}

export const validUserName = (userName: string) => {
    return /^[A-Za-z]{1,}[\u0000-\u00ff]{5,19}/g.test(userName); 
}