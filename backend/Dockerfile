FROM adoptopenjdk/openjdk14:alpine-jre

ARG JAR_FILE=target/Flashcard.io-0.0.1-SNAPSHOT.jar

WORKDIR /app

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]