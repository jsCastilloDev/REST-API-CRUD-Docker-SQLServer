--CREATE DATABASE BPM_Management;

USE BPM_Management;
-- Eliminar la tabla Procesos
--DROP TABLE IF EXISTS Procesos;

-- Eliminar la tabla Usuarios
--DROP TABLE IF EXISTS Usuarios;

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    usuario_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) UNIQUE,
    rol NVARCHAR(50) NOT NULL, -- Ej: 'Colaborador', 'Responsable', 'Administrador'
    subgerencia NVARCHAR(100), -- Subgerencia a la que pertenece el usuario
    fecha_creacion DATETIME DEFAULT GETDATE()
);

-- Crear la tabla Procesos
CREATE TABLE Procesos (
    proceso_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(255) NOT NULL,
    descripcion NVARCHAR(MAX),
    responsable_id INT, -- FK a Usuarios
    equipo_asignado NVARCHAR(50) NULL, -- Ej: 'BPM', 'Célula', 'COEs'
    horas_hombre DECIMAL(10,2) NULL, -- Horas Hombre (HH) asignadas al proceso
    proceso_padre_id INT NULL, -- FK auto-referenciada a la misma tabla
    fecha_creacion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (responsable_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (proceso_padre_id) REFERENCES Procesos(proceso_id) -- Auto-referencia a la misma tabla
);