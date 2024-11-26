import { format, addHours } from 'date-fns';

/**
 * 서버에서 UTC 시간으로 제공된 날짜를 KST(한국 표준시)로 변환하여
 * 상대적 시간 또는 지정된 포맷으로 반환하는 유틸리티 함수
 *
 * @param createdDate - 서버에서 제공된 UTC 시간 (ISO 8601 문자열)
 * @returns - 상대적 시간(예: "5분 전") 또는 한국 시간으로 포맷된 문자열
 */
export const formatTime = (createdDate: string): string => {
    try {
        // 서버에서 받은 UTC 시간 문자열을 Date 객체로 변환
        const date = new Date(createdDate);

        // UTC → KST로 변환 (UTC + 9시간)
        const kstDate = addHours(date, 9);

        // 지정된 포맷으로 변환하여 반환
        return format(kstDate, "yyyy년 MM월 dd일 HH:mm:ss");
    } catch (error) {
        console.error("날짜 포맷팅 오류:", error);
        return "날짜 오류";
    }
};
