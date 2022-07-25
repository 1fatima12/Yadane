package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Personne;
import com.mycompany.myapp.repository.PersonneRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Personne}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PersonneResource {

    private final Logger log = LoggerFactory.getLogger(PersonneResource.class);

    private static final String ENTITY_NAME = "personne";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonneRepository personneRepository;

    public PersonneResource(PersonneRepository personneRepository) {
        this.personneRepository = personneRepository;
    }

    /**
     * {@code POST  /personnes} : Create a new personne.
     *
     * @param personne the personne to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personne, or with status {@code 400 (Bad Request)} if the personne has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/personnes")
    public ResponseEntity<Personne> createPersonne(@RequestBody Personne personne) throws URISyntaxException {
        log.debug("REST request to save Personne : {}", personne);
        if (personne.getId() != null) {
            throw new BadRequestAlertException("A new personne cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Personne result = personneRepository.save(personne);
        return ResponseEntity
            .created(new URI("/api/personnes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /personnes/:id} : Updates an existing personne.
     *
     * @param id the id of the personne to save.
     * @param personne the personne to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personne,
     * or with status {@code 400 (Bad Request)} if the personne is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personne couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/personnes/{id}")
    public ResponseEntity<Personne> updatePersonne(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Personne personne
    ) throws URISyntaxException {
        log.debug("REST request to update Personne : {}, {}", id, personne);
        if (personne.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personne.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personneRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Personne result = personneRepository.save(personne);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personne.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /personnes/:id} : Partial updates given fields of an existing personne, field will ignore if it is null
     *
     * @param id the id of the personne to save.
     * @param personne the personne to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personne,
     * or with status {@code 400 (Bad Request)} if the personne is not valid,
     * or with status {@code 404 (Not Found)} if the personne is not found,
     * or with status {@code 500 (Internal Server Error)} if the personne couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/personnes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Personne> partialUpdatePersonne(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Personne personne
    ) throws URISyntaxException {
        log.debug("REST request to partial update Personne partially : {}, {}", id, personne);
        if (personne.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personne.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personneRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Personne> result = personneRepository
            .findById(personne.getId())
            .map(existingPersonne -> {
                if (personne.getNom() != null) {
                    existingPersonne.setNom(personne.getNom());
                }
                if (personne.getPrenom() != null) {
                    existingPersonne.setPrenom(personne.getPrenom());
                }
                if (personne.getTelephone() != null) {
                    existingPersonne.setTelephone(personne.getTelephone());
                }
                if (personne.getEmail() != null) {
                    existingPersonne.setEmail(personne.getEmail());
                }
                if (personne.getAdresse() != null) {
                    existingPersonne.setAdresse(personne.getAdresse());
                }
                if (personne.getAge() != null) {
                    existingPersonne.setAge(personne.getAge());
                }
                if (personne.getPhoto() != null) {
                    existingPersonne.setPhoto(personne.getPhoto());
                }
                if (personne.getPhotoContentType() != null) {
                    existingPersonne.setPhotoContentType(personne.getPhotoContentType());
                }

                return existingPersonne;
            })
            .map(personneRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personne.getId().toString())
        );
    }

    /**
     * {@code GET  /personnes} : get all the personnes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personnes in body.
     */
    @GetMapping("/personnes")
    public List<Personne> getAllPersonnes() {
        log.debug("REST request to get all Personnes");
        return personneRepository.findAll();
    }

    /**
     * {@code GET  /personnes/:id} : get the "id" personne.
     *
     * @param id the id of the personne to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personne, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/personnes/{id}")
    public ResponseEntity<Personne> getPersonne(@PathVariable Long id) {
        log.debug("REST request to get Personne : {}", id);
        Optional<Personne> personne = personneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(personne);
    }

    /**
     * {@code DELETE  /personnes/:id} : delete the "id" personne.
     *
     * @param id the id of the personne to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/personnes/{id}")
    public ResponseEntity<Void> deletePersonne(@PathVariable Long id) {
        log.debug("REST request to delete Personne : {}", id);
        personneRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
