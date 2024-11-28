CREATE DATABASE IF NOT EXISTS laelsi;

CREATE USER IF NOT EXISTS 'administrador'@'%' IDENTIFIED BY 'administrador';
GRANT ALL ON laelsi.* TO 'administrador'@'%';

-- en terminal:
-- pnpm add -D typescript@5.1.3
-- pnpm add -D tsc-watch@6.0.4
-- pnpm add -E -D typescript tsc-watch @types/express @types/node
-- pnpm add -E @mikro-orm/core
-- pnpm add -E @mikro-orm/mysql
-- pnpm add -E reflect-metadata
-- pnpm add -E @mikro-orm/sql-highlighter