export function compareStringArray(array1: Array<string>, array2: Array<string>) {
    return (array1.join(',') === array2.join(',') ? true : false);
}

export function compareNumArray(array1: Array<number>, array2: Array<number>) {
    return array1.toString() === array2.toString();
}

export function sortNumArrayAscending(array: Array<number>) {
    return array.sort((n1, n2) => n1 - n2);
}

export function sortNumArrayDescending(array: Array<number>) {
    return array.sort((n1,n2) => n2 -n1);
}

export function convertStringArrayIntoNumArray(array: Array<string>) {
    const numArray: Array<number> = []

    for(let i = 0; i < array.length; i++) {
        let str = array[i].match(/[0-9]*[.]\d*/g)!
        const num = Number(str.join(""))
        numArray[i] = num;
    }
    return numArray;
}