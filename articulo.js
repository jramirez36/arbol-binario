//funciones nuevas push sirve para subir algo a una cadena , pop elimina el ultimo elemento de un array
class articulo {
    constructor(tabla, llave) 
    {
        this._articulo = 0;
        this._tabla = tabla;
        this._llave = llave;
        this._order = "";
        this._inorder = "";
        this._posorder = "";
        this._preorder = "";
        this._articulobuscado;
    }
    crearProducto(nombre, precio, cantidad, descripcion, llave) 
    {   
                this._llave = llave;
                let aux;
                aux = new producto(this._llave, nombre, precio, cantidad, descripcion);
                this.agregar(aux);
    }
    agregar(aux)
    {
        let auxR = this._articulo;
        if (this._articulo === 0)
        {
            this._articulo = aux;
        }
        else if(auxR._codigo < aux._codigo)
        {
            this.agregarDer(auxR, aux);
        }
        else if(auxR._codigo > aux._codigo)
        {
            this.agregarIzq(auxR, aux);
        }
        this.impresion();
    }
    agregarIzq(auxR, aux)
    {
        if(auxR._hIzq === null)
            {
                auxR._hIzq = aux;
            }
        else
        {
            auxR = auxR._hIzq;
            this.agregarIzq(auxR, aux);
        }
    }
    agregarDer(auxR, aux)
    {
        if(auxR._hDer === null)
            {
                auxR._hDer = aux;
            }
        else
            {
                auxR = auxR._hDer;
                this.agregarDer(auxR, aux);
            }
    }
    buscar(codigo) 
    {
        let buscador;
        codigo = Number(codigo);
        let aux = this._articulo;
            if (aux._codigo === codigo) 
                {
                    buscador = aux.toString();
                    alert('Articulo encontrado. ');
                }
            else
                {
                    this.buscarArbol(aux, codigo);
                    buscador = this._articulobuscado;
                }
            return buscador;
    }
    buscarArbol(aux, codigo)
    {
        if(aux._codigo === codigo) 
        {
            this._articulobuscado = aux.toString();
            alert('Articulo encontrado. ');
        }
        else if(aux === undefined)
        {
            this._articulobuscado = "No encontrado";
            alert("Articulo no encontrado. ");
        }
        else
        {
            if(aux._codigo > codigo)
            {
                aux = aux._hIzq;
                this.buscarArbol(aux, codigo);
            }
            else if (aux._codigo < codigo)
            {
                aux = aux._hDer;
                this.buscarArbol(aux, codigo);
            }
        }
    }
    impresion() {
        this._order = "";
        let aux = this._articulo;
        if (aux != null)
        {
            this.imprecionArbol(aux);
        }
        this._tabla.innerHTML = this._order;
    }
    imprecionArbol(aux)
    {
        if(aux != null)
        {
            this.imprecionArbol(aux._hIzq);
            this._order += aux.toString() + "<br>";
            this.imprecionArbol(aux._hDer);
        }
    }

    inorder()
    {
        let aux = this._articulo;
        if (aux != null)
        {
            this.imprecioninorder(aux);
        }
        let tabla = document.querySelector('#tablainorder');
        tabla.innerHTML = this._inorder;
    }
    imprecioninorder(aux)
    {
        if(aux != null)
        {
            this.imprecioninorder(aux._hIzq);
            this._inorder += aux.toString() + "<br>";
            this.imprecioninorder(aux._hDer);
        }
    }

    preorder()
    {
        let aux = this._articulo;
        if (aux != null)
        {
            this.imprecionPreorder(aux);
        }
        let tabla = document.querySelector('#tablapreorder');
        tabla.innerHTML = this._preorder;
    }
    imprecionPreorder(aux)
    {
        if(aux != null)
        {
            this._preorder += aux.toString() + "<br>";
            this.imprecionPreorder(aux._hIzq);
            this.imprecionPreorder(aux._hDer);
        }
    }

    posorder()
    {
        let aux = this._articulo;
        if (aux != null)
        {
            this.imprecionPosorder(aux);
        }
        let tabla = document.querySelector('#tablaposorder');
        tabla.innerHTML = this._posorder;
    }
    imprecionPosorder(aux)
    {
        if(aux != null)
        {
            this.imprecionPosorder(aux._hIzq);
            this.imprecionPosorder(aux._hDer);
            this._posorder += aux.toString() + "<br>";
        }
    }
    get articulo() 
    {
        return this._articulo;
    }
    get llave() 
    {
        return this._llave;
    }
}
//impreciones
class producto{
    constructor(codigo, nombre, precio, cantidad, descripcion)
    {
        this._codigo = codigo;
        this._nombre = nombre;
        this._precio = precio;
        this._cantidad = cantidad;
        this._descripcion = descripcion;
        this._hIzq = null;
        this._hDer = null;
    }
    get codigo()
    {
        return this._codigo;
    }
    toString()
    {
        return 'Código: ' + this._codigo + ' Nombre: ' + this._nombre + ' Precio: $' + this._precio + ' Cantidad: ' + this._cantidad + ' Descripción: ' + this._descripcion ;
    }
}
//botones
var almacen = new articulo(document.querySelector('#tablaArticulos'), Number(document.querySelector('#codigo').value));
document.querySelector('#agregar').addEventListener('click', () => {
    let llave = Number(document.querySelector('#codigo').value);
    let nombre = document.querySelector('#nombre').value;
    let precio = document.querySelector('#precio').value;
    let cantidad = document.querySelector('#cantidad').value;
    let descripcion = document.querySelector('#descripcion').value;

    almacen.crearProducto(nombre, precio, cantidad, descripcion, llave);
    document.querySelector('#codigo').value = almacen.llave;
});
document.querySelector('#buscar').addEventListener('click', () => {
    let buscarArticulo = almacen.buscar(document.querySelector('#buscarCodigo').value);
    document.querySelector('#tablaBuscar').innerHTML = buscarArticulo;
});
document.querySelector('#inorder').addEventListener('click', () => {
    almacen.inorder();
});
document.querySelector('#preorder').addEventListener('click', () => {
    almacen.preorder();
});
document.querySelector('#posorder').addEventListener('click', () => {
    almacen.posorder();
});