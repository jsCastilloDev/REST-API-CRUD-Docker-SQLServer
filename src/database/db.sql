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
    email NVARCHAR(255) UNIQUE NOT NULL
);

-- Crear la tabla Procesos
CREATE TABLE Procesos (
    proceso_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(255) NOT NULL,
    propietario_id INT NULL,
    estado_actual NVARCHAR(50),
    FOREIGN KEY (propietario_id) REFERENCES Usuarios(usuario_id)
);