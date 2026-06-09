import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { checkTT, parserTT } from "./parser/parser.js";
import { getProviderByEmoji } from "./providers/providers.js";
import { createTTS, asignProvider, getTT } from "./storage/db.js";
import { appendTT, updateTT } from "./sheets/sheets.js";
import errorHandler from './middlewares/errorHandler.js';

const { Client, LocalAuth } = pkg;
const GROUP_ID = "120363409234180135@g.us";
//  120363072298978300@g.us

const client = new Client({
  authStrategy: new LocalAuth(),
});
errorHandler(client);

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Escanea el codigo QR");
});
// cuendo algo pasa
client.on("ready", () => {
  console.log("Cliente listo");
});

client.on("message_create", async (msg) => {
  try {
   
    const chatId = msg.fromMe ? msg.to : msg.from;

    if (chatId != GROUP_ID) return;
  
    if (!checkTT(msg.body)){
      console.log("Mensaje no es una TT, ignorando:", msg.body);
      return;
    };
    
    const tt = parserTT(msg.body);
    console.log('TT parseada:', JSON.stringify(tt, null, 2))
    createTTS(msg.id._serialized, tt);
    await appendTT({msg_id: msg.id._serialized, ...tt})
    console.log('TT procesada y guardad en db:', tt.numero, 'con errores:', tt.errors.length>0 ? tt.errors : 'NO HAY ERRORES')

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
    console.log('TT encontrada para reacción:', tt ? tt.numero : 'NO ENCONTRADA')
    if (!tt) return;

    asignProvider(reaction.msgId._serialized, provider);
    const ttUpdate = getTT(reaction.msgId._serialized);
    await updateTT(ttUpdate);
    console.log(`TT ${ttUpdate.numero} actualizada en sheets con proveedor ${provider}`)
  } catch (error) {
    console.error("Error al procesar la reaccion", error);
  }
});

client.initialize();
