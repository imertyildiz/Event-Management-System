package yte.intern.spring.application.manageEtkinlik.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.spring.application.manageEtkinlik.entity.Etkinlik;

import javax.transaction.Transactional;
import java.util.Optional;

public interface EtkinlikRepository extends JpaRepository<Etkinlik, Long> {
	Optional<Etkinlik> findByEtkinlikAdi(String etkinlikAdi);
	@Transactional
	void deleteByEtkinlikAdi(String etkinlikAdi);}
