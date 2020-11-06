package yte.intern.spring.application.manageEtkinlik.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.spring.application.common.entity.BaseEntity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "ETKINLIK_SEQ")
public class Etkinlik extends BaseEntity {
	@Column private LocalDate startDate;
	@Column private LocalDate endDate;
	@Column(unique = true) private String etkinlikAdi;
	@Column private Number kota;
	@Column private String konum;
	@ManyToMany(cascade = CascadeType.ALL) @JoinColumn private Set<Kullanici> kullanicis;
}
