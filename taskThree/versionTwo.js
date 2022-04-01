//Версия с изменением исходного массива

const obj = {
    a: 22,
    b: 'hello',
    c: {
        d: 'no',
        e: 34241,
        f: {
            j: 'efijewg',
            apple: 'efijewg',
            afwefj: [14, 49032, 94230]
        },
        gender: true
    }
}

const makeNewObject = () => {
    const changeToUpperCase = (obj) => {
        for (let key in obj){
            const typeObj = obj[key];
            if (typeof typeObj == 'object' && !Array.isArray(typeObj)) {
                obj[key.toUpperCase()] = typeObj;
                changeToUpperCase(typeObj);
                delete obj[key];
            } else {
                obj[key.toUpperCase()] = typeObj;
                delete obj[key];
            }
        }
        return obj
    }
    return changeToUpperCase(obj)
}

makeNewObject();
console.log(obj)
