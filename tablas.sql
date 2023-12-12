use AdoptaYDona;

CREATE TABLE Usuarios (
	ID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	NOMBRE varchar(100) NOT NULL,
	CONTRASENA varchar(100) NOT NULL,
	CORREO varchar(100) NOT NULL,
	GENERO char(1) NULL,
	UBICACION varchar(MAX) NULL,
	FECHACREACION DATETIME NOT NULL,
	RUTA_IMAGEN varchar(MAX) NULL
);

CREATE TABLE Animales (
	ID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	NOMBRE varchar(100) NOT NULL,
	EDAD INT NULL,
	GENERO char(1) NULL,
	TIPO varchar(100) NOT NULL,
	USUARIOID INT NOT NULL,
	FECHACREACION DATETIME NOT NULL,
	ESTATUS char(1) NOT NULL,
	FOREIGN KEY (USUARIOID) REFERENCES Usuarios(ID)
);


CREATE TABLE AnimalesImagenes (
	ID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	ANIMALID INT NOT NULL,
	RUTA_IMAGEN varchar(MAX) NOT NULL,
	FOREIGN KEY (ANIMALID) REFERENCES Animales(ID)
);

CREATE TABLE AnimalesSolicitudes (
	ID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	USUARIOEMISORID INT NOT NULL,
	USUARIORECEPTORID INT NOT NULL,
	FOREIGN KEY (USUARIOEMISORID) REFERENCES Usuarios(ID),
	FOREIGN KEY (USUARIORECEPTORID) REFERENCES Usuarios(ID)
);

CREATE TABLE Mensajes (
	ID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	DESCRIPCION varchar(MAX) NOT NULL,
	USUARIOEMISORID INT NOT NULL,
	USUARIORECEPTORID INT NOT NULL,
	FECHACREACION DATETIME NOT NULL,
	ENTIDAD char(1) NOT NULL,
	FOREIGN KEY (USUARIOEMISORID) REFERENCES Usuarios(ID),
	FOREIGN KEY (USUARIORECEPTORID) REFERENCES Usuarios(ID)
);