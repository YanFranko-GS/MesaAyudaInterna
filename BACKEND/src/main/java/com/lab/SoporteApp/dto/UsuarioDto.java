package com.lab.SoporteApp.dto;

import com.lab.SoporteApp.entity.Rol;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioDto {
    private Long id;
    private String email;
    private String nombre;
    private Rol rol;
}
