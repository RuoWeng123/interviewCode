function myInstanceOf(a,b){
    if(typeof a !== 'object' || a === null) return false;
    let proto = Object.getPrototypeOf(a);
    while(proto){
        if(proto === b.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}