# **Morning news**
## Ce projet consiste à créer une application capable de stocker des actualités pour des utilisateurs individuels à l'aide de l'API News.

</br></br>


# API
>newsapi

</br>

# Front-End
>React

</br>

# Back-End
>Express

</br>

# DB
>mongoDB

</br></br>


# Comment démarrer ? :
```
1. Allez dans le dossier frontend (cd frontend)
2. installez npm module (npm install)
3. créer un fichier .env et Remplacez la clé API qui vous a été délivrée (.env - REACT_APP_NEWS_API_KEY = ) 
4. Allez dans le dossier backend (cd backend)
5. installez npm module (npm install)
6. créer un fichier .env et Remplacez les informations mongodb  (.env - DB_USER = 
                                                                        DB_PASSWORD = 
                                                                        DB_SERVER = )
7. Entrez la commande npm start dans différents terminaux (1. backend - npm start / 2. frontend -npm start)
```



etc.

프로젝트 도중 발생한 에러 (개인적 참고용)
1. 로컬에서는 잘 작동했지만 헤로쿠 deploy 이후 오류 발생
    Uncaught (in promise) SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data
    => 해결 : mongoDB 접속 가능 아이피 허용을 안해줌 (json 내용을 못받아와서 json 내용이 비어서 발생한 오류) / 기본적으로 fetch response를 받을 수 없을 때 발생함 (일주일의 구글링 노가다에도 해결 안되는 이상한 답변만 stack overflow에 있어서 개고생함)
</br></br>
2. ES-lint 오류 발생
    es-lint 오류가 미친듯이 발생함
    => 해결 : react-scripts 3.3.1 버전으로 설치하고 es-lint 모듈을 package.lock에서 전부 삭제 후 node_modules도 삭제 후 재설치
</br></br>
3. react (front) - express (backend) 연결
    한글자만 잘못되도 frontend 자체가 로드가 안되거나 build 이후 각종 오류가 발생함 304, 504 에러 등
    => 해결 : backend 폴더의 app.js 설정을 참고
</br></br>
4. 프론트엔드 build 이후 backend로 build 폴더가 이동 안됨
    => 해결 : 윈도우에서 리눅스의 mv 명령어가 실행이 안되서였음 / 테스트중에만 mv를 move로 변경 (root - package.json 참고)