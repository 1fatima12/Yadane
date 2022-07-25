package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CommandeFournisseur;
import com.mycompany.myapp.repository.CommandeFournisseurRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CommandeFournisseur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CommandeFournisseurResource {

    private final Logger log = LoggerFactory.getLogger(CommandeFournisseurResource.class);

    private static final String ENTITY_NAME = "commandeFournisseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommandeFournisseurRepository commandeFournisseurRepository;

    public CommandeFournisseurResource(CommandeFournisseurRepository commandeFournisseurRepository) {
        this.commandeFournisseurRepository = commandeFournisseurRepository;
    }

    /**
     * {@code POST  /commande-fournisseurs} : Create a new commandeFournisseur.
     *
     * @param commandeFournisseur the commandeFournisseur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commandeFournisseur, or with status {@code 400 (Bad Request)} if the commandeFournisseur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commande-fournisseurs")
    public ResponseEntity<CommandeFournisseur> createCommandeFournisseur(@RequestBody CommandeFournisseur commandeFournisseur)
        throws URISyntaxException {
        log.debug("REST request to save CommandeFournisseur : {}", commandeFournisseur);
        if (commandeFournisseur.getId() != null) {
            throw new BadRequestAlertException("A new commandeFournisseur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommandeFournisseur result = commandeFournisseurRepository.save(commandeFournisseur);
        return ResponseEntity
            .created(new URI("/api/commande-fournisseurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commande-fournisseurs/:id} : Updates an existing commandeFournisseur.
     *
     * @param id the id of the commandeFournisseur to save.
     * @param commandeFournisseur the commandeFournisseur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commandeFournisseur,
     * or with status {@code 400 (Bad Request)} if the commandeFournisseur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commandeFournisseur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commande-fournisseurs/{id}")
    public ResponseEntity<CommandeFournisseur> updateCommandeFournisseur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommandeFournisseur commandeFournisseur
    ) throws URISyntaxException {
        log.debug("REST request to update CommandeFournisseur : {}, {}", id, commandeFournisseur);
        if (commandeFournisseur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commandeFournisseur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commandeFournisseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        // no save call needed as we have no fields that can be updated
        CommandeFournisseur result = commandeFournisseur;
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commandeFournisseur.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /commande-fournisseurs/:id} : Partial updates given fields of an existing commandeFournisseur, field will ignore if it is null
     *
     * @param id the id of the commandeFournisseur to save.
     * @param commandeFournisseur the commandeFournisseur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commandeFournisseur,
     * or with status {@code 400 (Bad Request)} if the commandeFournisseur is not valid,
     * or with status {@code 404 (Not Found)} if the commandeFournisseur is not found,
     * or with status {@code 500 (Internal Server Error)} if the commandeFournisseur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/commande-fournisseurs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CommandeFournisseur> partialUpdateCommandeFournisseur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommandeFournisseur commandeFournisseur
    ) throws URISyntaxException {
        log.debug("REST request to partial update CommandeFournisseur partially : {}, {}", id, commandeFournisseur);
        if (commandeFournisseur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commandeFournisseur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commandeFournisseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CommandeFournisseur> result = commandeFournisseurRepository
            .findById(commandeFournisseur.getId())
            .map(existingCommandeFournisseur -> {
                return existingCommandeFournisseur;
            })// .map(commandeFournisseurRepository::save)
        ;

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commandeFournisseur.getId().toString())
        );
    }

    /**
     * {@code GET  /commande-fournisseurs} : get all the commandeFournisseurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commandeFournisseurs in body.
     */
    @GetMapping("/commande-fournisseurs")
    public List<CommandeFournisseur> getAllCommandeFournisseurs() {
        log.debug("REST request to get all CommandeFournisseurs");
        return commandeFournisseurRepository.findAll();
    }

    /**
     * {@code GET  /commande-fournisseurs/:id} : get the "id" commandeFournisseur.
     *
     * @param id the id of the commandeFournisseur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commandeFournisseur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commande-fournisseurs/{id}")
    public ResponseEntity<CommandeFournisseur> getCommandeFournisseur(@PathVariable Long id) {
        log.debug("REST request to get CommandeFournisseur : {}", id);
        Optional<CommandeFournisseur> commandeFournisseur = commandeFournisseurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(commandeFournisseur);
    }

    /**
     * {@code DELETE  /commande-fournisseurs/:id} : delete the "id" commandeFournisseur.
     *
     * @param id the id of the commandeFournisseur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commande-fournisseurs/{id}")
    public ResponseEntity<Void> deleteCommandeFournisseur(@PathVariable Long id) {
        log.debug("REST request to delete CommandeFournisseur : {}", id);
        commandeFournisseurRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
