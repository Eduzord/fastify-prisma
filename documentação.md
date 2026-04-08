# Iniciar e instalar dependencias
npm init -y
npm add typescript tsx prisma -D
* add => alias pro install
* -D => pacotes como devDependencies
npm install fastify

# Melhorar autocomplete no editor:
npm install -D @types/node

# Coração do typescript
npx tsc --init
descomentar o  "rootDir": "./src", "outDir": "./dist", em tsconfig.json
no package.json adicionar em scripts:
"dev": "tsx --watch src/server.ts"

# Executando o prisma
npx prisma init --datasource-provider sqlite --output ../generated/prisma

# Dar npx prisma generate para resolver erros de PrismaClient



# Aplicando as migrations no prisma
npx prisma migrate dev --name init

# Comando para abrir a interface web do prisma
npx prisma studio

# Instalar o prisma client
npm install @prisma/client

No tsconfig.json:
* descomentar rootDir e outDir
* mudar o target para es2026