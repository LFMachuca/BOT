import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { checkTT, parserTT } from "./parser/parser.js";
import { getProviderByEmoji } from "./providers/providers.js";
import { createTTS, asignProvider, getTT } from "./storage/db.js";
import { appendTT } from "./sheets/sheets.js";

const { Client, LocalAuth } = pkg;
const GROUP_ID = "120363409234180135@g.us";
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Escanea el codigo QR");
});
// cuendo algo pasa
client.on("ready", () => {
  console.log("Cliente listo");
});

client.on("message", (msg) => {
  try {
    if (msg.from != GROUP_ID) return;
     console.log('Pasó el filtro de grupo')

    console.log('Body bytes:', Buffer.from(msg.body).toString('hex'))
    if (!checkTT(msg.body)) return;


    const tt = parserTT(msg.body);
    console.log('TT parseada:', tt)
    createTTS(msg.id._serialized, tt);
    console.log(" TT Guardada: ", tt.numero);

  } catch (error) {
    console.error("Error al procesar el mensaje", error);
  }
});

client.on("message_reaction", async (reaction) => {
  try {
    if (reaction.id.remote != GROUP_ID) return;

    const provider = getProviderByEmoji(reaction.reaction);
    if (!provider) return;

    const tt = getTT(reaction.msgId._serialized);
    if (!tt) return;

    asignProvider(reaction.msgId._serialized, provider);
    const ttUpdate = getTT(reaction.msgId._serialized);
    await appendTT(ttUpdate);
    console.log(`TT ${ttUpdate.numero} enviada a sheets con proveedor ${provider}`)
  } catch (error) {
    console.error("Error al procesar la reaccion", error);
  }
});

client.initialize();
