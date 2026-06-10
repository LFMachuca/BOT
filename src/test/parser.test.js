import { it, describe, expect } from "vitest";
import { checkTT, parserTT } from "../parser/parser.js";

describe("is a TT", () => {
  it("detecta una TT valida", () => {
    expect(checkTT("tt7")).toBe(true);
  });
  it("rechaza una tt sin numero", () => {
    expect(checkTT("tt")).toBe(false);
  });
  it("rechaza una tt con letras", () => {
    expect(checkTT("ttas")).toBe(false);
  });
  it("rechaza un tt que empieza von texto", () => {
    expect(checkTT("hola tt45")).toBe(false);
  });
  it("rechaza una tt con texto despues", () => {
    expect(checkTT("tt45 listo")).toBe(false);
  });
  it("rechaza un mensaje que no empieza con tt", () => {
    expect(checkTT(" ")).toBe(false);
  });
  it("acepta un tt con mayuscula", () => {
    expect(checkTT("TT45")).toBe(true);
  });
  it("acepta una tt con espacios antes y despues", () => {
    expect(checkTT(" tt56 ")).toBe(true);
  });
  it("acepta una tt con un salto de linea", () => {
    expect(checkTT("tt45\nleon cassas\n20-40505395-1")).toBe(true);
  });
  it("acepta una tt con espacios antes del nuemro", () => {
    expect(checkTT(" tt 56 ")).toBe(true);
  });
});
const msg = `tt45
        Leon casssas
        20-40505395-1
        2850599999999999999999
        leons.tr
        $2.500.555
        leon`;
describe("ParserTT", () => {
  it("Reconoce un mensaje con formato correcto", () => {
    const result = parserTT(msg);
    expect(result.errors).toHaveLength(0);
  });


  it("Rechaza una tt sin monto", () => {
    const msgSinMonto = `tt56\narturito\n20-40505395-1\n2850599999999999999999\nr2d2\nstar`;
    expect(parserTT(msgSinMonto).errors).toContain("Monto no encontrado");
  });
  // it("Rechaza una tt sin cliente", () => {
  //   const msgSinCliente = `tt56\narturito\n345200`;
  //   expect(parserTT(msgSinCliente).errors).toContain("Cliepuedente no encontrado");
  // });
  it("acepta una tt con monto con signo $ ", () => {
    const msgConDistintoMono = `tt56\narturito\n20-40505395-1\n2850599999999999999999\nr2d2\n$345200\nstar`;
    expect(parserTT(msgConDistintoMono).monto).toBe(345200);
  });
  it("acepta una tt con monto con puntos de miles ", () => {
    const msgConDistintoMono = `tt56\narturito\n20-40505395-1\n2850599999999999999999\nr2d2\n345.200\nstar`;
    expect(parserTT(msgConDistintoMono).monto).toBe(345200);
  });
  it("acepta una tt con monto con centavos ", () => {
    const msgConDistintoMono = `tt56\narturito\n20-40505395-1\n2850599999999999999999\nr2d2\n345200,00\nstar`;
    expect(parserTT(msgConDistintoMono).monto).toBe(345200);
  });
  it("acepta una tt con monto con $, punto de mil y centavos ", () => {
    const msgConDistintoMono = `tt56\narturito\n20-40505395-1\n2850599999999999999999\nr2d2\n$345.200,50\nstar`;
    expect(parserTT(msgConDistintoMono).monto).toBe(345200.50);
  });
});
