package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Arrivage.
 */
@Entity
@Table(name = "arrivage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Arrivage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "date_arrivage")
    private LocalDate dateArrivage;

    @Column(name = "prix_achat")
    private Float prixAchat;
    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    Fournisseur fournisseur;
    @ManyToOne
    @JoinColumn(name = "produit_id")
    Produit produits;








    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Arrivage id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateArrivage() {
        return this.dateArrivage;
    }

    public Arrivage dateArrivage(LocalDate dateArrivage) {
        this.setDateArrivage(dateArrivage);
        return this;
    }

    public void setDateArrivage(LocalDate dateArrivage) {
        this.dateArrivage = dateArrivage;
    }

    public Float getPrixAchat() {
        return this.prixAchat;
    }

    public Arrivage prixAchat(Float prixAchat) {
        this.setPrixAchat(prixAchat);
        return this;
    }

    public void setPrixAchat(Float prixAchat) {
        this.prixAchat = prixAchat;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Arrivage)) {
            return false;
        }
        return id != null && id.equals(((Arrivage) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Arrivage{" +
            "id=" + getId() +
            ", dateArrivage='" + getDateArrivage() + "'" +
            ", prixAchat=" + getPrixAchat() +
            "}";
    }
}
