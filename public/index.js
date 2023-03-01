var url = `https://clima-back-fabio2100.vercel.app`

new Vue({
    el: '#app',
    data: {
      respuesta:'',
      ciudad: '',
      listaCiudades : [],
      latitudCiudad : '',
      longitudCiudad: '',
      nombreCiudad : '',
      mostrarTabla: false,
      climaDesc : [],
      horaCiudad : [],
      hora: '',
      modoNocturno: false,
      modoClaro:true,
      textoBotonNocturno : 'Nocturno'
    },
    methods: {
      modoNocturnoF : function(hora=NaN){
        if (isNaN(hora)){
          if(this.modoNocturno){
            this.modoNocturno = false;
            this.modoClaro = true;
            this.textoBotonNocturno = 'Nocturno'
          }else{
            this.modoNocturno = true;
            this.modoClaro = false;
            this.textoBotonNocturno = 'Claro'
        }
        }else{
          if (this.hora < 7 || this.hora > 19){
            this.modoNocturno = true;
            this.modoClaro = false;
            this.textoBotonNocturno = 'Claro'
          }else{
            this.modoNocturno = false;
            this.modoClaro = true;
            this.textoBotonNocturno = 'Nocturno'
          }
        }
      },
      cargarCiudades: function (){
        this.mostrarTabla = false;
        var self = this;
        let ciudad = this.ciudad;
        axios.get(`${url}/api/busqueda/${ciudad}`)
        .then(
          function (response){
            self.listaCiudades = response.data;
          }
        )
      },
      imprimeCiudad: async function(latitud,longitud){
        var self = this;
        let clima = `${url}/api/clima/${latitud}/${longitud}`;
        let hora = `${url}/api/timeZone/${latitud}/${longitud}`
  
        const reqOne = axios.get(clima);
        const reqTwo = axios.get(hora);
  
        await axios.all([reqOne,reqTwo]).
        then(axios.spread((...responses)=>{
          const responseOne = responses[0].data;
          const responseTwo = responses[1].data;
          self.climaDesc.pop();
          self.climaDesc.push(responseOne);
          self.horaCiudad.pop();
          self.horaCiudad.push(responseTwo);
          self.hora = self.horaCiudad[0].localTime !='undefined' ? Number(self.horaCiudad[0].localTime.slice(11,13)) : "No definido";
          self.mostrarTabla = true;
        }))
        .catch(error=>{
          console.log(error);
        })
        this.modoNocturnoF(this.hora);
         
      } 
    }
  })