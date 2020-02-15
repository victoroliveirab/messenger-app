package com.victoroliveira.messenger.security;

import static java.util.Collections.emptyList;

import com.victoroliveira.messenger.repository.ProfileRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private ProfileRepository profileRepository;

    public UserDetailsServiceImpl(ProfileRepository profileRepository) {
        super();
        this.profileRepository = profileRepository;
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
