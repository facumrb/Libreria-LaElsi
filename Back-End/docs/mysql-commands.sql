CREATE DATABASE IF NOT EXISTS laelsi;

CREATE USER IF NOT EXISTS administrador@'%' IDENTIFIED BY 'administrador';
GRANT ALL ON laelsi.* TO administrador@'%';

/*

INSERT INTO administrador (nombre, apellido, password, email, telefono, usuario)
VALUES 
('Cesar', 'Ramírez', '9dejulio2325', 'tintapapelymusica@gmail.com', '3415076254', 'cramirez'),
('María', 'Gómez', 'securePass456', 'maria.gomez@example.com', '987654321', 'mgomez'),
('Carlos', 'López', 'mypassword789', 'carlos.lopez@example.com', '567890123', 'clopez'),
('Ana', 'Martínez', 'password321', 'ana.martinez@example.com', '345678901', 'amartinez'),
('Luis', 'Ramírez', 'adminPass001', 'luis.ramirez@example.com', '876543210', 'lramirez');

INSERT INTO categoria (nombre, descripcion, estado) VALUES
('Juguetería', 'Amplia variedad de juguetes y juegos educativos para niños de todas las edades.', 'Activo'),
('Librería', 'Artículos de librería, materiales de estudio y artículos de papelería para todas las necesidades.', 'Activo');

INSERT INTO item (nombre, foto, descripcion, precio, marca, cantVendidos, estado, stock, categoria_id) VALUES
/*Librería
('Cuaderno A5', 'cuaderno_a5.jpg', 'Cuaderno tamaño A5 con 100 hojas rayadas.', 2.99, 'EscribePro', 500, 'activo', 100, 2),
('Pluma Estilográfica', 'pluma_estilografica.jpg', 'Pluma estilográfica de alta calidad con tinta azul.', 19.99, 'InkFlow', 120, 'activo', 50, 2),
('Calculadora Científica FX100', 'calculadora_fx100.jpg', 'Calculadora científica con 300 funciones.', 29.99, 'CalcTech', 250, 'activo', 30, 2),
('Resaltadores Fluor', 'resaltadores_fluor.jpg', 'Set de 5 resaltadores con colores fluorescentes.', 5.49, 'HighlightCo', 600, 'activo', 200, 2),
('Pack de Lápices HB', 'lapices_hb.jpg', 'Pack de 10 lápices HB con goma.', 3.49, 'GraphitePro', 400, 'activo', 150, 2),
('Carpeta de Anillas', 'carpeta_anillas.jpg', 'Carpeta de 4 anillas tamaño A4.', 4.99, 'FileMaster', 300, 'activo', 100, 2),
('Bloc de Notas Adhesivas', 'bloc_notas.jpg', 'Bloc de notas adhesivas en varios colores.', 2.49, 'StickyNotes', 800, 'activo', 500, 2),
('Agenda 2024', 'agenda_2024.jpg', 'Agenda anual con diseño elegante y secciones organizadas.', 12.99, 'PlanIt', 150, 'activo', 75, 2),
/*Juguetería
('Bloques de Construcción', 'bloques_construccion.jpg', 'Set de 500 piezas para crear múltiples estructuras.', 24.99, 'BuildFun', 800, 'activo', 300, 1),
('Muñeca Interactiva', 'muneca_interactiva.jpg', 'Muñeca que habla y responde a comandos.', 34.99, 'ToyLife', 500, 'activo', 100, 1),
('Juego de Mesa Aventura', 'juego_aventura.jpg', 'Juego de mesa para toda la familia, ideal para tardes de diversión.', 19.99, 'GameLand', 600, 'activo', 120, 1),
('Auto de Carreras RC', 'auto_rc.jpg', 'Auto a control remoto con velocidad ajustable.', 39.99, 'SpeedToys', 350, 'activo', 80, 1),
('Rompecabezas 1000 piezas', 'rompecabezas_1000.jpg', 'Rompecabezas de alta calidad con temática de paisajes.', 14.99, 'PuzzleWorld', 700, 'activo', 200, 1),
('Set de Arte Infantil', 'set_arte_infantil.jpg', 'Kit con lápices, acuarelas y papel especial para niños.', 22.49, 'CreativeKids', 400, 'activo', 150, 1),
('Pelota de Fútbol', 'pelota_futbol.jpg', 'Pelota de fútbol para niños, ideal para exteriores.', 9.99, 'PlayBall', 900, 'activo', 300, 1),
('Pista de Autos', 'pista_autos.jpg', 'Pista para autos con curvas y elevaciones.', 29.99, 'TrackMasters', 250, 'activo', 100, 1);

*/

-- en terminal:
-- pnpm add -D typescript@5.1.3
-- pnpm add -D tsc-watch@6.0.4
-- pnpm add -E -D typescript tsc-watch @types/express @types/node
-- pnpm add -E @mikro-orm/core
-- pnpm add -E @mikro-orm/mysql
-- pnpm add -E reflect-metadata
-- pnpm add -E @mikro-orm/sql-highlighter