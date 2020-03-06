module.exports = class Robot {
    constructor({frecuencia,mensaje,sala,
        socket, despedida, Accion, persona,
        frases, saludo, usuario}){

        this.socket = socket
        this.usuario = usuario
        this.despedida = despedida
        this.frecuencia = frecuencia
        this.mensaje = mensaje
        this.saludo = saludo
        this.sala = sala
        this.Accion = Accion
        this.persona = persona
        this.frases = frases
    }
    configurar(nombre, valor, tipo){
        //  tipo 
        //      1 método
        //      2 propiedad
        if(!!parseInt(tipo)){
            this[nombre](valor)
        }else {
            this[nombre] = valor
        }
    }
    getMensaje(mensaje){
        return {
            Accion: this.Accion || 'Liquidacion_Tecnico',
            Usuario: {
                NombreUsuario: this.usuario || this.persona || 'Robot',
                Usuario: 6545,
            },
            data: mensaje || this.mensaje || "Hola. 😎",
            persona: this.persona || 'Robot'
        }
    }
    comenzarHablar(saludo){
        const mensaje = this.getMensaje()
        this.socket.publish(this.sala, mensaje)
        this.energia = setInterval(()=>{
            const mensajeInterval = this.getMensaje(saludo||this.saludo||"Qué hay xd")
            this.socket.publish(this.sala, mensajeInterval)
        }, this.frecuencia)
    }
    terminarHablar(despedida){
        this.socket.publish(
            this.sala, this.getMensaje(
            despedida || this.despedida || "Hasta pronto 😁"))
        clearInterval(this.energia)
    }
    habla(mensaje){
        this.socket.publish(
            this.sala, this.getMensaje(mensaje)
        )
    }
    subscribir = (socket,sala) => {
        if(socket){
            this.socket = socket
        }
        if(sala){
            this.sala = sala
        }
        socket.subscribe(sala).watch(data => {
            var { data, persona } = data
            if(data.includes('Dormir ' + persona) ){
                this.terminarHablar()
            }
            if(data.includes('Despertar ' + persona) ){
                this.comenzarHablar()
            }
            if(data.includes(`Hey ${persona}, di: `)){
                this.habla(data.split(':')[1])
            }
        })
    }
    desubscribir(socket,sala){
        if(!socket){
            socket = this.socket
        }
        if(!sala){
            sala = this.sala
        }
        if (socket.isSubscribed(sala)) {
            socket.unwatch(sala)
            socket.unsubscribe(sala)
        }
    }
}