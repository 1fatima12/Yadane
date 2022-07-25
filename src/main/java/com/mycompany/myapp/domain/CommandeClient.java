package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CommandeClient.
 */
@Entity
@Table(name = "commande_client")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@DiscriminatorValue("CC")
public class CommandeClient extends Commande {

    private static final long serialVersionUID = 1L;

   
    @ManyToOne
    @JoinColumn( name="idClient" )
    private Client client;
    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}


    

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

   
    
}
