export interface ArticuloModel {
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
    lastUpdateInventory: Date;
    img: boolean;
}