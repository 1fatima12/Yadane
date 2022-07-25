package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.BonCommande;
import com.mycompany.myapp.repository.BonCommandeRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link BonCommandeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BonCommandeResourceIT {

    private static final String ENTITY_API_URL = "/api/bon-commandes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BonCommandeRepository bonCommandeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBonCommandeMockMvc;

    private BonCommande bonCommande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BonCommande createEntity(EntityManager em) {
        BonCommande bonCommande = new BonCommande();
        return bonCommande;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BonCommande createUpdatedEntity(EntityManager em) {
        BonCommande bonCommande = new BonCommande();
        return bonCommande;
    }

    @BeforeEach
    public void initTest() {
        bonCommande = createEntity(em);
    }

    @Test
    @Transactional
    void createBonCommande() throws Exception {
        int databaseSizeBeforeCreate = bonCommandeRepository.findAll().size();
        // Create the BonCommande
        restBonCommandeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bonCommande)))
            .andExpect(status().isCreated());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeCreate + 1);
        BonCommande testBonCommande = bonCommandeList.get(bonCommandeList.size() - 1);
    }

    @Test
    @Transactional
    void createBonCommandeWithExistingId() throws Exception {
        // Create the BonCommande with an existing ID
        bonCommande.setId(1L);

        int databaseSizeBeforeCreate = bonCommandeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBonCommandeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bonCommande)))
            .andExpect(status().isBadRequest());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBonCommandes() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        // Get all the bonCommandeList
        restBonCommandeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bonCommande.getId().intValue())));
    }

    @Test
    @Transactional
    void getBonCommande() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        // Get the bonCommande
        restBonCommandeMockMvc
            .perform(get(ENTITY_API_URL_ID, bonCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bonCommande.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingBonCommande() throws Exception {
        // Get the bonCommande
        restBonCommandeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewBonCommande() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();

        // Update the bonCommande
        BonCommande updatedBonCommande = bonCommandeRepository.findById(bonCommande.getId()).get();
        // Disconnect from session so that the updates on updatedBonCommande are not directly saved in db
        em.detach(updatedBonCommande);

        restBonCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBonCommande.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBonCommande))
            )
            .andExpect(status().isOk());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
        BonCommande testBonCommande = bonCommandeList.get(bonCommandeList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingBonCommande() throws Exception {
        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();
        bonCommande.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBonCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bonCommande.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bonCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBonCommande() throws Exception {
        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();
        bonCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBonCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bonCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBonCommande() throws Exception {
        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();
        bonCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBonCommandeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bonCommande)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBonCommandeWithPatch() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();

        // Update the bonCommande using partial update
        BonCommande partialUpdatedBonCommande = new BonCommande();
        partialUpdatedBonCommande.setId(bonCommande.getId());

        restBonCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBonCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBonCommande))
            )
            .andExpect(status().isOk());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
        BonCommande testBonCommande = bonCommandeList.get(bonCommandeList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateBonCommandeWithPatch() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();

        // Update the bonCommande using partial update
        BonCommande partialUpdatedBonCommande = new BonCommande();
        partialUpdatedBonCommande.setId(bonCommande.getId());

        restBonCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBonCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBonCommande))
            )
            .andExpect(status().isOk());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
        BonCommande testBonCommande = bonCommandeList.get(bonCommandeList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingBonCommande() throws Exception {
        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();
        bonCommande.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBonCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bonCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bonCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBonCommande() throws Exception {
        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();
        bonCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBonCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bonCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBonCommande() throws Exception {
        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();
        bonCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBonCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(bonCommande))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBonCommande() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        int databaseSizeBeforeDelete = bonCommandeRepository.findAll().size();

        // Delete the bonCommande
        restBonCommandeMockMvc
            .perform(delete(ENTITY_API_URL_ID, bonCommande.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
