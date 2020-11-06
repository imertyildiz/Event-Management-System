package yte.intern.spring.application.manageEtkinlik;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.spring.application.manageEtkinlik.dto.EtkinlikDTO;
import yte.intern.spring.application.manageEtkinlik.dto.KullaniciDTO;
import yte.intern.spring.application.manageEtkinlik.entity.Etkinlik;
import yte.intern.spring.application.manageEtkinlik.entity.Kullanici;
import yte.intern.spring.application.manageEtkinlik.mapper.KullaniciMapper;
import yte.intern.spring.application.manageEtkinlik.mapper.EtkinlikMapper;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/etkinlik")
public class ManageStudentController {
	private final ManageStudentService manageStudentService;
	private final EtkinlikMapper etkinlikMapper;
	private final KullaniciMapper kullaniciMapper;

	@GetMapping
	public List<EtkinlikDTO> listAllEtkinliks() {
		List<Etkinlik> etkinlik = manageStudentService.listAllEtkinliks(); return etkinlikMapper.mapToDto(etkinlik); }

	@GetMapping("/{etkinlikAdi}")
	public EtkinlikDTO getEtkinlikByEtkinlikAdi(@PathVariable String etkinlikAdi) {
		Etkinlik etkinlik = manageStudentService.getEtkinlikByEtkinlikAdi(etkinlikAdi); return etkinlikMapper.mapToDto(etkinlik); }

	@PostMapping
	public EtkinlikDTO addEtkinlik(@Valid @RequestBody EtkinlikDTO etkinlikDTO) {
		Etkinlik etkinlik = etkinlikMapper.mapToEntity(etkinlikDTO); Etkinlik addedEtkinlik = manageStudentService.addEtkinlik(etkinlik);
		return etkinlikMapper.mapToDto(addedEtkinlik); }

	@PutMapping("/{etkinlikAdi}")
	public EtkinlikDTO updateEtkinlik(@PathVariable String etkinlikAdi, @Valid @RequestBody EtkinlikDTO etkinlikDTO) {
		Etkinlik etkinlik = etkinlikMapper.mapToEntity(etkinlikDTO);
		Etkinlik updatedEtkinlik = manageStudentService.updateEtkinlik(etkinlikAdi, etkinlik); return etkinlikMapper.mapToDto(updatedEtkinlik); }

	@DeleteMapping("/{etkinlikAdi}")
	public void deleteEtkinlik(@PathVariable String etkinlikAdi) {
		manageStudentService.deleteEtkinlik(etkinlikAdi);
	}

	@GetMapping("/{etkinlikAdi}/kullanici")
	public List<KullaniciDTO> getEkinlikKatilimcis(@PathVariable String etkinlikAdi) {
		Set<Kullanici> studentsKullanicis = manageStudentService.getEkinlikKatilimcis(etkinlikAdi);
		return kullaniciMapper.mapToDto(new ArrayList<>(studentsKullanicis)); }

	@PostMapping("/{etkinlikAdi}/kullanici")
	public KullaniciDTO addKatilimciToEtkinlik(@PathVariable String etkinlikAdi, @RequestBody @Valid KullaniciDTO kullaniciDTO) {
		Kullanici addedKullanici = manageStudentService.addKatilimciToEtkinlik(etkinlikAdi, kullaniciMapper.mapToEntity(kullaniciDTO));
		return kullaniciMapper.mapToDto(addedKullanici);
	}



}
