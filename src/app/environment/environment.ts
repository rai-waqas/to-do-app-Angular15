const baseUrl = 'https://localhost:7091/api';

export const environment = {
    production: false,
    baseUrl: baseUrl,
    task: {
        loginUrl: `${baseUrl}/Task/login`,
        taskUrl: `${baseUrl}/Task`,
    },
    user: {
        userUrl: `${baseUrl}/User`,
    },
}