package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Bti;
import com.mycompany.myapp.repository.BtiRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Bti}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BtiResource {

    private final Logger log = LoggerFactory.getLogger(BtiResource.class);

    private static final String ENTITY_NAME = "bti";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BtiRepository btiRepository;

    public BtiResource(BtiRepository btiRepository) {
        this.btiRepository = btiRepository;
    }

    /**
     * {@code POST  /btis} : Create a new bti.
     *
     * @param bti the bti to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bti, or with status {@code 400 (Bad Request)} if the bti has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/btis")
    public ResponseEntity<Bti> createBti(@RequestBody Bti bti) throws URISyntaxException {
        log.debug("REST request to save Bti : {}", bti);
        if (bti.getId() != null) {
            throw new BadRequestAlertException("A new bti cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bti result = btiRepository.save(bti);
        return ResponseEntity
            .created(new URI("/api/btis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /btis/:id} : Updates an existing bti.
     *
     * @param id the id of the bti to save.
     * @param bti the bti to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bti,
     * or with status {@code 400 (Bad Request)} if the bti is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bti couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/btis/{id}")
    public ResponseEntity<Bti> updateBti(@PathVariable(value = "id", required = false) final Long id, @RequestBody Bti bti)
        throws URISyntaxException {
        log.debug("REST request to update Bti : {}, {}", id, bti);
        if (bti.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bti.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!btiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Bti result = btiRepository.save(bti);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bti.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /btis/:id} : Partial updates given fields of an existing bti, field will ignore if it is null
     *
     * @param id the id of the bti to save.
     * @param bti the bti to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bti,
     * or with status {@code 400 (Bad Request)} if the bti is not valid,
     * or with status {@code 404 (Not Found)} if the bti is not found,
     * or with status {@code 500 (Internal Server Error)} if the bti couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/btis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Bti> partialUpdateBti(@PathVariable(value = "id", required = false) final Long id, @RequestBody Bti bti)
        throws URISyntaxException {
        log.debug("REST request to partial update Bti partially : {}, {}", id, bti);
        if (bti.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bti.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!btiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Bti> result = btiRepository
            .findById(bti.getId())
            .map(existingBti -> {
                if (bti.getNumOrdre() != null) {
                    existingBti.setNumOrdre(bti.getNumOrdre());
                }
                if (bti.getDate() != null) {
                    existingBti.setDate(bti.getDate());
                }
                if (bti.getQte() != null) {
                    existingBti.setQte(bti.getQte());
                }

                return existingBti;
            })
            .map(btiRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bti.getId().toString())
        );
    }

    /**
     * {@code GET  /btis} : get all the btis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of btis in body.
     */
    @GetMapping("/btis")
    public List<Bti> getAllBtis() {
        log.debug("REST request to get all Btis");
        return btiRepository.findAll();
    }

    /**
     * {@code GET  /btis/:id} : get the "id" bti.
     *
     * @param id the id of the bti to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bti, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/btis/{id}")
    public ResponseEntity<Bti> getBti(@PathVariable Long id) {
        log.debug("REST request to get Bti : {}", id);
        Optional<Bti> bti = btiRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bti);
    }

    /**
     * {@code DELETE  /btis/:id} : delete the "id" bti.
     *
     * @param id the id of the bti to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/btis/{id}")
    public ResponseEntity<Void> deleteBti(@PathVariable Long id) {
        log.debug("REST request to delete Bti : {}", id);
        btiRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
