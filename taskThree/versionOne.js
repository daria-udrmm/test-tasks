//Версия с созданием нового массива

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

const makeNewObject1 = () => {
    let someObj = {};
    const changeToUpperCase = (obj, someObj) => {
        for (let key in obj){
            let typeObj = obj[key];
            if (typeof typeObj == 'object' && !Array.isArray(typeObj)) {
                someObj[(key.toUpperCase())] = {}
                changeToUpperCase(typeObj, someObj[(key.toUpperCase())]);
            } else {
                someObj[(key.toUpperCase())] = typeObj;
            }
        }
        return someObj
    }
    return changeToUpperCase(obj, someObj)
}

const newObj1 = makeNewObject1();
console.log(newObj1)
