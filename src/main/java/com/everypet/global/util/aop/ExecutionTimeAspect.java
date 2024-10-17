package com.everypet.global.util.aop;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ExecutionTimeAspect {

    private static final Logger log = LogManager.getLogger(ExecutionTimeAspect.class);

    @Around("@annotation(com.everypet.global.util.aop.LogExecutionTime)")
    public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis(); // 시작 시간 기록

        Object result = joinPoint.proceed(); // 실제 메서드 실행

        long endTime = System.currentTimeMillis(); // 끝난 시간 기록
        String methodName = joinPoint.getSignature().getName();
        log.info(methodName + " method took " + (endTime - startTime) + " ms"); // 총 걸린 시간 출력

        return result; // 메서드 결과 반환
    }
}
