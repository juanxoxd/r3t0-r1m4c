CREATE DATABASE IF NOT EXISTS `softtek-dev`;
USE `softtek-dev`;

-- Tabla para Personas (People)
CREATE TABLE IF NOT EXISTS people (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    height VARCHAR(10),
    mass VARCHAR(10),
    hair_color VARCHAR(50),
    skin_color VARCHAR(50),
    eye_color VARCHAR(50),
    birth_year VARCHAR(20),
    gender VARCHAR(20),
    homeworld_url VARCHAR(255), -- Relaciona al planeta de origen (url de planetas)
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Tabla para Películas (Films)
CREATE TABLE IF NOT EXISTS films (
    id CHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    episode_id INT,
    opening_crawl TEXT,
    director VARCHAR(255),
    producer VARCHAR(255),
    release_date DATE,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Tabla para Planetas (Planets)
CREATE TABLE IF NOT EXISTS planets (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    diameter VARCHAR(50),
    climate VARCHAR(255),
    gravity VARCHAR(255),
    terrain VARCHAR(255),
    population VARCHAR(50),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Tabla para Especies (Species)
CREATE TABLE IF NOT EXISTS species (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    classification VARCHAR(255),
    designation VARCHAR(255),
    average_height VARCHAR(10),
    skin_colors VARCHAR(255),
    hair_colors VARCHAR(255),
    eye_colors VARCHAR(255),
    average_lifespan VARCHAR(10),
    language VARCHAR(255),
    homeworld_url VARCHAR(255), -- Relaciona al planeta de origen
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Tabla para Naves Espaciales (Starships)
CREATE TABLE IF NOT EXISTS starships (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255),
    manufacturer VARCHAR(255),
    cost_in_credits VARCHAR(50),
    length VARCHAR(50),
    max_atmosphering_speed VARCHAR(50),
    crew VARCHAR(50),
    passengers VARCHAR(50),
    cargo_capacity VARCHAR(50),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Tabla para Vehículos (Vehicles)
CREATE TABLE IF NOT EXISTS vehicles (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255),
    manufacturer VARCHAR(255),
    cost_in_credits VARCHAR(50),
    length VARCHAR(50),
    max_atmosphering_speed VARCHAR(50),
    crew VARCHAR(50),
    passengers VARCHAR(50),
    cargo_capacity VARCHAR(50),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Relación entre Personas y Películas (Many-to-Many)
CREATE TABLE IF NOT EXISTS people_films (
    person_id CHAR(36),
    film_id CHAR(36),
    PRIMARY KEY (person_id, film_id),
    FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE,
    FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Relación entre Películas y Planetas (Many-to-Many)
CREATE TABLE IF NOT EXISTS films_planets (
    film_id CHAR(36),
    planet_id CHAR(36),
    PRIMARY KEY (film_id, planet_id),
    FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY (planet_id) REFERENCES planets(id) ON DELETE CASCADE,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Relación entre Personas y Vehículos (Many-to-Many)
CREATE TABLE IF NOT EXISTS people_vehicles (
    person_id CHAR(36),
    vehicle_id CHAR(36),
    PRIMARY KEY (person_id, vehicle_id),
    FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Relación entre Personas y Naves Espaciales (Many-to-Many)
CREATE TABLE IF NOT EXISTS people_starships (
    person_id CHAR(36),
    starship_id CHAR(36),
    PRIMARY KEY (person_id, starship_id),
    FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE,
    FOREIGN KEY (starship_id) REFERENCES starships(id) ON DELETE CASCADE,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);

-- Relación entre Personas y Especies (Many-to-Many)
CREATE TABLE IF NOT EXISTS people_species (
    person_id CHAR(36),
    species_id CHAR(36),
    PRIMARY KEY (person_id, species_id),
    FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE,
    FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE CASCADE,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_by VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    deleted BOOLEAN DEFAULT FALSE
);
