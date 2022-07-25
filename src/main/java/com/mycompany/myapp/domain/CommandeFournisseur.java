package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CommandeFournisseur.
 */
@Entity
@Table(name = "commande_fournisseur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@DiscriminatorValue("CF")
public class CommandeFournisseur extends Commande {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn( name="idFournisseur" )
    private Fournisseur fournisseur;
    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

   
}
