package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Bti.
 */
@Entity
@Table(name = "bti")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bti implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "num_ordre")
    private Long numOrdre;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "qte")
    private Integer qte;
    @ManyToOne
    @JoinColumn(name = "produit_id")
    Produit produit;
    public Produit getProduit() {
		return produit;
	}

	public void setProduit(Produit produit) {
		this.produit = produit;
	}

	public Magazin getMagazin() {
		return magazin;
	}

	public void setMagazin(Magazin magazin) {
		this.magazin = magazin;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@ManyToOne
    @JoinColumn(name = "magazin_id")
    Magazin magazin;
    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Bti id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumOrdre() {
        return this.numOrdre;
    }

    public Bti numOrdre(Long numOrdre) {
        this.setNumOrdre(numOrdre);
        return this;
    }

    public void setNumOrdre(Long numOrdre) {
        this.numOrdre = numOrdre;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Bti date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getQte() {
        return this.qte;
    }

    public Bti qte(Integer qte) {
        this.setQte(qte);
        return this;
    }

    public void setQte(Integer qte) {
        this.qte = qte;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bti)) {
            return false;
        }
        return id != null && id.equals(((Bti) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bti{" +
            "id=" + getId() +
            ", numOrdre=" + getNumOrdre() +
            ", date='" + getDate() + "'" +
            ", qte=" + getQte() +
            "}";
    }
}
