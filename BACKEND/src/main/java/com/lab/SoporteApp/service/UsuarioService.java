package com.lab.SoporteApp.service;

import com.lab.SoporteApp.dto.RegisterRequest;
import com.lab.SoporteApp.dto.UsuarioDto;
import com.lab.SoporteApp.entity.Usuario;
import com.lab.SoporteApp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UsuarioDto> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public UsuarioDto getUsuarioById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return mapToDto(usuario);
    }

    @Transactional
    public UsuarioDto createUsuario(RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El correo ya existe.");
        }

        Usuario usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .rol(request.getRol())
                .build();

        Usuario saved = usuarioRepository.save(usuario);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    private UsuarioDto mapToDto(Usuario u) {
        return UsuarioDto.builder()
                .id(u.getId())
                .email(u.getEmail())
                .nombre(u.getNombre())
                .rol(u.getRol())
                .build();
    }
}
