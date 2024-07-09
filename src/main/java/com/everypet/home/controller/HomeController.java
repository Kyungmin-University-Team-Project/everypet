package com.everypet.home.controller;

import com.everypet.member.model.vo.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Iterator;

@RestController
public class HomeController {
    @GetMapping("/info")
    public String mainP(@AuthenticationPrincipal Member member) {

        //String name = SecurityContextHolder.getContext().getAuthentication().getName();

        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String name = member.getUsername();

        Collection<? extends GrantedAuthority> authorities = member.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();

        String role = auth.getAuthority();

        System.out.println("Main Controller : " + name + " : " + role);

        return "Main Controller : " + name + " : " + role;
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }
}