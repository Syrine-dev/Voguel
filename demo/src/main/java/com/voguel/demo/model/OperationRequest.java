package com.voguel.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OperationRequest {
    String typeOperation;
    String codeCompte1;
    double montant;
    String codeCompte2 ;
}
