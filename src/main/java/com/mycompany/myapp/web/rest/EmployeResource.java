package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Employe;
import com.mycompany.myapp.repository.EmployeRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Employe}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmployeResource {

    private final Logger log = LoggerFactory.getLogger(EmployeResource.class);

    private static final String ENTITY_NAME = "employe";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeRepository employeRepository;

    public EmployeResource(EmployeRepository employeRepository) {
        this.employeRepository = employeRepository;
    }

    /**
     * {@code POST  /employes} : Create a new employe.
     *
     * @param employe the employe to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employe, or with status {@code 400 (Bad Request)} if the employe has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employes")
    public ResponseEntity<Employe> createEmploye(@RequestBody Employe employe) throws URISyntaxException {
        log.debug("REST request to save Employe : {}", employe);
        if (employe.getId() != null) {
            throw new BadRequestAlertException("A new employe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Employe result = employeRepository.save(employe);
        return ResponseEntity
            .created(new URI("/api/employes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employes/:id} : Updates an existing employe.
     *
     * @param id the id of the employe to save.
     * @param employe the employe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employe,
     * or with status {@code 400 (Bad Request)} if the employe is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employes/{id}")
    public ResponseEntity<Employe> updateEmploye(@PathVariable(value = "id", required = false) final Long id, @RequestBody Employe employe)
        throws URISyntaxException {
        log.debug("REST request to update Employe : {}, {}", id, employe);
        if (employe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, employe.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!employeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Employe result = employeRepository.save(employe);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employe.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /employes/:id} : Partial updates given fields of an existing employe, field will ignore if it is null
     *
     * @param id the id of the employe to save.
     * @param employe the employe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employe,
     * or with status {@code 400 (Bad Request)} if the employe is not valid,
     * or with status {@code 404 (Not Found)} if the employe is not found,
     * or with status {@code 500 (Internal Server Error)} if the employe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/employes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Employe> partialUpdateEmploye(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Employe employe
    ) throws URISyntaxException {
        log.debug("REST request to partial update Employe partially : {}, {}", id, employe);
        if (employe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, employe.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!employeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Employe> result = employeRepository
            .findById(employe.getId())
            .map(existingEmploye -> {
                if (employe.getPoste() != null) {
                    existingEmploye.setPoste(employe.getPoste());
                }
                if (employe.getSalaire() != null) {
                    existingEmploye.setSalaire(employe.getSalaire());
                }
                if (employe.getDateEmbauche() != null) {
                    existingEmploye.setDateEmbauche(employe.getDateEmbauche());
                }

                return existingEmploye;
            })
            .map(employeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employe.getId().toString())
        );
    }

    /**
     * {@code GET  /employes} : get all the employes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employes in body.
     */
    @GetMapping("/employes")
    public List<Employe> getAllEmployes() {
        log.debug("REST request to get all Employes");
        return employeRepository.findAll();
    }

    /**
     * {@code GET  /employes/:id} : get the "id" employe.
     *
     * @param id the id of the employe to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employe, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employes/{id}")
    public ResponseEntity<Employe> getEmploye(@PathVariable Long id) {
        log.debug("REST request to get Employe : {}", id);
        Optional<Employe> employe = employeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employe);
    }

    /**
     * {@code DELETE  /employes/:id} : delete the "id" employe.
     *
     * @param id the id of the employe to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employes/{id}")
    public ResponseEntity<Void> deleteEmploye(@PathVariable Long id) {
        log.debug("REST request to delete Employe : {}", id);
        employeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
