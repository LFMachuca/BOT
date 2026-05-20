import {it, describe, expect} from 'vitest'
import {isTT, parserTT} from '../parser/parser.js'

describe ('is a TT', ()=>{
    it('detecta una TT valida', ()=>{
        expect(isTT('tt7')).toBe(true)
    })
})
