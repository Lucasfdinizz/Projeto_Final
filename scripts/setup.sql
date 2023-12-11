
CREATE TABLE Papeis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

INSERT INTO Papeis (nome) VALUES ("Admin");

CREATE TABLE Produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao VARCHAR(3000),
    preco FLOAT(10,2),
    imagem VARCHAR(100)
);

CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    senha VARCHAR(255),
    id_papel INT,
    FOREIGN KEY (id_papel) REFERENCES Papeis(id)
);