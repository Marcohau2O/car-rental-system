import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Creando ADMIN inicial...");

  const adminRole = await prisma.rol.upsert({
    where: { nombre: "ADMIN" },
    update: {},
    create: {
      nombre: "ADMIN"
    }
  });

  const permisos = [
    "user:create",
    "user:update",
    "user:delete",
    "auto:create",
    "auto:update",
    "auto:delete",
  ];

  for (const accion of permisos) {
    await prisma.permiso.upsert({
      where: { accion },
      update: {},
      create: {
        accion,
        rolId: adminRole.id
      }
    });
  }

  const passwordHash = await bcrypt.hash("admin123", 10);

  const adminUser = await prisma.usuario.upsert({
    where: { correo: "admin@admin.com" },
    update: {},
    create: {
      nombre: "Super Admin",
      correo: "admin@admin.com",
      password: passwordHash,
      telefono: "0000000000",
      roleId: adminRole.id
    }
  });

  console.log("✅ ADMIN creado correctamente");

  await prisma.logs.create({
    data: {
      accion: "CREATE_ADMIN",
      descripcion: "Se creó el ADMIN inicial",
      usuarioId: adminUser.id
    }
  });

  console.log("🧾 Log registrado");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 