package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "num_prod")
    private Long numProd;

    @Column(name = "nom_prod")
    private String nomProd;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "prix_vente")
    private Float prixVente;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;
    @ManyToOne
    private Categorie categorie;
    @ManyToOne
    private Marque marque;
    @OneToMany(mappedBy = "produit")
    Set<Stock> stocks;
    @OneToMany(mappedBy = "magazin")
    Set<Bti> btis;
   
//    @ManyToOne
//    private Fournisseur fournisseur;
    @OneToMany (mappedBy="produit")
    private Set<BonCommande> boncommande;
    @OneToMany(mappedBy = "produits")
    private Set<Arrivage> arrivages;
    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Categorie getCategorie() {
		return categorie;
	}

	public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}

	public Marque getMarque() {
		return marque;
	}

	public void setMarque(Marque marque) {
		this.marque = marque;
	}

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

	

	

	public Set<BonCommande> getBoncommande() {
		return boncommande;
	}

	public void setBoncommande(Set<BonCommande> boncommande) {
		this.boncommande = boncommande;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getId() {
        return this.id;
    }

    public Produit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumProd() {
        return this.numProd;
    }

    public Produit numProd(Long numProd) {
        this.setNumProd(numProd);
        return this;
    }

    public void setNumProd(Long numProd) {
        this.numProd = numProd;
    }

    public String getNomProd() {
        return this.nomProd;
    }

    public Produit nomProd(String nomProd) {
        this.setNomProd(nomProd);
        return this;
    }

    public void setNomProd(String nomProd) {
        this.nomProd = nomProd;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Produit status(Boolean status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Float getPrixVente() {
        return this.prixVente;
    }

    public Produit prixVente(Float prixVente) {
        this.setPrixVente(prixVente);
        return this;
    }

    public void setPrixVente(Float prixVente) {
        this.prixVente = prixVente;
    }

    public byte[] getImage() {
        return this.image;
    }

    public Produit image(byte[] image) {
        this.setImage(image);
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return this.imageContentType;
    }

    public Produit imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", numProd=" + getNumProd() +
            ", nomProd='" + getNomProd() + "'" +
            ", status='" + getStatus() + "'" +
            ", prixVente=" + getPrixVente() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
