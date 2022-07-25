package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Magazin.
 */
@Entity
@Table(name = "magazin")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Magazin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom_magazin")
    private String nomMagazin;

    public Set<Stock> getStocks() {
		return stocks;
	}

	public void setStocks(Set<Stock> stocks) {
		this.stocks = stocks;
	}

	public Set<Bti> getBtis() {
		return btis;
	}

	public void setBtis(Set<Bti> btis) {
		this.btis = btis;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public List<Employe> getEmployes() {
		return employes;
	}

	public void setEmployes(List<Employe> employes) {
		this.employes = employes;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Column(name = "adresse_magazin")
    private String adresseMagazin;
    @OneToMany(mappedBy = "magazin")
    Set<Stock> stocks;
    @OneToMany(mappedBy = "magazin")
    Set<Bti> btis;
    // jhipster-needle-entity-add-field - JHipster will add fields here
    @OneToOne
    @JoinColumn(name = "location_id")
    private Location location;
    @OneToMany(mappedBy = "magazin", cascade = CascadeType.ALL)
    private List<Employe> employes ;
    public Long getId() {
        return this.id;
    }

    public Magazin id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomMagazin() {
        return this.nomMagazin;
    }

    public Magazin nomMagazin(String nomMagazin) {
        this.setNomMagazin(nomMagazin);
        return this;
    }

    public void setNomMagazin(String nomMagazin) {
        this.nomMagazin = nomMagazin;
    }

    public String getAdresseMagazin() {
        return this.adresseMagazin;
    }

    public Magazin adresseMagazin(String adresseMagazin) {
        this.setAdresseMagazin(adresseMagazin);
        return this;
    }

    public void setAdresseMagazin(String adresseMagazin) {
        this.adresseMagazin = adresseMagazin;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Magazin)) {
            return false;
        }
        return id != null && id.equals(((Magazin) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Magazin{" +
            "id=" + getId() +
            ", nomMagazin='" + getNomMagazin() + "'" +
            ", adresseMagazin='" + getAdresseMagazin() + "'" +
            "}";
    }
}
