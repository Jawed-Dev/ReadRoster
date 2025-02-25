package com.readroster.backend.auth;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    private final HttpSession session;

    public SessionService(HttpSession session) {
        this.session = session;
    }

    public boolean isAuthenticated() {
        return session.getAttribute(AuthConstant.SESSION_USER) != null;
    }

    public AuthDto getDataSession() {
        try {
            return (AuthDto) session.getAttribute(AuthConstant.SESSION_USER);
        }
        catch (Exception e) {
           System.out.println(e.getMessage());
        }
        return null;
    }

    public <T> void createSession(T data) {
        session.setAttribute(AuthConstant.SESSION_USER, data);
        session.setMaxInactiveInterval(AuthConstant.TIME_SESSION_USER);
    }

    public void clearSession() {
        session.removeAttribute(AuthConstant.SESSION_USER);
    }
}