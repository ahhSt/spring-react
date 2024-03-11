# STraffic 표준화 플랫폼

React - Spring Web 개발 표준 플랫폼

현재 기초 틀 작성 중입니다.

## 1.  Web 개발표준(w1.0)
 
    Framework
        Front-end: React(Design MUI)
        Back-end: Spring Boot (jdk 19)

    DBMS: Postgresql

    표준 개발 툴
        형상관리: Git(local), Gitlab
        IDE: IntelliJ
        Database query: DBeaver
        API 문서화: Swagger


## 2.  설치 방법

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