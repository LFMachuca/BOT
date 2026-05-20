import {it, describe, expect} from 'vitest'
import {checkTT, parserTT} from '../parser/parser.js'

describe ('is a TT', ()=>{
    it('detecta una TT valida', ()=>{
        expect(checkTT('tt7')).toBe(true)
    })
    it('rechaza una tt sin numero', ()=>{
        expect(checkTT('tt')).toBe(false);
    })
    it('rechaza una tt con letras', ()=>{
        expect(checkTT('ttas')).toBe(false);
    })
    it('rechaza un tt que empieza von texto', ()=>{
        expect(checkTT('hola tt45')).toBe(false);
    })
    it('rechaza una tt con texto despues',()=>{
         expect(checkTT('tt45 listo')).toBe(false);
    })
    it('rechaza un tt con espacio entre tt y numero', ()=>{
         expect(checkTT('tt 54')).toBe(false);
    })
    it('rechaza un mensaje que no empieza con tt', ()=>{
        expect(checkTT(' ')).toBe(false);
    })
    it('acepta un tt con mayuscula', ()=>{
        expect(checkTT('TT45')).toBe(true);
    })
    it('acepta una tt con espacios antes y despues', ()=>{
        expect(checkTT(' tt56 ')).toBe(true);
    })
    it('acepta una tt con un salto de linea', ()=>{
        expect(checkTT('tt45\nleon cassas\n20-40505395-1')).toBe(true);
    })
})

