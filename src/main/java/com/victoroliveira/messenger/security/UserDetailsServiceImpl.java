package com.victoroliveira.messenger.security;

import static java.util.Collections.emptyList;

import com.victoroliveira.messenger.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) {
        /*UserModel applicationUser = userRepository.findByUserName(userName);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(userName);
        }
        return new User(applicationUser.getUserName(),applicationUser.getPassword(),applicationUser.isStatus(),true,true,true,emptyList());*/
        return new User("Anderson","password",true,true,true,true,emptyList());
    }
}
