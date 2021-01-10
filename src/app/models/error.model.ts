export interface ErrorData {
    id_errores: number;
    id_prioridades: number;
    id_proyectos: string;
    id_estados_errores?: any;
    autor_reporte: number;
    titulo_error: string;
    descripcion: string;
    iteraciones: number;
    porcentaje_aparicion: number;
    dispositivo_uso: string;
    anexo: string;
    rama_repositorio: string;
    fecha_reporte: string;
    fecha_resolucion?: any;
    fecha_entrega?: any;
    confirmado: number;
}

export interface ErrorList {
    id_errores: string;
    titulo_error: string;
    fecha_reporte: string;
    nombre: string;
    grado_prioridad: string;
    estado: string;
}
