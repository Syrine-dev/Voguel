package com.voguel.demo.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Operation")
public class Operation implements Serializable {
    @Id
    @Field("numOperation")
    @JsonIgnore
    private Long numOperation;
    private Date dateTran;
    private String objet;
    private String nature;
    private double montantTran;
    private Long solde;
    @OneToOne
    @JoinColumn(name = "user")
    private User user;
  /*  @ManyToOne
    @JoinColumn(name = "compte")
    private Compte compte;*/
    private String codeCompte ;
   
    public Operation(Date dateTran, double montantTran) {
        super();
        this.dateTran = dateTran;
        this.montantTran = montantTran;
    }

    public Operation(Date dateTran, double montantTran,Compte compte) {
        super();
        this.dateTran = dateTran;
        this.montantTran = montantTran;
        this.codeCompte = compte.getCodeCompte();
    }
}
