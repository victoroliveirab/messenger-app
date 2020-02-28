package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.models.ConfirmationToken;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.ConfirmationTokenRepository;
import com.victoroliveira.messenger.service.ConfirmationTokenService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {

    private JavaMailSender javaMailSender;
    private ConfirmationTokenRepository confirmationTokenRepository;

    public ConfirmationTokenServiceImpl(JavaMailSender javaMailSender, ConfirmationTokenRepository confirmationTokenRepository) {
        this.javaMailSender = javaMailSender;
        this.confirmationTokenRepository = confirmationTokenRepository;
    }

    @Override
    public ConfirmationToken findByConfirmationToken(String confirmationToken) {
        System.out.println("HERE");
        return confirmationTokenRepository.findByConfirmationToken(confirmationToken);
    }

    @Async
    @Override
    public void sendEmail(Profile profile) {
        ConfirmationToken token = new ConfirmationToken(profile);
        confirmationTokenRepository.save(token);
        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(profile.getEmail());
        emailMessage.setSubject("Pitang Messenger - Confirm your account!");
        emailMessage.setFrom("vob160392@gmail.com");
        emailMessage.setText("Confirm your account by clicking on the link below:\n\n" +
                "http://localhost:8080/confirmation?token=" + token.getConfirmationToken());
        javaMailSender.send(emailMessage);
    }
}