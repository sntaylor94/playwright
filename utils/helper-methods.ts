export function compareStringArray(array1: Array<string>, array2: Array<string>) {
    return (array1.join(',') === array2.join(',') ? true : false);
}