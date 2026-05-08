import { google } from "googleapis";
import {readFile} from "fs/promises";

const credentials = JSON.parse(await readFile("./credentials.json", "utf-8"));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes:['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({version: "v4", auth})

const appendTT = async (tt)=>{
    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Hoja 1!A:F',
            valueInputOption: 'USER_ENTERED',
            requestBody:{
                values:[[
                    tt.numero,
                    tt.titular,
                    tt.monto,
                    tt.cliente || "", 
                    tt.provider || " ",
                    new Date().toDateString('es-AR'),
                ]],
            },
        })
    } catch (error) {
        console.error("Error al agregar TT a Sheets", error)
    }
}

export {appendTT}