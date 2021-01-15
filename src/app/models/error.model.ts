export interface ErrorData {
    id_errores: number;
    grado_prioridad: string;
    id_prioridades: string;
    nombre_proyecto: string;
    estado: string;
    autor_reporte: string;
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
export interface ErrorDataAsigned {
    fecha_de_entrega: string;
    id_usuarios: number;
    fecha_de_resolucion?: any;
    id_errores_usuarios: number;
    autor_reporte: number;
    titulo_error: string;
    descripcion: string;
    iteraciones: number;
    anexo?: any;
    rama_repositorio: string;
    fecha_reporte: string;
    confirmado: number;
    porcentaje_aparicion: number;
    dispositivo_uso: string;
    grado_prioridad: string;
    id_prioridades: number;
    estado: string;
    id_estados_errores: number;
}
export interface ErrorList {
    id_errores: string;
    titulo_error: string;
    fecha_reporte: string;
    nombre: string;
    grado_prioridad: string;
    estado: string;
    id_estados_errores: string;
    confirmado: string;
}
export interface ErrorAsignedList {
    id_errores_usuarios: number;
    id_usuarios: number;
    fecha_de_entrega: string;
    titulo_error: string;
    fecha_reporte: string;
    id_errores: number;
    confirmado: number;
    estado: string;
    id_estados_errores: number;
    grado_prioridad: string;
}
