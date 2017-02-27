
const fetchSomething = () => new Promise((resolve) => {
    setTimeout(() => resolve('future value'), 500);
});

const promiseFunc = () => new Promise((resolve) => {
    fetchSomething().then(result => {
        resolve(result + ' 2');
    });
});

promiseFunc().then(res => console.log(res));
/**
 * Created by mukadder on 2/24/17.
 */
