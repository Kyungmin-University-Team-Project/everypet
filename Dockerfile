# Maven을 설치하는 베이스 이미지
FROM maven:3.8.4-openjdk-8 AS build

# 애플리케이션 소스 코드를 복사
WORKDIR /app
COPY . .

# Maven을 사용하여 애플리케이션 빌드, 테스트는 무시
RUN mvn -DskipTests=true package

# Tomcat을 설치하는 베이스 이미지
FROM tomcat:9.0.56-jdk8-openjdk-slim

# 빌드된 WAR 파일을 Tomcat의 webapps 디렉토리로 복사
COPY --from=build /app/target/everypet.war /usr/local/tomcat/webapps/ROOT.war

# 8080 포트로웹 애플리케이션 노출
EXPOSE 8080
