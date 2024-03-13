# STraffic 표준화 플랫폼

React - Spring Web 개발 표준 플랫폼

현재 기초 틀 작성 중입니다.

## 업데이트 내역
    2024/03/08 : 1. 샘플 프로젝트 불필요 파일 삭제.
                 2. spring security 기본 설정 추가(기본 disable로 처리)

    2024/03/13 : 1. 개발환경 설정 추가.

## 1.  Web 개발표준(w1.0)
 
    Framework
        Front-end: React(Design MUI)
            Optional: Node.js, vue.js, vue cli 설치 후 >> IntelliJ 연동   
        Back-end: Spring Boot (jdk 19) 
            Lombok
            SLF4J(Simple Logging Facade for Java)

    DBMS: Postgresql

    표준 개발 툴
        형상관리: Git(local), Gitlab
        IDE: IntelliJ
            Lombok 설치: 자바클래스에서 반복적으로 작성되는 getter, setter, toString, 생성자 코드 등의 소스들을, Annotation을 사용하여 생략할 수 있도록 컴파일 시점에 자동으로 생성해주는 라이브러리
            Git 연동(로컬에서 실행: 'git config --global http.sslVerify false') 
        Database query: DBeaver
        API 문서화: Swagger


## 2. 개발 환경 설정

1. Source 다운로드 : git clone https://172.20.30.20:20443/common/common-spring-react.git

2. java 17 버젼 이상 설치.

3. 환경 변수 등록

4. IntelliJ java compiler 확인.

![Java Compiler](demo/guide/javacompiler.jpg)

5. IntelliJ Project SDK 확인.

![Project SDK](demo/guide/project_sdk.jpg)

6. NodeJS 설치

    [https://nodejs.org/en](https://nodejs.org/en)


7. React 패키지 설치.

>    $ cd {source root}/demo/src/main/wepapp
> 
>    $ npm install

8. Maven clean, install

    프로젝트 Maven 관련 패키지를 설치 합니다.

![Run Configuration](demo/guide/maven_clean.jpg)

9. Run Configuration

![Run Configuration](demo/guide/run_configuration.jpg)

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