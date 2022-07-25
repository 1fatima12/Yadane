package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@PrimaryKeyJoinColumn(name = "idc")

public class Client extends Personne {

    private static final long serialVersionUID = 1L;

   

    @Column(name = "ice")
    private String ice;
    @OneToMany(mappedBy="client")
    private Set<CommandeClient> commandeclient;
    // jhipster-needle-entity-add-field - JHipster will add fields here

    

    public Set<CommandeClient> getCommandeclient() {
		return commandeclient;
	}

	public void setCommandeclient(Set<CommandeClient> commandeclient) {
		this.commandeclient = commandeclient;
	}

	public String getIce() {
        return this.ice;
    }

    public Client ice(String ice) {
        this.setIce(ice);
        return this;
    }

    public void setIce(String ice) {
        this.ice = ice;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

   
}
