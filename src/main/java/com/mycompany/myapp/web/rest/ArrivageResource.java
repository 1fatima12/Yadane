package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Arrivage;
import com.mycompany.myapp.repository.ArrivageRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Arrivage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ArrivageResource {

    private final Logger log = LoggerFactory.getLogger(ArrivageResource.class);

    private static final String ENTITY_NAME = "arrivage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArrivageRepository arrivageRepository;

    public ArrivageResource(ArrivageRepository arrivageRepository) {
        this.arrivageRepository = arrivageRepository;
    }

    /**
     * {@code POST  /arrivages} : Create a new arrivage.
     *
     * @param arrivage the arrivage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new arrivage, or with status {@code 400 (Bad Request)} if the arrivage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/arrivages")
    public ResponseEntity<Arrivage> createArrivage(@RequestBody Arrivage arrivage) throws URISyntaxException {
        log.debug("REST request to save Arrivage : {}", arrivage);
        if (arrivage.getId() != null) {
            throw new BadRequestAlertException("A new arrivage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Arrivage result = arrivageRepository.save(arrivage);
        return ResponseEntity
            .created(new URI("/api/arrivages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /arrivages/:id} : Updates an existing arrivage.
     *
     * @param id the id of the arrivage to save.
     * @param arrivage the arrivage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated arrivage,
     * or with status {@code 400 (Bad Request)} if the arrivage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the arrivage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/arrivages/{id}")
    public ResponseEntity<Arrivage> updateArrivage(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Arrivage arrivage
    ) throws URISyntaxException {
        log.debug("REST request to update Arrivage : {}, {}", id, arrivage);
        if (arrivage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, arrivage.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!arrivageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Arrivage result = arrivageRepository.save(arrivage);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, arrivage.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /arrivages/:id} : Partial updates given fields of an existing arrivage, field will ignore if it is null
     *
     * @param id the id of the arrivage to save.
     * @param arrivage the arrivage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated arrivage,
     * or with status {@code 400 (Bad Request)} if the arrivage is not valid,
     * or with status {@code 404 (Not Found)} if the arrivage is not found,
     * or with status {@code 500 (Internal Server Error)} if the arrivage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/arrivages/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Arrivage> partialUpdateArrivage(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Arrivage arrivage
    ) throws URISyntaxException {
        log.debug("REST request to partial update Arrivage partially : {}, {}", id, arrivage);
        if (arrivage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, arrivage.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!arrivageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Arrivage> result = arrivageRepository
            .findById(arrivage.getId())
            .map(existingArrivage -> {
                if (arrivage.getDateArrivage() != null) {
                    existingArrivage.setDateArrivage(arrivage.getDateArrivage());
                }
                if (arrivage.getPrixAchat() != null) {
                    existingArrivage.setPrixAchat(arrivage.getPrixAchat());
                }

                return existingArrivage;
            })
            .map(arrivageRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, arrivage.getId().toString())
        );
    }

    /**
     * {@code GET  /arrivages} : get all the arrivages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of arrivages in body.
     */
    @GetMapping("/arrivages")
    public List<Arrivage> getAllArrivages() {
        log.debug("REST request to get all Arrivages");
        return arrivageRepository.findAll();
    }

    /**
     * {@code GET  /arrivages/:id} : get the "id" arrivage.
     *
     * @param id the id of the arrivage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the arrivage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/arrivages/{id}")
    public ResponseEntity<Arrivage> getArrivage(@PathVariable Long id) {
        log.debug("REST request to get Arrivage : {}", id);
        Optional<Arrivage> arrivage = arrivageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(arrivage);
    }

    /**
     * {@code DELETE  /arrivages/:id} : delete the "id" arrivage.
     *
     * @param id the id of the arrivage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/arrivages/{id}")
    public ResponseEntity<Void> deleteArrivage(@PathVariable Long id) {
        log.debug("REST request to delete Arrivage : {}", id);
        arrivageRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
