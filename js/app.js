const digitos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operaciones = ['+', '-', '*', '/'];
const cantidadNumerosPantalla = 8;
var signoOperacion= '';
var resultadoOperacion= '';
var primerOperando= '';
var segundoOperando= '';

function reducirTamanoTecla(elemento) {
    elemento.style.transform = "scale(0.95, 0.92)";
}


function aumentarTamanoTecla(elemento) {
    elemento.style.transform = "";
}


function obtenerValorTecla(elemento) {
    return elemento.getAttribute('id');
}


function verificarDigito(elemento) {
    var valida = '';
    (digitos.indexOf(elemento) != -1) ? valida = true : valida = false;
    return valida;
}


function verificarSigno(elemento) {
    var valida = '';
    (operaciones.indexOf(elemento) != -1) ? valida = true : valida = false;
    return valida;
}


function verificarCantidadNumeros(elemento) {
    var valida = '';
    (elemento < cantidadNumerosPantalla) ? valida = true : valida = false;
    return valida;
}


function agregarNumeroPantalla(elemento) {
    var numerosPantalla = '', numero = '';
    numerosPantalla = document.querySelector('.pantalla span').innerHTML;

    if (verificarCantidadNumeros(numerosPantalla.length)) {
        if (elemento == '0' && numerosPantalla == '0') {
            numero = '0';
        }
        else if (verificarDigito(elemento) && numerosPantalla == '0') {
            numero = elemento;
        }
        else if (verificarDigito(elemento)) {
            numero = numerosPantalla + elemento;
        }
        else {
            numero = numerosPantalla;
        }
        document.querySelector('.pantalla span').innerHTML = numero;
        //console.log('AgregarNumeroPantalla\n'+'pantalla = ' + numero + ' / se agrega = ' + elemento);
    }
}


function borrarNumerosPantalla() {
    document.querySelector('.pantalla span').innerHTML = '0';
    //console.log("se borra la pantalla");

}


function agregarPuntoPantalla() {
    var numerosPantalla = "", numero = '', punto = '.';
    numerosPantalla = document.querySelector('.pantalla span').innerHTML;

    if (verificarCantidadNumeros(numerosPantalla.length)) {
        if (numerosPantalla.indexOf(punto) != -1) {
            numero = numerosPantalla;
        }
        else {
            numero = numerosPantalla + punto;
        }

        document.querySelector('.pantalla span').innerHTML = numero;
        //console.log('AgregarPuntoPantalla\n'+'pantalla = ' + numero + ' / se agrega punto');
    }
}


function agregarUnarioPantalla() {
    var numerosPantalla = '', numero = '', unario = '-';
    numerosPantalla = document.querySelector('.pantalla span').innerHTML;

    if (numerosPantalla == '0') {
        numero = numerosPantalla;
    }
    else if (numerosPantalla.indexOf(unario) != -1) {
        numero = numerosPantalla.slice(1);
    }
    else {
        numero = unario + numerosPantalla;
    }

    document.querySelector('.pantalla span').innerHTML = numero;
    //console.log('AgregarUnarioPantalla\n'+'pantalla = ' + numero + ' / se agrega unario');

}


function obtenerNumeroPantalla() {
    var numerosPantalla = '', numero = '', punto = '.', cero = '0';
    numerosPantalla = document.querySelector('.pantalla span').innerHTML;

    if (numerosPantalla == '0' || numerosPantalla == '0.') {
        numero = parseInt(cero);
    }
    else if (numerosPantalla.indexOf(punto) != -1) {
        numero = parseFloat(numerosPantalla);
    }
    else {
        numero = parseInt(numerosPantalla);
    }

    //console.log("Operando = " + numero);
    return numero;
}


function borrarPantalla() {
    document.querySelector('.pantalla span').innerHTML = '';
}


function calcularSuma(num1, num2) {
    var suma = '';
    suma = num1 + num2;
    return suma;
}

function calcularResta(num1, num2) {
    var resta = '';
    resta = num1 - num2;
    return resta;
}

function calcularMultiplicacion(num1, num2) {
    var multiplicacion = '';
    multiplicacion = num1 * num2;
    return multiplicacion;
}

function calcularDivision(num1, num2) {
    var division = '';
    if ((num2 == 0) || (num2 == '0')) {
        division = 0;
    }
    else {
        division = num1 / num2;
    }
    return division;
}


function calcularOperacion(primerOperando, segundoOperando, signoOperacion) {
    var resultado = "";
    switch (signoOperacion) {
        case '+':
            resultado = calcularSuma(primerOperando, segundoOperando);
            break;
        case '-':
            resultado = calcularResta(primerOperando, segundoOperando);
            break;
        case '*':
            resultado = calcularMultiplicacion(primerOperando, segundoOperando);
            break;
        case '/':
            resultado = calcularDivision(primerOperando, segundoOperando);
            break;
    }

    //console.log("Operacion = " + signoOperacion + " / Resultado = " + resultado);
    return resultado;
}


function mostrarResultadoPantalla(resultado) {
    var cadena = '';
    cadena = String(resultado);

    if (verificarCantidadNumeros(cadena.length)) {
        cadena = resultado;
    }
    else {
        cadena = cadena.slice(0, cantidadNumerosPantalla);
    }

    //console.log('pantalla = '+cadena);
    document.querySelector('.pantalla span').innerHTML = cadena;
}

var Calculadora = {
    valorTecla: '',
    signoOperacion: '',
    resultadoOperacion: '',
    primerOperando: '',
    segundoOperando: '',
    teclado: document.querySelectorAll('.teclado img'),


    iniciar: function () {
        this.verificarTeclasPresionadas();
    },

    verificarTeclasPresionadas: function () {
        for (var i = 0; i < this.teclado.length; +i++) {
            this.teclado[i].onmousedown = this.eventoReducirTamanoTecla;
            this.teclado[i].onmouseup = this.eventoAumentarTamanoTecla;
            this.teclado[i].onclick = this.eventoObtenerValorTecla;
        }
    },


    eventoReducirTamanoTecla: function (event) {
        reducirTamanoTecla(event.target);
    },

    eventoAumentarTamanoTecla: function (event) {
        aumentarTamanoTecla(event.target);
    },

    eventoObtenerValorTecla: function (event) {

        this.valorTecla = obtenerValorTecla(event.target);

        /*
        * PORCION DE CODIGO UTILIZANDO LAS VARIALES DEL OBJETO Calculadora
        * Observaciones: Esta porcion de codigo contiene el codigo para la implementacion de la instruccion (switch)
        * mediante la cual se capturan los valores asociados a las teclas clickeadas por el usuario, se muestran los
        * numeros en el display y se ejecutan los calculos de las operaciones. Sin embargo tuve inconvenientes para
        * dejar funcionando este codigo razon por lo cual lo dejo comentareado. Los inconvenientes que tuve fueron
        * por que al asignar un valor a la variable (this.primerOperando) a traves del metodo (obtenerNumeroPantalla)
        * en los casos del switch en los que el usuario clickea las teclas de las operaciones (+,-,*,/), el valor es
        * devuelto por el metodo y es asignado a la variable, pero cuando envio como parametro esta variable a traves
        * del metodo (calcularOperacion) verifico qu esta variable ya no tiene el valor que le habai asignado previamente
        * sino que esta como undefined, por lo que en consecuencia se altera el resultado de cualquier operacion como
        * se puede notar en el valor del resultado. Para hacer la prueba se puede descomentarear este codigo y comentarear
        * el siguiente codigo de la instruccion (switch) que deje activo.
        * */

        /*switch (this.valorTecla) {
            case 'on':
                borrarNumerosPantalla();
                break;
            case 'punto':
                agregarPuntoPantalla();
                break;
            case 'sign':
                agregarUnarioPantalla();
                break;
            case 'mas':
                this.signoOperacion = '+';
                this.primerOperando = obtenerNumeroPantalla();
                console.log('this.primerOperando = '+this.primerOperando+' / this.signoOperacion = '+this.signoOperacion);
                borrarPantalla();
                break;
            case 'menos':
                this.signoOperacion = '-';
                this.primerOperando = obtenerNumeroPantalla();
                console.log('this.primerOperando = '+this.primerOperando+' / this.signoOperacion = '+this.signoOperacion);
                borrarPantalla();
                break;
            case 'por':
                this.signoOperacion = '*';
                this.primerOperando = obtenerNumeroPantalla();
                console.log('this.primerOperando = '+this.primerOperando+' / this.signoOperacion = '+this.signoOperacion);
                borrarPantalla();
                break;
            case 'dividido':
                this.signoOperacion = '/';
                this.primerOperando = obtenerNumeroPantalla();
                console.log('this.primerOperando = '+this.primerOperando+' / this.signoOperacion = '+this.signoOperacion);
                borrarPantalla();
                break;
            case 'igual':
                this.segundoOperando = obtenerNumeroPantalla();
                console.log("primerOperando = " + this.primerOperando + " / segundoOperando = " + this.segundoOperando + " / operacion = " + this.signoOperacion);
                this.resultadoOperacion = calcularOperacion(this.primerOperando, this.segundoOperando, this.signoOperacion);
                mostrarResultadoPantalla(this.resultadoOperacion);
                break;
            default:
                agregarNumeroPantalla(this.valorTecla);
                break;
        }*/


        /*
         * PORCION DE CODIGO UTILIZANDO LAS VARIALES GLOBALES
         * Observaciones: En esta porcion de codigo a diferencia del anterior estoy utilizando las variables globales
         * que declare al principio del archivo, esto debido a los inconvenientes que tuve con la porcion de codigo
         * anterior, no obstante consulte a uno de los tutores llamado Camilo (no recuerdo el apellido) a quien le
         * envie el proyecto completo, entre los dos estuvimos revisando detalladamente el codigo pero no logramos encontrar
         * el error. Por esa razon decidi enviar mi proyecto asi porque considero que independientemente de que no haya
         * seguido las instrucciones al pie de la letra, mediante las alternativas que implemente como son las variables
         * globales pude dejar funcionando el programa adecuadamente, y me parece que al final ese es el objetivo por
         * cumplir, igual quedo atento de sus observaciones al respecto
         * */

        switch (this.valorTecla) {
            case 'on':
                borrarNumerosPantalla();
                break;
            case 'punto':
                agregarPuntoPantalla();
                break;
            case 'sign':
                agregarUnarioPantalla();
                break;
            case 'mas':
                signoOperacion = '+';
                primerOperando = obtenerNumeroPantalla();
                //console.log('primerOperando = '+primerOperando+' / signoOperacion = '+signoOperacion);
                borrarPantalla();
                break;
            case 'menos':
                signoOperacion = '-';
                primerOperando = obtenerNumeroPantalla();
                //console.log('primerOperando = '+primerOperando+' / signoOperacion = '+signoOperacion);
                borrarPantalla();
                break;
            case 'por':
                signoOperacion = '*';
                primerOperando = obtenerNumeroPantalla();
                //console.log('primerOperando = '+primerOperando+' / signoOperacion = '+signoOperacion);
                borrarPantalla();
                break;
            case 'dividido':
                signoOperacion = '/';
                primerOperando = obtenerNumeroPantalla();
                //console.log('primerOperando = '+primerOperando+' / signoOperacion = '+signoOperacion);
                borrarPantalla();
                break;
            case 'igual':
                segundoOperando = obtenerNumeroPantalla();
                //console.log("primerOperando = " + primerOperando + " / segundoOperando = " + segundoOperando + " / operacion = " + signoOperacion);
                resultadoOperacion = calcularOperacion(primerOperando, segundoOperando, signoOperacion);
                //console.log('resultadoOperacion = '+resultadoOperacion);
                mostrarResultadoPantalla(resultadoOperacion);
                break;
            default:
                agregarNumeroPantalla(this.valorTecla);
                break;
        }
    }
};


Calculadora.iniciar();