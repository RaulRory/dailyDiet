BLUE=\033[1;36m
NC=\033[0m

init:
	@printf "${BLUE}Deseja instalar as dependências da aplicação? (y/n)? ${NC}"; \
	read answer; \
	if [ $$answer = 'y' ]; then \
		npm install; \
	fi; \
	printf "${BLUE}Deseja iniciar o banco Postgre virtualmente (y/n)? ${NC}"; \
	read answer; \
	if [ $$answer = 'y' ]; then \
		docker-compose up -d; \
		echo "espere alguns segundos"; \
		sleep 3; \
		npm run start:dev; \
	fi;
	
start:
	@docker-compose up -d; \
	echo "espere alguns segundos"; \
	sleep 3; \
	npm run start:dev;

stop:
	@docker-compose down; 