

function  checkCuit(cuit) {
const cuitRegex = /^\d{2}-\d{8}-\d$/ || /^\d{11}$/;
return cuitRegex.test(cuit)
}
function checkTitular(titular){
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
    return /^tt\s?\d+$/i.test(textCleaned);
}

const parserTT = (texto) =>{
    const lines = texto.trim().split('\n').map(line => line.trim()).filter(line => line);
   // const [encabezado, titular, cuit, cbu, alias, montoRaw, cliente] = lines;

    const encabezado= lines[0]
    const numero = encabezado.replace(/^tt\s*/i, '')

    let titular = null
    let cuit = null
    let cbu = null
    let alias = null
    let montoRaw = null
    let cliente = null

    for(const line of lines.slice(1)){
        console.log(`Línea: "${line}" | titular:${checkTitular(line)} | cuit:${checkCuit(line)} | cbu:${checkCbu(line)} | monto:${checkAmount(line)}`)
        if(!titular && checkTitular(line)) {titular = line;  continue ;}
        if(!cuit && checkCuit(line)) {cuit = line; continue;}
        if(!cbu && checkCbu(line)) {cbu = line; continue;}
        if(!montoRaw && checkAmount(line)) {montoRaw = line; continue;}
        cliente = line;
    }

    const errors = [];
    if (!numero) errors.push('Numero de TT no encontrado');
    if (!titular || !checkTitular(titular)) errors.push('Titular no encontrado');
    if(!cuit || !checkCuit(cuit)) errors.push('CUIT no encontrado o formato incorrecto');
    if(!cbu || !checkCbu(cbu)) errors.push('CBU no encontrado o formato incorrecto');
    if(!montoRaw || !checkAmount(montoRaw)) errors.push('Monto no encontrado')
    if (!cliente) errors.push('Cliente no encontrado');

     return {
        numero,
        titular:titular || null,
        cuit:cuit || null,
        cbu:cbu || null,
        alias:alias || null,
        monto:montoRaw ? parseFloat(montoRaw.replace(/\$/g,'').replace(/\./g,'').replace(',','.')) : null,
        cliente:cliente || null,
        errors
    }
}

export {checkTT, parserTT}