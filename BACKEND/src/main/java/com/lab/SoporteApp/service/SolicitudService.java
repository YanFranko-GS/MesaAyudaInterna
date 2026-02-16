package com.lab.SoporteApp.service;

import com.lab.SoporteApp.dto.SolicitudDto;
import com.lab.SoporteApp.entity.Estado;
import com.lab.SoporteApp.entity.Prioridad;
import com.lab.SoporteApp.entity.Rol;
import com.lab.SoporteApp.entity.Solicitud;
import com.lab.SoporteApp.entity.Usuario;
import com.lab.SoporteApp.repository.SolicitudRepository;
import com.lab.SoporteApp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public SolicitudDto create(SolicitudDto dto, String username) {
        if (dto.getTitulo() == null || dto.getTitulo().length() < 5) {
            throw new IllegalArgumentException("El título debe tener al menos 5 caracteres.");
        }
        if (dto.getDescripcion() == null || dto.getDescripcion().length() < 10) {
            throw new IllegalArgumentException("La descripción debe tener al menos 10 caracteres.");
        }

        Usuario usuario = usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Solicitud solicitud = Solicitud.builder()
                .titulo(dto.getTitulo())
                .descripcion(dto.getDescripcion())
                .prioridad(dto.getPrioridad() != null ? dto.getPrioridad() : Prioridad.BAJA)
                .estado(Estado.NUEVO)
                .solicitante(usuario)
                .build();

        Solicitud saved = solicitudRepository.save(solicitud);
        return mapToDto(saved);
    }

    public List<SolicitudDto> getAll(String username) {
        Usuario usuario = usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuario.getRol() == Rol.OPERADOR) {
            return solicitudRepository.findAll().stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } else {
            return solicitudRepository.findBySolicitanteId(usuario.getId()).stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        }
    }

    public SolicitudDto getById(Long id, String username) {
        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        Usuario usuario = usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuario.getRol() != Rol.OPERADOR && !solicitud.getSolicitante().getId().equals(usuario.getId())) {
            throw new RuntimeException("No tiene permisos para ver esta solicitud");
        }

        return mapToDto(solicitud);
    }

    @Transactional
    public SolicitudDto update(Long id, SolicitudDto dto, String username) {
        Solicitud solicitud = solicitudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        Usuario usuario = usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Authorization check
        if (usuario.getRol() != Rol.OPERADOR && !solicitud.getSolicitante().getId().equals(usuario.getId())) {
            throw new RuntimeException("No tiene permisos para editar esta solicitud");
        }

        // Check "No se puede pasar de estado Cerrado a otro estado"
        if (solicitud.getEstado() == Estado.CERRADO && dto.getEstado() != null && dto.getEstado() != Estado.CERRADO) {
            throw new IllegalArgumentException("No se puede cambiar el estado de una solicitud CERRADA.");
        }

        // User restrictions
        if (usuario.getRol() == Rol.USUARIO) {
            // Cannot change Status
            if (dto.getEstado() != null && dto.getEstado() != solicitud.getEstado()) {
                throw new IllegalArgumentException("Solo los operadores pueden cambiar el estado de la solicitud.");
            }
            // Cannot change Priority (Reserved for Operator per requirements/best practice
            // "hasta actualizar prioridad")
            if (dto.getPrioridad() != null && dto.getPrioridad() != solicitud.getPrioridad()) {
                throw new IllegalArgumentException("Solo los operadores pueden cambiar la prioridad de la solicitud.");
            }
        }

        // Basic fields update
        if (dto.getTitulo() != null) {
            if (dto.getTitulo().length() < 5)
                throw new IllegalArgumentException("Título debe tener min 5 caracteres");
            solicitud.setTitulo(dto.getTitulo());
        }
        if (dto.getDescripcion() != null) {
            if (dto.getDescripcion().length() < 10)
                throw new IllegalArgumentException("Descripción debe tener min 10 caracteres");
            solicitud.setDescripcion(dto.getDescripcion());
        }

        // Fields allowed for Operator (or User implicitly if not blocked above, but we
        // blocked Priority for user)
        if (dto.getPrioridad() != null && usuario.getRol() == Rol.OPERADOR) {
            solicitud.setPrioridad(dto.getPrioridad());
        }

        // Status update
        if (dto.getEstado() != null) {
            solicitud.setEstado(dto.getEstado());
        }

        Solicitud updated = solicitudRepository.save(solicitud);
        return mapToDto(updated);
    }

    public List<SolicitudDto> filter(Estado estado, Prioridad prioridad, String username) {
        Usuario usuario = usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Solicitud> results;
        if (estado != null && prioridad != null) {
            results = solicitudRepository.findByEstadoAndPrioridad(estado, prioridad);
        } else if (estado != null) {
            results = solicitudRepository.findByEstado(estado);
        } else if (prioridad != null) {
            results = solicitudRepository.findByPrioridad(prioridad);
        } else {
            results = solicitudRepository.findAll();
        }

        // Filter by user role if not operator
        if (usuario.getRol() != Rol.OPERADOR) {
            results = results.stream()
                    .filter(s -> s.getSolicitante().getId().equals(usuario.getId()))
                    .collect(Collectors.toList());
        }

        return results.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private SolicitudDto mapToDto(Solicitud s) {
        return SolicitudDto.builder()
                .id(s.getId())
                .titulo(s.getTitulo())
                .descripcion(s.getDescripcion())
                .prioridad(s.getPrioridad())
                .estado(s.getEstado())
                .fechaCreacion(s.getFechaCreacion())
                .fechaActualizacion(s.getFechaActualizacion())
                .solicitanteId(s.getSolicitante().getId())
                .solicitanteUsername(s.getSolicitante().getUsername())
                .build();
    }
}
