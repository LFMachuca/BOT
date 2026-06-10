const errorHandler = (client) => {
  client.on("disconnected", (reason) => {
    console.log("Cliente desconcetado:", reason);
    console.log("Intentando reconectar....");
    client.initialize();
  });

  client.on("auth_failure", (msg) => {
    console.error("Error de autenticacion:", msg);
  });

  process.on("uncaughtException", (err) => {
    console.error("Error no manejado", err.message);
  });

  process.on("unhandledRejection", (reason) => {
    console.error("Promesa rechazada sin manejar", reason);
  });
};

export default errorHandler;