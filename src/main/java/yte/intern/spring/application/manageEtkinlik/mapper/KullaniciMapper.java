package yte.intern.spring.application.manageEtkinlik.mapper;

import org.mapstruct.Mapper;
import yte.intern.spring.application.manageEtkinlik.dto.KullaniciDTO;
import yte.intern.spring.application.manageEtkinlik.entity.Kullanici;

import java.util.List;

@Mapper(componentModel = "spring")
public interface KullaniciMapper {

	KullaniciDTO mapToDto(Kullanici kullanici);

	Kullanici mapToEntity(KullaniciDTO kullaniciDTO);

	List<KullaniciDTO> mapToDto(List<Kullanici> kullaniciList);

	List<Kullanici> mapToEntity(List<KullaniciDTO> kullaniciDTOList);
}
