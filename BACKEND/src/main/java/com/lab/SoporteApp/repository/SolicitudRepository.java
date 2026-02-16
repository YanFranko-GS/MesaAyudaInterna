package com.lab.SoporteApp.repository;

import com.lab.SoporteApp.entity.Estado;
import com.lab.SoporteApp.entity.Prioridad;
import com.lab.SoporteApp.entity.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    List<Solicitud> findBySolicitanteId(Long usuarioId);

    List<Solicitud> findByEstado(Estado estado);

    List<Solicitud> findByPrioridad(Prioridad prioridad);

    List<Solicitud> findByEstadoAndPrioridad(Estado estado, Prioridad prioridad);
}
