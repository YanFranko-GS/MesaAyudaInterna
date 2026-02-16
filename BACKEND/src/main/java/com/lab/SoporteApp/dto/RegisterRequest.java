package com.lab.SoporteApp.dto;

import com.lab.SoporteApp.entity.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String nombre;
    private String email;
    private String password;
    private Rol rol; // Optional, defaults to USUARIO in service if null
}
