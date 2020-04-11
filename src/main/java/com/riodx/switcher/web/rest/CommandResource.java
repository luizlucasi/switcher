package com.riodx.switcher.web.rest;

import com.riodx.switcher.domain.Command;
import com.riodx.switcher.service.CommandService;
import com.riodx.switcher.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.riodx.switcher.domain.Command}.
 */
@RestController
@RequestMapping("/api")
public class CommandResource {

    private final Logger log = LoggerFactory.getLogger(CommandResource.class);

    private static final String ENTITY_NAME = "command";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommandService commandService;

    public CommandResource(CommandService commandService) {
        this.commandService = commandService;
    }

    /**
     * {@code POST  /commands} : Create a new command.
     *
     * @param command the command to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new command, or with status {@code 400 (Bad Request)} if the command has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commands")
    public ResponseEntity<Command> createCommand(@Valid @RequestBody Command command) throws URISyntaxException {
        log.debug("REST request to save Command : {}", command);
        if (command.getId() != null) {
            throw new BadRequestAlertException("A new command cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Command result = commandService.save(command);
        return ResponseEntity.created(new URI("/api/commands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commands} : Updates an existing command.
     *
     * @param command the command to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated command,
     * or with status {@code 400 (Bad Request)} if the command is not valid,
     * or with status {@code 500 (Internal Server Error)} if the command couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commands")
    public ResponseEntity<Command> updateCommand(@Valid @RequestBody Command command) throws URISyntaxException {
        log.debug("REST request to update Command : {}", command);
        if (command.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Command result = commandService.save(command);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, command.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /commands} : get all the commands.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commands in body.
     */
    @GetMapping("/commands")
    public List<Command> getAllCommands(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Commands");
        return commandService.findAll();
    }

    /**
     * {@code GET  /commands/:id} : get the "id" command.
     *
     * @param id the id of the command to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the command, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commands/{id}")
    public ResponseEntity<Command> getCommand(@PathVariable Long id) {
        log.debug("REST request to get Command : {}", id);
        Optional<Command> command = commandService.findOne(id);
        return ResponseUtil.wrapOrNotFound(command);
    }

    /**
     * {@code DELETE  /commands/:id} : delete the "id" command.
     *
     * @param id the id of the command to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commands/{id}")
    public ResponseEntity<Void> deleteCommand(@PathVariable Long id) {
        log.debug("REST request to delete Command : {}", id);
        commandService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
