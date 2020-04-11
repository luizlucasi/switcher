package com.riodx.switcher.service.impl;

import com.riodx.switcher.service.CommandService;
import com.riodx.switcher.domain.Command;
import com.riodx.switcher.repository.CommandRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Command}.
 */
@Service
@Transactional
public class CommandServiceImpl implements CommandService {

    private final Logger log = LoggerFactory.getLogger(CommandServiceImpl.class);

    private final CommandRepository commandRepository;

    public CommandServiceImpl(CommandRepository commandRepository) {
        this.commandRepository = commandRepository;
    }

    /**
     * Save a command.
     *
     * @param command the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Command save(Command command) {
        log.debug("Request to save Command : {}", command);
        return commandRepository.save(command);
    }

    /**
     * Get all the commands.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Command> findAll() {
        log.debug("Request to get all Commands");
        return commandRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the commands with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Command> findAllWithEagerRelationships(Pageable pageable) {
        return commandRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one command by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Command> findOne(Long id) {
        log.debug("Request to get Command : {}", id);
        return commandRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the command by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Command : {}", id);
        commandRepository.deleteById(id);
    }
}
