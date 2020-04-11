package com.riodx.switcher.repository;

import com.riodx.switcher.domain.Radio;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Radio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RadioRepository extends JpaRepository<Radio, Long> {
}
