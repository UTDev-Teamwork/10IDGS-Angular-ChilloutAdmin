export interface ProveedorModel {
    id: string;
    rfc: string;
    razonSocial: string;
    nombreContacto: string;
    telefonoPrincipal: string;
    telefonoMovil: string;
    email: string;
    fechaRegistro: Date;
    activo: boolean;
}