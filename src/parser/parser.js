function checkTitular(titular){
    const titularRegex =/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/
    return titularRegex.test(titular);
}
    
function checkAmount(amount){
    if(!amount) return false;
    if(!/[\$\.,]/.test(amount)) return false;
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
        if(!montoRaw && checkAmount(line)) {montoRaw = line; continue;}
        if(!titular && checkTitular(line)) {titular = line;  continue ;}
        cliente = line;
    }

    const errors = [];
    if (!numero) errors.push('Numero de TT no encontrado');
    if (!titular || !checkTitular(titular)) errors.push('Titular no encontrado');
    if(!montoRaw || !checkAmount(montoRaw)) errors.push('Monto no encontrado')
    if (!cliente) errors.push('Cliente no encontrado');

     return {
        numero,
        titular:titular || null,
        monto:montoRaw ? parseFloat(montoRaw.replace(/\$/g,'').replace(/\./g,'').replace(',','.')) : null,
        cliente:cliente || null,
        errors
    }
}

export {checkTT, parserTT}