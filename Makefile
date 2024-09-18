BACKEND_DOCKER_COMPOSE = backend/docker-compose.yml
FRONTEND_DOCKER_COMPOSE = frontend/docker-compose.yml

DOCKER_COMPOSE = docker-compose -f

.PHONY: build backend-setup frontend-setup up down restart

# Build all images with no cache (optional: use --no-cache)
build: backend-setup frontend-setup

# Setup and build backend with no cache
backend-setup:
	$(DOCKER_COMPOSE) $(BACKEND_DOCKER_COMPOSE) build --no-cache

# Setup and build frontend with no cache
frontend-setup:
	$(DOCKER_COMPOSE) $(FRONTEND_DOCKER_COMPOSE) build --no-cache

# Start all containers
up:
	$(DOCKER_COMPOSE) $(BACKEND_DOCKER_COMPOSE) up -d
	$(DOCKER_COMPOSE) $(FRONTEND_DOCKER_COMPOSE) up -d

# Stop and remove all containers
down:
	$(DOCKER_COMPOSE) $(BACKEND_DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) $(FRONTEND_DOCKER_COMPOSE) down

# Restart all containers
restart: down up
