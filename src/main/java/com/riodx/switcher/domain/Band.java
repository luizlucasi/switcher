package com.riodx.switcher.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.riodx.switcher.domain.enumeration.BandMeter;

/**
 * A Band.
 */
@Entity
@Table(name = "band")
public class Band implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "band_meter")
    private BandMeter bandMeter;

    @Column(name = "in_use")
    private Boolean inUse;

    @ManyToMany(mappedBy = "bands")
    @JsonIgnore
    private Set<Command> commands = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BandMeter getBandMeter() {
        return bandMeter;
    }

    public Band bandMeter(BandMeter bandMeter) {
        this.bandMeter = bandMeter;
        return this;
    }

    public void setBandMeter(BandMeter bandMeter) {
        this.bandMeter = bandMeter;
    }

    public Boolean isInUse() {
        return inUse;
    }

    public Band inUse(Boolean inUse) {
        this.inUse = inUse;
        return this;
    }

    public void setInUse(Boolean inUse) {
        this.inUse = inUse;
    }

    public Set<Command> getCommands() {
        return commands;
    }

    public Band commands(Set<Command> commands) {
        this.commands = commands;
        return this;
    }

    public Band addCommand(Command command) {
        this.commands.add(command);
        command.getBands().add(this);
        return this;
    }

    public Band removeCommand(Command command) {
        this.commands.remove(command);
        command.getBands().remove(this);
        return this;
    }

    public void setCommands(Set<Command> commands) {
        this.commands = commands;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Band)) {
            return false;
        }
        return id != null && id.equals(((Band) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Band{" +
            "id=" + getId() +
            ", bandMeter='" + getBandMeter() + "'" +
            ", inUse='" + isInUse() + "'" +
            "}";
    }
}
