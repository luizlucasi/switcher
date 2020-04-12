package com.riodx.switcher.web.rest;

import com.riodx.switcher.domain.Antenna;
import com.riodx.switcher.repository.AntennaRepository;
import com.riodx.switcher.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.riodx.switcher.domain.Antenna}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AntennaResource {

    private final Logger log = LoggerFactory.getLogger(AntennaResource.class);

    private static final String ENTITY_NAME = "antenna";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AntennaRepository antennaRepository;

    public AntennaResource(AntennaRepository antennaRepository) {
        this.antennaRepository = antennaRepository;
    }

    /**
     * {@code POST  /antennas} : Create a new antenna.
     *
     * @param antenna the antenna to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new antenna, or with status {@code 400 (Bad Request)} if the antenna has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/antennas")
    public ResponseEntity<Antenna> createAntenna(@RequestBody Antenna antenna) throws URISyntaxException {
        log.debug("REST request to save Antenna : {}", antenna);
        if (antenna.getId() != null) {
            throw new BadRequestAlertException("A new antenna cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Antenna result = antennaRepository.save(antenna);
        return ResponseEntity.created(new URI("/api/antennas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /antennas} : Updates an existing antenna.
     *
     * @param antenna the antenna to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated antenna,
     * or with status {@code 400 (Bad Request)} if the antenna is not valid,
     * or with status {@code 500 (Internal Server Error)} if the antenna couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/antennas")
    public ResponseEntity<Antenna> updateAntenna(@RequestBody Antenna antenna) throws URISyntaxException {
        log.debug("REST request to update Antenna : {}", antenna);
        if (antenna.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Antenna result = antennaRepository.save(antenna);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, antenna.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /antennas} : get all the antennas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of antennas in body.
     */
    @GetMapping("/antennas")
    public List<Antenna> getAllAntennas() {
        log.debug("REST request to get all Antennas");
        return antennaRepository.findAll();
    }

    /**
     * {@code GET  /antennas/:id} : get the "id" antenna.
     *
     * @param id the id of the antenna to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the antenna, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/antennas/{id}")
    public ResponseEntity<Antenna> getAntenna(@PathVariable Long id) {
        log.debug("REST request to get Antenna : {}", id);
        Optional<Antenna> antenna = antennaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(antenna);
    }

    /**
     * {@code DELETE  /antennas/:id} : delete the "id" antenna.
     *
     * @param id the id of the antenna to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/antennas/{id}")
    public ResponseEntity<Void> deleteAntenna(@PathVariable Long id) {
        log.debug("REST request to delete Antenna : {}", id);
        antennaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
