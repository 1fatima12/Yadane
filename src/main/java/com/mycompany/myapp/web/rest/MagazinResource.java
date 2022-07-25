package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Magazin;
import com.mycompany.myapp.repository.MagazinRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Magazin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MagazinResource {

    private final Logger log = LoggerFactory.getLogger(MagazinResource.class);

    private static final String ENTITY_NAME = "magazin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MagazinRepository magazinRepository;

    public MagazinResource(MagazinRepository magazinRepository) {
        this.magazinRepository = magazinRepository;
    }

    /**
     * {@code POST  /magazins} : Create a new magazin.
     *
     * @param magazin the magazin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new magazin, or with status {@code 400 (Bad Request)} if the magazin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/magazins")
    public ResponseEntity<Magazin> createMagazin(@RequestBody Magazin magazin) throws URISyntaxException {
        log.debug("REST request to save Magazin : {}", magazin);
        if (magazin.getId() != null) {
            throw new BadRequestAlertException("A new magazin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Magazin result = magazinRepository.save(magazin);
        return ResponseEntity
            .created(new URI("/api/magazins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /magazins/:id} : Updates an existing magazin.
     *
     * @param id the id of the magazin to save.
     * @param magazin the magazin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated magazin,
     * or with status {@code 400 (Bad Request)} if the magazin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the magazin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/magazins/{id}")
    public ResponseEntity<Magazin> updateMagazin(@PathVariable(value = "id", required = false) final Long id, @RequestBody Magazin magazin)
        throws URISyntaxException {
        log.debug("REST request to update Magazin : {}, {}", id, magazin);
        if (magazin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, magazin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!magazinRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Magazin result = magazinRepository.save(magazin);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, magazin.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /magazins/:id} : Partial updates given fields of an existing magazin, field will ignore if it is null
     *
     * @param id the id of the magazin to save.
     * @param magazin the magazin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated magazin,
     * or with status {@code 400 (Bad Request)} if the magazin is not valid,
     * or with status {@code 404 (Not Found)} if the magazin is not found,
     * or with status {@code 500 (Internal Server Error)} if the magazin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/magazins/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Magazin> partialUpdateMagazin(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Magazin magazin
    ) throws URISyntaxException {
        log.debug("REST request to partial update Magazin partially : {}, {}", id, magazin);
        if (magazin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, magazin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!magazinRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Magazin> result = magazinRepository
            .findById(magazin.getId())
            .map(existingMagazin -> {
                if (magazin.getNomMagazin() != null) {
                    existingMagazin.setNomMagazin(magazin.getNomMagazin());
                }
                if (magazin.getAdresseMagazin() != null) {
                    existingMagazin.setAdresseMagazin(magazin.getAdresseMagazin());
                }

                return existingMagazin;
            })
            .map(magazinRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, magazin.getId().toString())
        );
    }

    /**
     * {@code GET  /magazins} : get all the magazins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of magazins in body.
     */
    @GetMapping("/magazins")
    public List<Magazin> getAllMagazins() {
        log.debug("REST request to get all Magazins");
        return magazinRepository.findAll();
    }

    /**
     * {@code GET  /magazins/:id} : get the "id" magazin.
     *
     * @param id the id of the magazin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the magazin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/magazins/{id}")
    public ResponseEntity<Magazin> getMagazin(@PathVariable Long id) {
        log.debug("REST request to get Magazin : {}", id);
        Optional<Magazin> magazin = magazinRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(magazin);
    }

    /**
     * {@code DELETE  /magazins/:id} : delete the "id" magazin.
     *
     * @param id the id of the magazin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/magazins/{id}")
    public ResponseEntity<Void> deleteMagazin(@PathVariable Long id) {
        log.debug("REST request to delete Magazin : {}", id);
        magazinRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
