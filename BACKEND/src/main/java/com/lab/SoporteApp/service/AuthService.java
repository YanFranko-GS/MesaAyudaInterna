package com.lab.SoporteApp.service;

import com.lab.SoporteApp.config.JwtService;
import com.lab.SoporteApp.dto.AuthResponse;
import com.lab.SoporteApp.dto.LoginRequest;
import com.lab.SoporteApp.dto.RegisterRequest;
import com.lab.SoporteApp.entity.Rol;
import com.lab.SoporteApp.entity.Usuario;
import com.lab.SoporteApp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UsuarioRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public String register(RegisterRequest request) {
                var user = Usuario.builder()
                                .nombre(request.getNombre())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .rol(request.getRol() == null ? Rol.USUARIO : request.getRol())
                                .build();
                repository.save(user);
                return "Usuario Registrado con Exito";
        }

        public AuthResponse login(LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .build();
        }
}
