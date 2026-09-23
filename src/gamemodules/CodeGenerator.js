const values = ["red", "blue", "yellow"];

function GenerateCode(length){
    let code = [];
    for (let i = 0; i < length; i++){
        let index = Math.floor(Math.random() * values.length);
        code.push(values[index]);
    }
    return code;
}

function CodesMatch(source, other){
    if (!source || !other){
        return false;
    }

    if ((source === null) || (other === null)){
        return false;
    }

    if (source.length !== other.length){
        return false;
    }

    for (let i = 0; i < source.length; i++){
        if (source[i] !== other[i]){
            return false;
        }
    }

    return true;
}

export {GenerateCode, values as CodeValues}