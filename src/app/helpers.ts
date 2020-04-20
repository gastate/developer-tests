export function GoodPromise(v): any {
    return new Promise((resolve) => setTimeout(() => resolve('Resolved: ' + HashString(v)), 2000));
}
export function BadPromise(v): any {
    return new Promise((resolve, reject) => setTimeout(() => reject('Rejected: ' + HashString(v)), 2000));
}

export function MathPromise(value: number): any {
    return new Promise((resolve) => setTimeout(() => {
        resolve(Fibonnaci(value));
    }, 2000));
}
export function Fibonnaci(value) {
    let a = 1;
    let b = 0;
    let temp;
    while (value--) {
        temp = a;
        a = a + b;
        b = temp;
    }
    return b;
}

export function HashString(str) {
    var hash = 0;
    if (str.length == 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return ("0000000" + (hash >>> 0).toString(16)).substr(-8);
}