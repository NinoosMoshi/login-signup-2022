package com.ninos.security.repository;

import com.ninos.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findUserByEmail(String email);

    public boolean existsByEmail(String email);

    @Query("select u.active from User u where u.email=?1")
    public int getActive(String email);

    @Query("select u.password from User u where u.email=?1")
    public String getPasswordByEmail(String email);

}

