package com.everypet.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginViewController {
    @GetMapping("/signin")
    public String loginAndFailMsg(@RequestParam(name = "error", required = false) String error, Model model) {
        model.addAttribute("errorMessage", error);
        return "member/signin";
    }

}
