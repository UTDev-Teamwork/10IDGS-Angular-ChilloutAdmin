import { ArticuloModel } from "./articulo-model"; 

export interface articuloPagination {
    totalItems: number;
    articulos: ArticuloModel[];
    totalPages: number;
    currentPage: number;
}