package yte.intern.spring.application.manageEtkinlik.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import yte.intern.spring.application.manageEtkinlik.validation.TcKimlikNo;

import javax.validation.constraints.*;

@Getter
@Builder
public class KullaniciDTO {


	@NotBlank( message = "Ad Soyad Boş Olamaz!")
	public final String name;
	@Email
	@NotBlank(message = "E-Mail Boş Olamaz!")
	public final String email;
	@NotBlank(message = "TC Kimlik No Boş Olamaz!")
	@TcKimlikNo()
	public final String tcKimlikNo;



	public KullaniciDTO(@JsonProperty("name") String name,
						@JsonProperty("email") String email,
						@JsonProperty("tcKimlikNo") String tcKimlikNo){

		this.name = name;
		this.email = email;
		this.tcKimlikNo = tcKimlikNo;
	}
}
