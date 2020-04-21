import json from './server.json';

export default (page = 1, limit = 5, time = 1) => new Promise((resolve) => {

    const all = () => [...json];
    const totalPages = Math.floor(all().length / limit);

    const data = all().slice(
        page >= 2 ? ((page * limit) - limit) : 0,
        page >= 2 ? parseInt(page * limit) - 1 : limit - 1);

    setTimeout(() => {
        resolve({
            success: true,
            data,
            totalPages
        });
    }, (time) * 1000);

});