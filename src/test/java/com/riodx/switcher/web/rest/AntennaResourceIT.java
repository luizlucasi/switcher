package com.riodx.switcher.web.rest;

import com.riodx.switcher.SwitcherApp;
import com.riodx.switcher.domain.Antenna;
import com.riodx.switcher.repository.AntennaRepository;
import com.riodx.switcher.service.AntennaService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AntennaResource} REST controller.
 */
@SpringBootTest(classes = SwitcherApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class AntennaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IN_USE = false;
    private static final Boolean UPDATED_IN_USE = true;

    @Autowired
    private AntennaRepository antennaRepository;

    @Autowired
    private AntennaService antennaService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAntennaMockMvc;

    private Antenna antenna;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Antenna createEntity(EntityManager em) {
        Antenna antenna = new Antenna()
            .nome(DEFAULT_NOME)
            .inUse(DEFAULT_IN_USE);
        return antenna;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Antenna createUpdatedEntity(EntityManager em) {
        Antenna antenna = new Antenna()
            .nome(UPDATED_NOME)
            .inUse(UPDATED_IN_USE);
        return antenna;
    }

    @BeforeEach
    public void initTest() {
        antenna = createEntity(em);
    }

    @Test
    @Transactional
    public void createAntenna() throws Exception {
        int databaseSizeBeforeCreate = antennaRepository.findAll().size();

        // Create the Antenna
        restAntennaMockMvc.perform(post("/api/antennas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(antenna)))
            .andExpect(status().isCreated());

        // Validate the Antenna in the database
        List<Antenna> antennaList = antennaRepository.findAll();
        assertThat(antennaList).hasSize(databaseSizeBeforeCreate + 1);
        Antenna testAntenna = antennaList.get(antennaList.size() - 1);
        assertThat(testAntenna.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testAntenna.isInUse()).isEqualTo(DEFAULT_IN_USE);
    }

    @Test
    @Transactional
    public void createAntennaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = antennaRepository.findAll().size();

        // Create the Antenna with an existing ID
        antenna.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAntennaMockMvc.perform(post("/api/antennas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(antenna)))
            .andExpect(status().isBadRequest());

        // Validate the Antenna in the database
        List<Antenna> antennaList = antennaRepository.findAll();
        assertThat(antennaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAntennas() throws Exception {
        // Initialize the database
        antennaRepository.saveAndFlush(antenna);

        // Get all the antennaList
        restAntennaMockMvc.perform(get("/api/antennas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(antenna.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].inUse").value(hasItem(DEFAULT_IN_USE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAntenna() throws Exception {
        // Initialize the database
        antennaRepository.saveAndFlush(antenna);

        // Get the antenna
        restAntennaMockMvc.perform(get("/api/antennas/{id}", antenna.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(antenna.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.inUse").value(DEFAULT_IN_USE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAntenna() throws Exception {
        // Get the antenna
        restAntennaMockMvc.perform(get("/api/antennas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAntenna() throws Exception {
        // Initialize the database
        antennaService.save(antenna);

        int databaseSizeBeforeUpdate = antennaRepository.findAll().size();

        // Update the antenna
        Antenna updatedAntenna = antennaRepository.findById(antenna.getId()).get();
        // Disconnect from session so that the updates on updatedAntenna are not directly saved in db
        em.detach(updatedAntenna);
        updatedAntenna
            .nome(UPDATED_NOME)
            .inUse(UPDATED_IN_USE);

        restAntennaMockMvc.perform(put("/api/antennas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAntenna)))
            .andExpect(status().isOk());

        // Validate the Antenna in the database
        List<Antenna> antennaList = antennaRepository.findAll();
        assertThat(antennaList).hasSize(databaseSizeBeforeUpdate);
        Antenna testAntenna = antennaList.get(antennaList.size() - 1);
        assertThat(testAntenna.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testAntenna.isInUse()).isEqualTo(UPDATED_IN_USE);
    }

    @Test
    @Transactional
    public void updateNonExistingAntenna() throws Exception {
        int databaseSizeBeforeUpdate = antennaRepository.findAll().size();

        // Create the Antenna

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAntennaMockMvc.perform(put("/api/antennas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(antenna)))
            .andExpect(status().isBadRequest());

        // Validate the Antenna in the database
        List<Antenna> antennaList = antennaRepository.findAll();
        assertThat(antennaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAntenna() throws Exception {
        // Initialize the database
        antennaService.save(antenna);

        int databaseSizeBeforeDelete = antennaRepository.findAll().size();

        // Delete the antenna
        restAntennaMockMvc.perform(delete("/api/antennas/{id}", antenna.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Antenna> antennaList = antennaRepository.findAll();
        assertThat(antennaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
