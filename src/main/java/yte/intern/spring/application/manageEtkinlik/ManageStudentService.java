package yte.intern.spring.application.manageEtkinlik;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.spring.application.manageEtkinlik.entity.Kullanici;
import yte.intern.spring.application.manageEtkinlik.entity.Etkinlik;
import yte.intern.spring.application.manageEtkinlik.repository.EtkinlikRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ManageStudentService {

	private final EtkinlikRepository etkinlikRepository;

	public List<Etkinlik> listAllEtkinliks() { return etkinlikRepository.findAll(); }

	public Etkinlik getEtkinlikByEtkinlikAdi(String studentNumber) {
		return etkinlikRepository.findByEtkinlikAdi(studentNumber).orElseThrow(EntityNotFoundException::new); }

	public Set<Kullanici> getEkinlikKatilimcis(String studentNumber) {
		return etkinlikRepository.findByEtkinlikAdi(studentNumber).map(Etkinlik::getKullanicis)
				.orElseThrow(EntityNotFoundException::new); }


	@Transactional
	public Etkinlik updateEtkinlik(String etkinlikAdi, Etkinlik etkinlik) {
		Optional<Etkinlik> studentOptional = etkinlikRepository.findByEtkinlikAdi(etkinlikAdi);
		if (studentOptional.isPresent()) { updateEtkinlikFromDB(etkinlik, studentOptional.get());
			return etkinlik;
		} else { throw new EntityNotFoundException(); } }
	private void updateEtkinlikFromDB(Etkinlik etkinlik, Etkinlik etkinlikFromDB) {
		etkinlikFromDB.setEtkinlikAdi(etkinlik.getEtkinlikAdi());
		etkinlikFromDB.setKota(etkinlik.getKota());
		etkinlikFromDB.setStartDate(etkinlik.getStartDate());
		etkinlikFromDB.setEndDate(etkinlik.getEndDate());
		etkinlikFromDB.setKonum(etkinlik.getKonum()); }
	public void deleteEtkinlik(String etkinlikAdi) {
		etkinlikRepository.deleteByEtkinlikAdi(etkinlikAdi);
	}
	public Kullanici addKatilimciToEtkinlik(String etkinlikAdi, Kullanici kullanici) {
		Optional<Etkinlik> studentOptional = etkinlikRepository.findByEtkinlikAdi(etkinlikAdi);
		if (studentOptional.isPresent()) {
			Etkinlik etkinlik = studentOptional.get();
			Set<Kullanici> kullanicis = etkinlik.getKullanicis();
			kullanicis.add(kullanici);
			Etkinlik savedEtkinlik = etkinlikRepository.save(etkinlik);
			return savedEtkinlik
					.getKullanicis().stream().filter(it -> it.getTcKimlikNo().equals(kullanici.getTcKimlikNo()))
					.collect(toList()).get(0);
		} else {
			throw new EntityNotFoundException(); } }
	public Etkinlik addEtkinlik(Etkinlik etkinlik) {
		return etkinlikRepository.save(etkinlik);
	}}
