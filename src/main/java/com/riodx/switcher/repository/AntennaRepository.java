package com.riodx.switcher.repository;

import com.riodx.switcher.domain.Antenna;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Antenna entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AntennaRepository extends JpaRepository<Antenna, Long> {
}
