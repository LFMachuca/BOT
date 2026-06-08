import { google } from "googleapis";
import { readFile } from "fs/promises";

const credentials = JSON.parse(await readFile("./credentials.json", "utf-8"));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const appendTT = async (tt) => {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Hoja 1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleDateString("es-AR"),
            tt.msg_id,
            tt.numero,
            tt.titular,
            tt.monto,
            tt.cliente || "",
            tt.provider || " ",
          ],
        ],
      },
    });
  } catch (error) {
    console.error("Error al agregar TT a Sheets", error);
  }
};
const findRowById = async (msgId) => {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Hoja 1!A:J",
    });
    const rows = res.data.values || [];
    const rowIndex = rows.findIndex((row) => row[2] === msg_id);
    return rowIndex;
  } catch (error) {}
};
const updateTT = async (tt) => {
  try {
    const index = await findRowById(tt.msg_id);
    if (index !== -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SHEET_ID,
        range: `Hoja 1!B${index + 1}`,
        valueInputOption:'USER_ENTERED',
        requestBody:{
            values:[[tt.provider]]
        }
      });

      console.log(`TT ${tt.numero} actualizada en sheets con proveedor ${tt.provider}`)
    }
  } catch {}
};
export { appendTT };
