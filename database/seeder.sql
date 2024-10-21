INSERT INTO people (id, name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld_url, created_by)
VALUES
  (UUID(), 'Luke Skywalker', '172', '77', 'blond', 'fair', 'blue', '19BBY', 'male', 'https://swapi.py4e.com/api/planets/1/', 'admin'),
  (UUID(), 'Darth Vader', '202', '136', 'none', 'white', 'yellow', '41.9BBY', 'male', 'https://swapi.py4e.com/api/planets/1/', 'admin');


INSERT INTO films (id, title, episode_id, opening_crawl, director, producer, release_date, created_by)
VALUES
  (UUID(), 'A New Hope', 4, 'It is a period of civil war...', 'George Lucas', 'Gary Kurtz', '1977-05-25', 'admin'),
  (UUID(), 'The Empire Strikes Back', 5, 'It is a dark time for the rebellion...', 'Irvin Kershner', 'Gary Kurtz', '1980-05-17', 'admin');


INSERT INTO planets (id, name, diameter, climate, gravity, terrain, population, created_by)
VALUES
  (UUID(), 'Tatooine', '10465', 'arid', '1 standard', 'desert', '200000', 'admin'),
  (UUID(), 'Alderaan', '12500', 'temperate', '1 standard', 'grasslands, mountains', '2000000000', 'admin');


INSERT INTO species (id, name, classification, designation, average_height, skin_colors, hair_colors, eye_colors, average_lifespan, language, homeworld_url, created_by)
VALUES
  (UUID(), 'Human', 'mammal', 'sentient', '180', 'caucasian, black, asian, hispanic', 'blonde, brown, black', 'blue, green, brown', '120', 'Galactic Basic', 'https://swapi.py4e.com/api/planets/9/', 'admin'),
  (UUID(), 'Droid', 'artificial', 'sentient', 'n/a', 'n/a', 'n/a', 'n/a', 'indefinite', 'binary', NULL, 'admin');


INSERT INTO starships (id, name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, created_by)
VALUES
  (UUID(), 'Millennium Falcon', 'YT-1300 light freighter', 'Corellian Engineering Corporation', '100000', '34.37', '1050', '4', '6', '100000', 'admin'),
  (UUID(), 'X-wing', 'T-65 X-wing', 'Incom Corporation', '149999', '12.5', '1050', '1', '0', '110', 'admin');


INSERT INTO vehicles (id, name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, created_by)
VALUES
  (UUID(), 'Snowspeeder', 't-47 airspeeder', 'Incom corporation', '150000', '4.5', '650', '2', '0', '10', 'admin'),
  (UUID(), 'Imperial Speeder Bike', '74-Z speeder bike', 'Aratech Repulsor Company', '8000', '3', '360', '1', '0', '4', 'admin');


INSERT INTO people_films (person_id, film_id, created_by)
VALUES
  ((SELECT id FROM people WHERE name = 'Luke Skywalker'), (SELECT id FROM films WHERE title = 'A New Hope'), 'admin'),
  ((SELECT id FROM people WHERE name = 'Darth Vader'), (SELECT id FROM films WHERE title = 'A New Hope'), 'admin');


INSERT INTO films_planets (film_id, planet_id, created_by)
VALUES
  ((SELECT id FROM films WHERE title = 'A New Hope'), (SELECT id FROM planets WHERE name = 'Tatooine'), 'admin'),
  ((SELECT id FROM films WHERE title = 'The Empire Strikes Back'), (SELECT id FROM planets WHERE name = 'Alderaan'), 'admin');

INSERT INTO people_vehicles (person_id, vehicle_id, created_by)
VALUES
  ((SELECT id FROM people WHERE name = 'Luke Skywalker'), (SELECT id FROM vehicles WHERE name = 'Snowspeeder'), 'admin'),
  ((SELECT id FROM people WHERE name = 'Darth Vader'), (SELECT id FROM vehicles WHERE name = 'Imperial Speeder Bike'), 'admin');


INSERT INTO people_starships (person_id, starship_id, created_by)
VALUES
  ((SELECT id FROM people WHERE name = 'Luke Skywalker'), (SELECT id FROM starships WHERE name = 'Millennium Falcon'), 'admin'),
  ((SELECT id FROM people WHERE name = 'Darth Vader'), (SELECT id FROM starships WHERE name = 'X-wing'), 'admin');
