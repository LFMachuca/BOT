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
      range: "Hoja 1!A:G",
    });
    const rows = res.data.values || [];
    const rowIndex = rows.findIndex((row) => row[1] === msgId);
    return rowIndex;
  } catch (error) {
    console.error("Error al buscar fila por ID", error);
    return -1;
  }
};
const updateTT = async (tt) => {
  try {
    const index = await findRowById(tt.msg_id);
    if (index !== -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SHEET_ID,
        range: `Hoja 1!G${index + 1}`,
        valueInputOption:'USER_ENTERED',
        requestBody:{
            values:[[tt.provider]]
        }
      });

      console.log(`TT ${tt.numero} actualizada en sheets con proveedor ${tt.provider}`)
    }
  } catch(error) {
    console.error("Error al actualizar TT a Sheets", error);
  }
};
export { appendTT , updateTT};
