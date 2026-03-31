# Iniciar e instalar dependencias
npm init -y
npm add typescript tsx prisma -D
* add => alias pro install
* -D => pacotes como devDependencies

# Melhorar autocomplete no editor:
npm install -D @types/nodes

# Coração do typescript
npx tsc --init

# Executando o prisma
npx prisma init --datasource-provider sqlite --output ../generated/prisma

No tsconfig.json:
* descomentar rootDir e outDir
* mudar o target para es2026