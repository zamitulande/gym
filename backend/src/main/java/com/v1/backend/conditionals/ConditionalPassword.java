package com.v1.backend.conditionals;

import jakarta.validation.Payload;

public @interface ConditionalPassword {
    
    String message() default "Password is required";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String userType() default "COACH";
}
