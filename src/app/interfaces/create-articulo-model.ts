export interface CreateArticuloModel {
    codBarras: string;
    categoriaID: number;
    nombre: string;
    descripcion: string;
    proveedorID: string;
    stock: number;
    precioCompra: number; 
    utilidad: number;
    precioVenta: number;
    iva: number;
    promoID: string;
    disponible: boolean;
    visible: boolean;
    img: boolean;
    name: string;
    type: string;
    imgBytes
}