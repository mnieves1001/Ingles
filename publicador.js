const amqp = require('amqplib');

const cola = 'progreso_usuario';

async function publicarProgreso() {
  const conexion = await amqp.connect('amqp://localhost');
  const canal = await conexion.createChannel();

  await canal.assertQueue(cola, { durable: false });

  const mensaje = {
    usuario: 'JuanPerez',
    leccion: 'Lección 1',
    progreso: 100
  };

  canal.sendToQueue(cola, Buffer.from(JSON.stringify(mensaje)));
  console.log("✅ Mensaje publicado:", mensaje);

  setTimeout(() => {
    conexion.close();
    process.exit(0);
  }, 500);
}

publicarProgreso();
