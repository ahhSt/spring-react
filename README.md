# STraffic 표준화 플랫폼

React - Spring Web 개발 표준 플랫폼

현재 기초 틀 작성 중입니다.

## 1.  개발환경 설치
### 1.1 형상관리 툴: Github, Git

### 1.2 IDE 설치
    1) JDK 19: OpenJDK 19
    2) IntelliJ Community Edition 설치
    3) Plug-in 설치: 'Settings' > 'Plugins'
      - Github 설치
      - ERD Editor 설치        
    4) Swagger(설치 불필요) : REST API 문서화

### 1.3 IDE와 Git 연동
    1) SSL 확인 false 설정: 윈도우 CMD에서 다음 명령어 실행
       'git config --global http.sslVerify false'
    2)  

### 1.3 Database 및 Tool
    1) PostgreSQL
    2) DBeaver

### 1.4 Front-end 도구
    1) Node.js 설치

### 1.5 Swagger 설정
    1) Node.js 설치


## 2.  Web 개발표준(w1.0)
 
    Framework
        Front-end: React(Design MUI)
            Optional: Node.js, vue.js, vue cli 설치 후 >> IntelliJ 연동   
        Back-end: Spring Boot (jdk 19) 
            Lombok
            SLF4J(Simple Logging Facade for Java)

    DBMS: Postgresql    

## 2. 소스 위치

    Source 다운로드 : https://172.20.30.20:20443/common/common-spring-react.git

    추가 중...

### DB 연결 설정

    파일 경로 : demo > src > main > resources > application.yml

```
spring:
  web:
    resources:
      static-locations: classpath:/static, classpath:/webapp
  datasource:
    # Postgresql setting
    url: jdbc:postgresql://192.168.56.1:35432/OPS
    username: OPS
    password: OPS123
    hikari:
      data-source-properties:
        useUnicode: true
        characterEncoding: UTF-8
```

## 3.  resources

#### application.yml
        Spring 기본 설정 파일입니다. application.properties 파일과 동일한 역할을 합니다.  

#### import.sql
        서버 시작 시 실행 할 SQL입니다. 주로 기초 데이터를 생성합니다.
        'ddl-auto' 옵션에 따라 실행 여부가 결정됩니다.

#### logback.xml
        Slf4j 로거에 대한 설정입니다. 
        사용법은 java 소스 내에 log.debug("메시지") 으로 사용가능합니다.
        log level은 debug > info > warn > error > trace 가 있습니다.

## 업데이트 내역
    2024/03/08 : 1. 샘플 프로젝트 불필요 파일 삭제.
                 2. spring security 기본 설정 추가(기본 disable로 처리)