package yte.intern.spring.application.manageEtkinlik.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.lang.NonNullFields;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Getter
@Builder
public class EtkinlikDTO {
	@NotBlank(message = "Etkinlik Adı Boş Olamaz !!") public final String etkinlikAdi;
	@FutureOrPresent(message = "Başlangıç Tarihi Yanlış !!")
	@NotNull public final LocalDate startDate;
	@FutureOrPresent(message = "Bitiş Tarihi Yanlış !!")
	@NotNull public final LocalDate endDate;
	@Min(value = 1,message = "Kontenjan Yanlış !!") public final Number kota;
	@NotBlank(message = "Konum Boş Olamaz !!") public final String konum;
	@JsonCreator public EtkinlikDTO(@JsonProperty("etkinlikAdi") String etkinlikAdi,
					   @JsonProperty("startDate") LocalDate startDate,
					   @JsonProperty("endDate") LocalDate endDate,
					   @JsonProperty("kota") Number kota,
					   @JsonProperty("konum") String konum
	) {this.etkinlikAdi = etkinlikAdi; this.startDate=startDate;
		this.endDate=endDate; this.kota=kota; this.konum=konum;}
}
