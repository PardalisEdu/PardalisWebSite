CREATE TABLE `clases` (
	`id` varchar(255) NOT NULL,
	`nombre` varchar(300),
	`descripcion` text,
	`grado` enum('1ro','2do','3ro','4to','5to','6to'),
	CONSTRAINT `clases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `codigos_clase` (
	`id` varchar(255) NOT NULL,
	`codigo` varchar(6) NOT NULL,
	`estado` enum('activo','inactivo') NOT NULL,
	`id_clase` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `codigos_clase_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contenido_clase` (
	`id` varchar(255) NOT NULL,
	`id_clase` varchar(255) NOT NULL,
	`typo` enum('texto','archivo') NOT NULL,
	`contenido` text NOT NULL,
	`id_user` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`titulo` varchar(500) NOT NULL,
	CONSTRAINT `contenido_clase_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usuario_clases` (
	`id` varchar(255) NOT NULL,
	`id_user` varchar(255) NOT NULL,
	`id_clase` varchar(255) NOT NULL,
	`rol` enum('alumno','profesor') NOT NULL,
	CONSTRAINT `usuario_clases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `grado_idx` ON `clases` (`id`,`grado`);--> statement-breakpoint
CREATE INDEX `clase_codigo_clase` ON `codigos_clase` (`id_clase`);--> statement-breakpoint
CREATE INDEX `clase_contenido` ON `contenido_clase` (`id_clase`);--> statement-breakpoint
CREATE INDEX `usuario_contenido` ON `contenido_clase` (`id_user`);--> statement-breakpoint
CREATE INDEX `user_clase` ON `usuario_clases` (`id_user`);--> statement-breakpoint
CREATE INDEX `clase_clases` ON `usuario_clases` (`id_clase`);