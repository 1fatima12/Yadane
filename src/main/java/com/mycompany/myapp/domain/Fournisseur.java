package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Fournisseur.
 */
@Entity
@Table(name = "fournisseur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@PrimaryKeyJoinColumn(name = "idF")

public class Fournisseur extends Personne{

    private static final long serialVersionUID = 1L;

  

    @Column(name = "entreprise")
    private String entreprise;

    @Column(name = "fax")
    private String fax;

    @Column(name = "ice")
    private String ice;
 
   @OneToMany(mappedBy="fournisseur")
   private Set<CommandeFournisseur> commandefournisseur;
   @OneToMany(mappedBy = "fournisseur")
   private Set<Arrivage> arrivages;
    // jhipster-needle-entity-add-field - JHipster will add fields here

 
 
    public Set<CommandeFournisseur> getCommandefournisseur() {
	return commandefournisseur;
}

public void setCommandefournisseur(Set<CommandeFournisseur> commandefournisseur) {
	this.commandefournisseur = commandefournisseur;
}



	public String getEntreprise() {
        return this.entreprise;
    }

    public Fournisseur entreprise(String entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public String getFax() {
        return this.fax;
    }

    public Fournisseur fax(String fax) {
        this.setFax(fax);
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getIce() {
        return this.ice;
    }

    public Fournisseur ice(String ice) {
        this.setIce(ice);
        return this;
    }

    public void setIce(String ice) {
        this.ice = ice;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

  
}
