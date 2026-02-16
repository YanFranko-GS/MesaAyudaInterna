package com.lab.SoporteApp.dto;

import com.lab.SoporteApp.entity.Estado;
import com.lab.SoporteApp.entity.Prioridad;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudDto {
    private Long id;
    private String titulo;
    private String descripcion;
    private Prioridad prioridad;
    private Estado estado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private String solicitanteUsername;
    private Long solicitanteId;
}
