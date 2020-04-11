package com.riodx.switcher.service.impl;

import com.riodx.switcher.service.AntennaService;
import com.riodx.switcher.domain.Antenna;
import com.riodx.switcher.repository.AntennaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Antenna}.
 */
@Service
@Transactional
public class AntennaServiceImpl implements AntennaService {

    private final Logger log = LoggerFactory.getLogger(AntennaServiceImpl.class);

    private final AntennaRepository antennaRepository;

    public AntennaServiceImpl(AntennaRepository antennaRepository) {
        this.antennaRepository = antennaRepository;
    }

    /**
     * Save a antenna.
     *
     * @param antenna the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Antenna save(Antenna antenna) {
        log.debug("Request to save Antenna : {}", antenna);
        return antennaRepository.save(antenna);
    }

    /**
     * Get all the antennas.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Antenna> findAll() {
        log.debug("Request to get all Antennas");
        return antennaRepository.findAll();
    }

    /**
     * Get one antenna by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Antenna> findOne(Long id) {
        log.debug("Request to get Antenna : {}", id);
        return antennaRepository.findById(id);
    }

    /**
     * Delete the antenna by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Antenna : {}", id);
        antennaRepository.deleteById(id);
    }
}
