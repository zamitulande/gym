package com.v1.backend.conditionals;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ConditionalPassword, String> {
    
     private String userType;

    @Override
    public void initialize(ConditionalPassword constraintAnnotation) {
        this.userType = constraintAnnotation.userType();
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if ("COACH".equals(userType)) {
            return password != null && !password.isEmpty();
        } else {
            return true; // Para otros tipos de usuario, se permite contraseña vacía
        }
    }
}
