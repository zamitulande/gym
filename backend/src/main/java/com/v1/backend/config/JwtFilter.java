package com.v1.backend.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.v1.backend.service.JwtService;

import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

     private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

     @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                    @NonNull HttpServletResponse response, 
                                    @NonNull FilterChain filterChain) 
                                    throws ServletException, IOException, SignatureException {
           
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userIdentification;

       try {
        if (authHeader == null || !authHeader.startsWith("Bearer")) {        
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(6);
        userIdentification = jwtService.getUsername(jwt);
        if (userIdentification != null && SecurityContextHolder.getContext().getAuthentication() == null) {            
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userIdentification);
            if (jwtService.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                                                                                userDetails, 
                                                                                                null, 
                                                                                                userDetails.getAuthorities()
                                                                                    );
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext() .setAuthentication(authenticationToken);                                                              
            }
        }    
        filterChain.doFilter(request, response);
       } catch (IOException | SignatureException |ServletException e) {
        // Captura y maneja las excepciones
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        response.getWriter().write(e.getMessage());
       }
    }
}
