const socket = require('./configSC')
const Robot = require('./Robot')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})
const sala = 'SALA_374'

const entrandoAlChat = (socket,sala,nombre,usuario) => {
    socket.subscribe(sala).watch(function (data) {
        if(!data.persona){
            console.log('Sergio: ' + data.data + '\n')
        }else if((data.persona == nombre) ||
            (data.persona == usuario)){
            // tus mensajes
        }else{
            console.log(data.persona + ': ' + data.data + '\n')
        }
    })
    const iniciar = () =>{
        rl.question('', data => {
            socket.publish(sala, {
                Accion: 'Liquidacion_Tecnico',
                Usuario: {
                    NombreUsuario: usuario || nombre || 'DarwinVA',
                    Usuario: 6545,
                },
                data,
                persona: nombre || 'Darwin'
            } )
            iniciar()
        })
    }
    const salir = () => {
        if (socket.isSubscribed(sala)) {
            socket.unwatch(sala)
            socket.unsubscribe(sala)
        }
    }
    return {
        iniciar,
        salir
    }
}

const { iniciar, salir } = entrandoAlChat(socket,sala,'Darwin')
iniciar()

setTimeout(()=>{
    salir()
},1000*60*45)

const robot = new Robot({
    socket, frecuencia: 10000,
    persona: 'Diablo'
})
robot.subscribir(socket,sala)
robot.comenzarHablar()