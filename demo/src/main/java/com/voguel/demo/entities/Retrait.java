package com.voguel.demo.entities;

import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.Date;
@Entity
@NoArgsConstructor
@DiscriminatorValue(value="R")
public class Retrait extends Operation {
    public Retrait(Date date, double montant, Compte cp) {
        super(date,montant,cp);
        super.setNature("Retrait");
        super.setObjet("Retrait");
        super.setSolde((long) (cp.getSolde() - montant));
        super.setUser(cp.getUser());
        // TODO Auto-generated constructor stub
    }

    public Retrait(Date dateTran, double montantTran) {
        super(dateTran, montantTran);
        // TODO Auto-generated constructor stub
    }
}
