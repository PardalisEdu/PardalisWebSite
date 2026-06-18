import { relations } from "drizzle-orm";
// 1. Importamos `varchar` desde mysql-core
import { boolean, index, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  // Cambiado text -> varchar con longitud para la PK y el Unique
  id: varchar("id", { length: 255 }).primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = mysqlTable(
  "session",
  {
    // Cambiado text -> varchar porque se usa en PK, Unique e Index/FK
    id: varchar("id", { length: 255 }).primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = mysqlTable(
  "account",
  {
    // Cambiado text -> varchar para IDs que forman parte de relaciones o PK
    id: varchar("id", { length: 255 }).primaryKey(),
    accountId: varchar("account_id", { length: 255 }).notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    // Estos tokens sí pueden ser TEXT porque no llevan índices y pueden ser muy largos
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = mysqlTable(
  "verification",
  {
    // Cambiado text -> varchar porque 'id' es PK e 'identifier' está indexado abajo
    id: varchar("id", { length: 255 }).primaryKey(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const clases = mysqlTable("clases", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	nombre: varchar("nombre", { length: 300 }),
	descripcion: text("descripcion"),
	grado: mysqlEnum("grado", ['1ro','2do','3ro','4to','5to','6to']),
},
(table) => {
	return {
		gradoIdx: index("grado_idx").on(table.id, table.grado),
	}
});

export const usuarioClases = mysqlTable("usuario_clases", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	idUser: varchar("id_user", { length: 255 }).notNull(),
	idClase: varchar("id_clase", { length: 255 }).notNull(),
	rol: mysqlEnum("rol", ['alumno','profesor']).notNull(),
},
(table) => {
	return {
		userClase: index("user_clase").on(table.idUser),
		claseClases: index("clase_clases").on(table.idClase),
	}
});

export const codigosClase = mysqlTable("codigos_clase", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	codigo: varchar("codigo", { length: 6 }).notNull(),
	estado: mysqlEnum("estado", ['activo','inactivo']).notNull(),
	idClase: varchar("id_clase", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		claseCodigoClase: index("clase_codigo_clase").on(table.idClase),
	}
});

export const contenidoClase = mysqlTable("contenido_clase", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	idClase: varchar("id_clase", { length: 255 }).notNull(),
	typo: mysqlEnum("typo", ['texto','archivo']).notNull(),
	contenido: text("contenido").notNull(),
	idUser: varchar("id_user", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
  titulo: varchar("titulo", { length: 500 }).notNull(),
},
(table) => {
	return {
		claseContenido: index("clase_contenido").on(table.idClase),
		usuarioContenido: index("usuario_contenido").on(table.idUser),
	}
});
