package com.voguel.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Random;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "User")
public class User implements Serializable{
    @Id
    @Field("id")
    @JsonIgnore
    private Long id;
    private String nom;
    private String prenom;
    private String mail;
    private String tel;
    private String type;
    private String motDePasse;
    private int solde ;
    private String codeCompte ;

    public User(String nom, String prenom, String mail, String tel, String type, String motDePasse, String codeCompte ) {
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.tel = tel;
        this.type = type;
        this.motDePasse = motDePasse;
        this.solde = 0 ;
        this.codeCompte = codeCompte;
    }



}
