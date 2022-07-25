package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Employe.
 */
@Entity
@Table(name = "employe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@PrimaryKeyJoinColumn(name = "ifE")

public class Employe extends Personne {

    private static final long serialVersionUID = 1L;

   
    @Column(name = "poste")
    private String poste;

    @Column(name = "salaire")
    private Float salaire;

    @Column(name = "date_embauche")
    private LocalDate dateEmbauche;
    public Magazin getMagazin() {
		return magazin;
	}

	public void setMagazin(Magazin magazin) {
		this.magazin = magazin;
	}

	@ManyToOne
    private Magazin magazin;
    // jhipster-needle-entity-add-field - JHipster will add fields here

   

    

    public String getPoste() {
        return this.poste;
    }

    public Employe poste(String poste) {
        this.setPoste(poste);
        return this;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public Float getSalaire() {
        return this.salaire;
    }

    public Employe salaire(Float salaire) {
        this.setSalaire(salaire);
        return this;
    }

    public void setSalaire(Float salaire) {
        this.salaire = salaire;
    }

    public LocalDate getDateEmbauche() {
        return this.dateEmbauche;
    }

    public Employe dateEmbauche(LocalDate dateEmbauche) {
        this.setDateEmbauche(dateEmbauche);
        return this;
    }

    public void setDateEmbauche(LocalDate dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

   

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

   
}
