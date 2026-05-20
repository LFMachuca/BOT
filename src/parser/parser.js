
function  validarCuit(cuit) {
    cuit = cuit.replace(/^\d{2}-?\d{8}-?\d{1}$/, '$1$2$3');
    

    
}
const isTT = (texto)  =>{
    return /^tt\d+/i.test(texto.trim());
}

const parserTT = (texto) =>{
    const lines = texto.trim().split('\n').map(line => line.trim());
    const [encabezado, titular, cuit, cbu, alias, montoRaw, cliente] = lines;

    const numero = encabezado.replace(/^tt/i, '')

    const monto = montoRaw ? parseFloat(montoRaw.replace(/\$/g,'').replace(/\./g,'').replace(',','.')): null;

    return {
        numero,
        titular:titular,
        cbu:cbu,
        cuit:cuit,
        alias:alias,
        monto:monto,
        cliente:cliente
    }
}

export {isTT, parserTT}