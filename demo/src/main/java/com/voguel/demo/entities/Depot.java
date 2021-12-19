package com.voguel.demo.entities;

import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.Date;

@Entity
@NoArgsConstructor
@DiscriminatorValue("D")
public class Depot extends Operation {
    public Depot(Date date, double montant, Compte cp) {
        super(date,montant,cp);
        super.setNature("Depot");
        super.setObjet("Depot");
        super.setSolde((long) (cp.getSolde() + montant));
        super.setUser(cp.getUser());
        // TODO Auto-generated constructor stub
    }

    public Depot(Date dateTran, double montantTran) {
        super(dateTran, montantTran);
        // TODO Auto-generated constructor stub
    }
}

