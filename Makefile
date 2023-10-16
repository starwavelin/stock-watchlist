.DEFAULT_GOAL := help
.PHONY: help dev


up: ## Run all the services, client (Angular), server (Node.js Express), MySQL, MongoDB, Redis
	docker compose up

sh: ## Open a shell with all dependencies for server
	docker compose run server sh

sh-app: ## Open a shell with all dependencies for client
	docker compose run client sh

build: ## Build the docker images used by the 'server'
	docker compose build

build-no-cache: ## Build the docker image, without the the docker build cache, used by the 'server'
	docker compose build server --no-cache

open-app: ## Open the Angular app
	open http://localhost:8200

stop-all-containers: ## stop all docker containers
	docker stop $(docker ps -q)

rm-all-stopped-containers: ## remove all stopped docker containers
	docker container prune

rm-all-containers: ## remove all containers (no matterh they are stopped or not)
	docker rm $(docker ps -a -q)

rm-all-images: ## remove all docker images
	docker rmi $(docker images -q)

submit: ## package the project into a solution.zip file so the developer can submit
	zip -r solution.zip .

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
