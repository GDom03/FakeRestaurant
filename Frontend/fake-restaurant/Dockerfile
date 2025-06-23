FROM node:24-alpine

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze (incluso Angular CLI se non è in devDependencies)
RUN npm install -g @angular/cli && npm install 


# Copia tutto il codice sorgente
COPY . .

# Espone la porta 4200 (porta di ng serve)
EXPOSE 4200

# Comando per avviare Angular con SSL
CMD ["ng", "serve", "--ssl", "true", "--ssl-key", "ssl/key.pem", "--ssl-cert", "ssl/cert.pem", "--host", "0.0.0.0"]
