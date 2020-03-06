const socketClusterClient = require('socketcluster-client')
const socket = socketClusterClient.create({

    hostname: 'cobra-sistemas.sytes.net',
    
    port: 8002,   

    autoReconnect: true,

    ackTimeout: 600000  //300 SEGUNDOS ESPERAR PARA EL CALLBACK

});

module.exports = socket



// Modelo_Orden_Enviar.Chat.push({
//     NombreUsuario: data.Usuario.NombreUsuario,
//     Usuario: data.Usuario.Usuario,
//     Mensaje: data.data
// })

// let UsuarioChat = {
//     NombreUsuario: data.Usuario.NombreUsuario,
//     Usuario: data.Usuario.Usuario
// }
// let texto = CrearMensajeRecibido({ Accion: 'Liquidacion_Tecnico', Usuario: UsuarioChat, data: data.data });