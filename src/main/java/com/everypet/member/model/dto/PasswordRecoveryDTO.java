package com.everypet.member.model.dto;

import com.everypet.member.model.constant.PasswordQuestion;
import com.everypet.member.model.vo.PasswordRecovery;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordRecoveryDTO {

        @ApiModelProperty(example = "FIRST_PET_NAME", notes = "비밀번호 찾기 질문", allowableValues = "MOTHER_MAIDEN_NAME, FIRST_PET_NAME, FIRST_SCHOOL, FAVOURITE_TEACHER, BIRTH_CITY, FAVOURITE_BOOK, FAVOURITE_MOVIE, FATHER_BIRTHDAY")
        private PasswordQuestion question;

        @ApiModelProperty(example = "또시", notes = "비밀번호 찾기 답변")
        @NotBlank(message = "답변은 필수 입력 값입니다.")
        private String answer;

        public PasswordRecovery toEntity(String memberId) {
            return PasswordRecovery.builder()
                    .memberId(memberId)
                    .question(question.getQuestionText())
                    .answer(answer)
                    .build();
        }

}