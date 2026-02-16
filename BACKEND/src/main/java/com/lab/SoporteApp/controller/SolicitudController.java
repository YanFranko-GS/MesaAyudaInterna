package com.lab.SoporteApp.controller;

import com.lab.SoporteApp.dto.SolicitudDto;
import com.lab.SoporteApp.entity.Estado;
import com.lab.SoporteApp.entity.Prioridad;
import com.lab.SoporteApp.service.SolicitudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
@RequiredArgsConstructor
public class SolicitudController {

    private final SolicitudService service;

    @PostMapping
    public ResponseEntity<SolicitudDto> create(@RequestBody SolicitudDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(service.create(dto, userDetails.getUsername()));
    }

    @GetMapping
    public ResponseEntity<List<SolicitudDto>> getAll(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(service.getAll(userDetails.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitudDto> getById(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(service.getById(id, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SolicitudDto> update(@PathVariable Long id, @RequestBody SolicitudDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(service.update(id, dto, userDetails.getUsername()));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<SolicitudDto>> filter(
            @RequestParam(required = false) Estado estado,
            @RequestParam(required = false) Prioridad prioridad,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(service.filter(estado, prioridad, userDetails.getUsername()));
    }
}
