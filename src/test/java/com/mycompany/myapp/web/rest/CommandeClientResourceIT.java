package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.CommandeClient;
import com.mycompany.myapp.repository.CommandeClientRepository;
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
 * Integration tests for the {@link CommandeClientResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommandeClientResourceIT {

    private static final String ENTITY_API_URL = "/api/commande-clients";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CommandeClientRepository commandeClientRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommandeClientMockMvc;

    private CommandeClient commandeClient;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommandeClient createEntity(EntityManager em) {
        CommandeClient commandeClient = new CommandeClient();
        return commandeClient;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommandeClient createUpdatedEntity(EntityManager em) {
        CommandeClient commandeClient = new CommandeClient();
        return commandeClient;
    }

    @BeforeEach
    public void initTest() {
        commandeClient = createEntity(em);
    }

    @Test
    @Transactional
    void createCommandeClient() throws Exception {
        int databaseSizeBeforeCreate = commandeClientRepository.findAll().size();
        // Create the CommandeClient
        restCommandeClientMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandeClient))
            )
            .andExpect(status().isCreated());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeCreate + 1);
        CommandeClient testCommandeClient = commandeClientList.get(commandeClientList.size() - 1);
    }

    @Test
    @Transactional
    void createCommandeClientWithExistingId() throws Exception {
        // Create the CommandeClient with an existing ID
        commandeClient.setId(1L);

        int databaseSizeBeforeCreate = commandeClientRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommandeClientMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandeClient))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommandeClients() throws Exception {
        // Initialize the database
        commandeClientRepository.saveAndFlush(commandeClient);

        // Get all the commandeClientList
        restCommandeClientMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commandeClient.getId().intValue())));
    }

    @Test
    @Transactional
    void getCommandeClient() throws Exception {
        // Initialize the database
        commandeClientRepository.saveAndFlush(commandeClient);

        // Get the commandeClient
        restCommandeClientMockMvc
            .perform(get(ENTITY_API_URL_ID, commandeClient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commandeClient.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCommandeClient() throws Exception {
        // Get the commandeClient
        restCommandeClientMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCommandeClient() throws Exception {
        // Initialize the database
        commandeClientRepository.saveAndFlush(commandeClient);

        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();

        // Update the commandeClient
        CommandeClient updatedCommandeClient = commandeClientRepository.findById(commandeClient.getId()).get();
        // Disconnect from session so that the updates on updatedCommandeClient are not directly saved in db
        em.detach(updatedCommandeClient);

        restCommandeClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCommandeClient.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCommandeClient))
            )
            .andExpect(status().isOk());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
        CommandeClient testCommandeClient = commandeClientList.get(commandeClientList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingCommandeClient() throws Exception {
        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();
        commandeClient.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandeClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, commandeClient.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandeClient))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommandeClient() throws Exception {
        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();
        commandeClient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandeClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandeClient))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommandeClient() throws Exception {
        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();
        commandeClient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandeClientMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandeClient)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommandeClientWithPatch() throws Exception {
        // Initialize the database
        commandeClientRepository.saveAndFlush(commandeClient);

        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();

        // Update the commandeClient using partial update
        CommandeClient partialUpdatedCommandeClient = new CommandeClient();
        partialUpdatedCommandeClient.setId(commandeClient.getId());

        restCommandeClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommandeClient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommandeClient))
            )
            .andExpect(status().isOk());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
        CommandeClient testCommandeClient = commandeClientList.get(commandeClientList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateCommandeClientWithPatch() throws Exception {
        // Initialize the database
        commandeClientRepository.saveAndFlush(commandeClient);

        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();

        // Update the commandeClient using partial update
        CommandeClient partialUpdatedCommandeClient = new CommandeClient();
        partialUpdatedCommandeClient.setId(commandeClient.getId());

        restCommandeClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommandeClient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommandeClient))
            )
            .andExpect(status().isOk());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
        CommandeClient testCommandeClient = commandeClientList.get(commandeClientList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingCommandeClient() throws Exception {
        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();
        commandeClient.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandeClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, commandeClient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandeClient))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommandeClient() throws Exception {
        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();
        commandeClient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandeClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandeClient))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommandeClient() throws Exception {
        int databaseSizeBeforeUpdate = commandeClientRepository.findAll().size();
        commandeClient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandeClientMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(commandeClient))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommandeClient in the database
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommandeClient() throws Exception {
        // Initialize the database
        commandeClientRepository.saveAndFlush(commandeClient);

        int databaseSizeBeforeDelete = commandeClientRepository.findAll().size();

        // Delete the commandeClient
        restCommandeClientMockMvc
            .perform(delete(ENTITY_API_URL_ID, commandeClient.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CommandeClient> commandeClientList = commandeClientRepository.findAll();
        assertThat(commandeClientList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
