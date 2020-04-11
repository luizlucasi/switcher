package com.riodx.switcher.service;

import com.riodx.switcher.domain.Antenna;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Antenna}.
 */
public interface AntennaService {

    /**
     * Save a antenna.
     *
     * @param antenna the entity to save.
     * @return the persisted entity.
     */
    Antenna save(Antenna antenna);

    /**
     * Get all the antennas.
     *
     * @return the list of entities.
     */
    List<Antenna> findAll();

    /**
     * Get the "id" antenna.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Antenna> findOne(Long id);

    /**
     * Delete the "id" antenna.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
