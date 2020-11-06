package yte.intern.spring.application.manageEtkinlik.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.spring.application.common.entity.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "KULLANICI_SEQ")
@AllArgsConstructor
@NoArgsConstructor
public class Kullanici extends BaseEntity {
	@Column()
	private String name;
	@Column()
	private String email;
	@Column(unique = true)
	private String tcKimlikNo;
	@ManyToMany(cascade = CascadeType.ALL) @JoinColumn private Set<Etkinlik> Etkinlikler;
}
