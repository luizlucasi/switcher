package com.riodx.switcher.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.riodx.switcher.domain.enumeration.BandMeter;

/**
 * A Antenna.
 */
@Entity
@Table(name = "antenna")
public class Antenna implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "in_use")
    private Boolean inUse;

    @Enumerated(EnumType.STRING)
    @Column(name = "band_meter")
    private BandMeter bandMeter;

    @ManyToOne
    @JsonIgnoreProperties("antennas")
    private Band band;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Antenna nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Boolean isInUse() {
        return inUse;
    }

    public Antenna inUse(Boolean inUse) {
        this.inUse = inUse;
        return this;
    }

    public void setInUse(Boolean inUse) {
        this.inUse = inUse;
    }

    public BandMeter getBandMeter() {
        return bandMeter;
    }

    public Antenna bandMeter(BandMeter bandMeter) {
        this.bandMeter = bandMeter;
        return this;
    }

    public void setBandMeter(BandMeter bandMeter) {
        this.bandMeter = bandMeter;
    }

    public Band getBand() {
        return band;
    }

    public Antenna band(Band band) {
        this.band = band;
        return this;
    }

    public void setBand(Band band) {
        this.band = band;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Antenna)) {
            return false;
        }
        return id != null && id.equals(((Antenna) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Antenna{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", inUse='" + isInUse() + "'" +
            ", bandMeter='" + getBandMeter() + "'" +
            "}";
    }
}
