package com.example.demo.filter;

import com.example.demo.service.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.ErrorResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // 헤더에서 Authroization 값을 찾음
        final String JWT_PREFIX = "Bearer ";
        final String JWT_HEADER_KEY = "Authorization";
        final String authHeader = request.getHeader(JWT_HEADER_KEY);
        final String jwt;
        final String userEmail;

        // jwt token 형식이 아니면 요청을 차단함
        if (authHeader == null || !authHeader.startsWith(JWT_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            jwt = authHeader.substring(JWT_PREFIX.length());
            userEmail = jwtService.extractUsername(jwt); // JWT 토큰으로 부터 유저 이메일 추출
            // jwt 토큰에 유저 이메일이 없고, 아직 인증되지 않은 유저라면
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // db에서 유저 정보를 가져옴
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                // token이 유효하다면
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // SecurityContext를 갱신한고 controller로 요청을 전달한다.
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        }
        catch (ExpiredJwtException e){
            logger.error("Expire token");
//            filterChain.doFilter(request, response);
            logger.info("CustomAuthorizationFilter : Access Token이 만료되었습니다.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("utf-8");
            ErrorResponse errorResponse = ErrorResponse.create(e, HttpStatusCode.valueOf(401), e.getMessage());

            new ObjectMapper().writeValue(response.getWriter(), errorResponse);
        }
    }
}