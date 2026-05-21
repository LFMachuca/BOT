

function  checkCuit(cuit) {
const cuitRegex = /^\d{2}-\d{8}-\d$/;
return cuitRegex.test(cuit)
}
function checkTtiular(titular){
    const titularRegex =/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/
    return titularRegex.test(titular);
}
    
function checkCbu(cbu){
        const cbuRegex = /^\d{22}$/;
    return cbuRegex.test(cbu);
}
function checkAmount(amount){
    if(!amount) return false;
    const amountCleaned = parseFloat(amount.replace(/\$/g,'').replace(/\./g,'').replace(',','.'));
    return !isNaN(amountCleaned)
}

const checkTT = (texto)  =>{
    const textCleaned = texto.trim().split('\n')[0].trim();
    return /^tt\d+$/i.test(textCleaned);
}

const parserTT = (texto) =>{
    const lines = texto.trim().split('\n').map(line => line.trim());
    const [encabezado, titular, cuit, cbu, alias, montoRaw, cliente] = lines;

    const numero = encabezado.replace(/^tt/i, '')

    const monto = montoRaw ? parseFloat(montoRaw.replace(/\$/g,'').replace(/\./g,'').replace(',','.')): null;

    const errors = [];
    if (!numero) errors.push('Numero de TT no encontrado');
    if (!titular || !checkTtiular(titular)) errors.push('Titular no encontrado');
    if(!cuit || !checkCuit(cuit)) errors.push('CUIT no encontrado o formato incorrecto');
    if(!cbu || !checkCbu(cbu)) errors.push('CBU no encontrado o formato incorrecto');
    if(!montoRaw || !checkAmount(montoRaw)) errors.push('Monto no encontrado')
    if (!cliente) errors.push('Cliente no encontrado');

     return {
        numero,
        titular:titular || null,
        cbu:cbu || null,
        cuit:cuit || null,
        alias:alias || null,
        monto:monto || null,
        cliente:cliente || null,
        errors
    }
}

export {checkTT, parserTT}