import { describe, it, expect } from "vitest";
import { checkTT, parserTT } from "../../src/parser/parser";

describe('Identificador de TT', ()=>{
    it('Deberia identificar si un mensaje es una TT ', ()=>{
        expect(checkTT('tt135')).toBe(true);
        expect(checkTT('tt')).toBe(false);
        expect(checkTT('ttas')).toBe(false);
        expect(checkTT('hola tt45')).toBe(false);
        expect(checkTT('tt45 listo')).toBe(false);
        expect(checkTT('tt 54')).toBe(false);
        expect(checkTT(' ')).toBe(false);
        })
})

describe(' identifica si el mensaje empieza con TT mayuscula seguida de numeros', ()=>{
    it('Deberia identificar si un mensaje es una TT', ()=>{
                expect(checkTT('TT54')).toBe(true);
    })
})