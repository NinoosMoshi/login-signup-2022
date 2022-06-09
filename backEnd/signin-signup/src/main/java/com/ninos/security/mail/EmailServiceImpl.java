package com.ninos.security.mail;

import com.ninos.util.UserCode;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;


@AllArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private JavaMailSender javaMailSender;
    private UserCode userCode;

    @Async
    @Override
    public void sendCodeByMail(Email email) {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("ninoosmoshi222@gmail.com");
        simpleMailMessage.setTo(email.getTo());
        simpleMailMessage.setSubject("UserCode Active");
        simpleMailMessage.setText(userCode.generateCode());
        javaMailSender.send(simpleMailMessage);

    }
}
