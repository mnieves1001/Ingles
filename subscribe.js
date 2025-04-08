const amqp = require('amqplib');

const cola = 'progreso_usuario';

async function consumirMensajes() {
  const conexion = await amqp.connect('amqp://localhost');
  const canal = await conexion.createChannel();

  await canal.assertQueue(cola, { durable: false });

  console.log("📥 Esperando mensajes de progreso...\n");

  canal.consume(cola, (mensaje) => {
    if (mensaje !== null) {
      const data = JSON.parse(mensaje.content.toString());
      console.log(`📌 Guardando en base de datos: Usuario: ${data.usuario}, Lección: ${data.leccion}, Progreso: ${data.progreso}%`);
      console.log(`🔔 Notificación enviada: ¡${data.usuario}, completaste ${data.leccion}!`);
      canal.ack(mensaje);
    }
  });
}

consumirMensajes();