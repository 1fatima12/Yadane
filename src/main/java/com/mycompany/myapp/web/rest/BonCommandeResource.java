package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.BonCommande;
import com.mycompany.myapp.repository.BonCommandeRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.BonCommande}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BonCommandeResource {

    private final Logger log = LoggerFactory.getLogger(BonCommandeResource.class);

    private static final String ENTITY_NAME = "bonCommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BonCommandeRepository bonCommandeRepository;

    public BonCommandeResource(BonCommandeRepository bonCommandeRepository) {
        this.bonCommandeRepository = bonCommandeRepository;
    }

    /**
     * {@code POST  /bon-commandes} : Create a new bonCommande.
     *
     * @param bonCommande the bonCommande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bonCommande, or with status {@code 400 (Bad Request)} if the bonCommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bon-commandes")
    public ResponseEntity<BonCommande> createBonCommande(@RequestBody BonCommande bonCommande) throws URISyntaxException {
        log.debug("REST request to save BonCommande : {}", bonCommande);
        if (bonCommande.getId() != null) {
            throw new BadRequestAlertException("A new bonCommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BonCommande result = bonCommandeRepository.save(bonCommande);
        return ResponseEntity
            .created(new URI("/api/bon-commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bon-commandes/:id} : Updates an existing bonCommande.
     *
     * @param id the id of the bonCommande to save.
     * @param bonCommande the bonCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bonCommande,
     * or with status {@code 400 (Bad Request)} if the bonCommande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bonCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bon-commandes/{id}")
    public ResponseEntity<BonCommande> updateBonCommande(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BonCommande bonCommande
    ) throws URISyntaxException {
        log.debug("REST request to update BonCommande : {}, {}", id, bonCommande);
        if (bonCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bonCommande.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bonCommandeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        // no save call needed as we have no fields that can be updated
        BonCommande result = bonCommande;
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bonCommande.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /bon-commandes/:id} : Partial updates given fields of an existing bonCommande, field will ignore if it is null
     *
     * @param id the id of the bonCommande to save.
     * @param bonCommande the bonCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bonCommande,
     * or with status {@code 400 (Bad Request)} if the bonCommande is not valid,
     * or with status {@code 404 (Not Found)} if the bonCommande is not found,
     * or with status {@code 500 (Internal Server Error)} if the bonCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/bon-commandes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BonCommande> partialUpdateBonCommande(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BonCommande bonCommande
    ) throws URISyntaxException {
        log.debug("REST request to partial update BonCommande partially : {}, {}", id, bonCommande);
        if (bonCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bonCommande.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bonCommandeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BonCommande> result = bonCommandeRepository
            .findById(bonCommande.getId())
            .map(existingBonCommande -> {
                return existingBonCommande;
            })// .map(bonCommandeRepository::save)
        ;

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bonCommande.getId().toString())
        );
    }

    /**
     * {@code GET  /bon-commandes} : get all the bonCommandes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bonCommandes in body.
     */
    @GetMapping("/bon-commandes")
    public List<BonCommande> getAllBonCommandes() {
        log.debug("REST request to get all BonCommandes");
        return bonCommandeRepository.findAll();
    }

    /**
     * {@code GET  /bon-commandes/:id} : get the "id" bonCommande.
     *
     * @param id the id of the bonCommande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bonCommande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bon-commandes/{id}")
    public ResponseEntity<BonCommande> getBonCommande(@PathVariable Long id) {
        log.debug("REST request to get BonCommande : {}", id);
        Optional<BonCommande> bonCommande = bonCommandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonCommande);
    }

    /**
     * {@code DELETE  /bon-commandes/:id} : delete the "id" bonCommande.
     *
     * @param id the id of the bonCommande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bon-commandes/{id}")
    public ResponseEntity<Void> deleteBonCommande(@PathVariable Long id) {
        log.debug("REST request to delete BonCommande : {}", id);
        bonCommandeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
