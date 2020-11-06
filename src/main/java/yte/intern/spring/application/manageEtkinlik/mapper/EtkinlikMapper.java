package yte.intern.spring.application.manageEtkinlik.mapper;

import org.mapstruct.Mapper;
import yte.intern.spring.application.manageEtkinlik.dto.EtkinlikDTO;
import yte.intern.spring.application.manageEtkinlik.entity.Etkinlik;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EtkinlikMapper {

	EtkinlikDTO mapToDto(Etkinlik etkinlik);

	Etkinlik mapToEntity(EtkinlikDTO etkinlikDTO);

	List<EtkinlikDTO> mapToDto(List<Etkinlik> etkinlikList);

	List<Etkinlik> mapToEntity(List<EtkinlikDTO> etkinlikDTOList);
}
