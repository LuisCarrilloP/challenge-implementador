//creamos tablas para escoger montos minimos y maximos
const generoMasculinoMin = {
   "A": [100, 400, 900, 100, 600],
   "B": [1000, 600, 1000, 1000, 1000],
   "C": [400, 200, 200, 1000, 600],
   "D": [400, 300, 500, 900, 1000]
}

const generoFemeninoMin = {
   "A": [800, 800, 800, 600, 200],
   "B": [800, 700, 100, 600, 700],
   "C": [200, 900, 700, 800, 100],
   "D": [500, 1000, 600, 400, 700]
}

const generoMasculinoMax = {
   "A": [4900, 4700, 4600, 4600, 4500],
   "B": [4700, 4400, 5000, 4400, 4900],
   "C": [5000, 4700, 5000, 4200, 4600],
   "D": [4400, 4700, 4300, 4900, 4300]
}

const generoFemeninoMax = {
   "A": [4000, 4200, 4100, 4200, 4500],
   "B": [4700, 4200, 4500, 4300, 4400],
   "C": [4600, 4900, 4600, 4700, 4000],
   "D": [5000, 4900, 4700, 5000, 4300]
}


function calculoMotor(tipoNomina, fechaPrimerEmpleo, genero){
   let montoMinimo = 0
   let montoMáximo = 0
   let recomendacionLinea = 0
   
   let fechaActual = new Date()
   
   //Convertir fecha a formato para trabajar
   let fechaSplit = fechaPrimerEmpleo.split(/\//)
   let fechaFormato = [ fechaSplit[1], fechaSplit[0], fechaSplit[2] ].join('/')
   let fechaPrimer = new Date(fechaFormato)
   
   //** Obtener meses diferncia */
   let diferenciaMeses = monthDiff(fechaPrimer, fechaActual)

   //segun el valor de la diferencia de meses se determina un indice de las tablas a trabajar
   let indexTablaMeses
   if (diferenciaMeses <= 26){
      indexTablaMeses = 0
   }else if (diferenciaMeses == 27){
      indexTablaMeses = 1
   }else if (diferenciaMeses == 28){
      indexTablaMeses = 2
   }else if (diferenciaMeses == 29){
      indexTablaMeses = 3
   }else{
      indexTablaMeses = 4
   }
   
   //** Resultado final */
   function resultado(montoMinimoRes, montoMáximoRes){
      let p1
      let p2
      p1 = montoMinimoRes + (Math.sqrt(montoMáximoRes - montoMinimoRes))
      p2 = montoMinimoRes + (0.0175 * (montoMáximoRes - montoMinimoRes))
      return `Monto mínimo de crédito: $${montoMinimoRes} \nMonto máximo de crédito; $${montoMáximoRes} \nLinea de crédito optima: $${Math.max(p1, p2)} \n***********`
   }

   //determinar creditos minimos y maximos segun valores
   if(genero == "f"){
      if(tipoNomina == "A"){
         return resultado(generoFemeninoMin.A[indexTablaMeses], generoFemeninoMax.A[indexTablaMeses])
      }else if(tipoNomina == "B"){
         return resultado(generoFemeninoMin.B[indexTablaMeses], generoFemeninoMax.B[indexTablaMeses])
      }else if(tipoNomina == "C"){
         return resultado(generoFemeninoMin.C[indexTablaMeses], generoFemeninoMax.C[indexTablaMeses])
      }else{
         return resultado(generoFemeninoMin.D[indexTablaMeses], generoFemeninoMax.D[indexTablaMeses])
      }
   }else{
      if(tipoNomina == "A"){
         return resultado(generoMasculinoMin.A[indexTablaMeses], generoMasculinoMax.A[indexTablaMeses])
      }else if(tipoNomina == "B"){
         return resultado(generoMasculinoMin.B[indexTablaMeses], generoMasculinoMax.B[indexTablaMeses])
      }else if(tipoNomina == "C"){
         return resultado(generoMasculinoMin.C[indexTablaMeses], generoMasculinoMax.C[indexTablaMeses])
      }else{ 
         return resultado(generoMasculinoMin.D[indexTablaMeses], generoMasculinoMax.D[indexTablaMeses])
      }
   }
}


function monthDiff(mes1, mes2) {
   let months;
   months = (mes2.getFullYear() - mes1.getFullYear()) * 12;
   months -= mes1.getMonth();
   months += mes2.getMonth();
   return months <= 0 ? 0 : months;
}

console.log(calculoMotor("A", "12/06/2022", "f"))
console.log(calculoMotor("B", "30/12/1993", "f"))
console.log(calculoMotor("C", "19/09/2020", "m"))
console.log(calculoMotor("D", "15/01/2019", "m"))