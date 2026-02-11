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

  const userRole = await prisma.rol.upsert({
    where: { nombre: "USER" },
    update: {},
    create: {
      nombre: "USER",
    }
  })

  const personalRole = await prisma.rol.upsert({
    where: { nombre: "PERSONAL" },
    update: {},
    create: {
      nombre: "PERSONAL"
    }
  })

  const permisos = [
    "user:create",
    "user:update",
    "user:delete",

    "auto:create",
    "auto:update",
    "auto:delete",

    "dashboard:view",
    "reservas:view",
    "calendario:view",
  ];

  const permisosCreados = {};

  for (const accion of permisos) {
    const permiso = await prisma.permiso.upsert({
      where: { accion },
      update: {},
      create: { accion }
    });
    permisosCreados[accion] = permiso.id;
  }

  for (const accion of permisos) {
    await prisma.RolPermiso.upsert({
      where: {
        rolId_permisoId: {
          rolId: adminRole.id,
          permisoId: permisosCreados[accion]
        }
      },
      update: {},
      create: {
        rolId: adminRole.id,
        permisoId: permisosCreados[accion]
      }
    });
  }

  const permisosPersonal = [
    "dashboard:view",
    "reservas:view",
    "calendario:view",
    "auto:update"
  ];

  for (const accion of permisosPersonal) {
    await prisma.RolPermiso.upsert({
      where: {
        rolId_permisoId: {
          rolId: personalRole.id,
          permisoId: permisosCreados[accion]
        }
      },
      update: {},
      create: {
        rolId: personalRole.id,
        permisoId: permisosCreados[accion]
      }
    });
  }

  const passwordHash = await bcrypt.hash("admin123", 10);
  const personalPass = await bcrypt.hash("personal123", 10);

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

  await prisma.usuario.upsert({
    where: { correo: "personal@personal.com" },
    update: {},
    create: {
      nombre: "Personal Demo",
      correo: "personal@personal.com",
      password: personalPass,
      telefono: "8888888888",
      roleId: personalRole.id
    }
  })

  console.log("✅ Usuarios Creados con su Roles y Permisos");

  await prisma.logs.create({
    data: {
      accion: "SEED_ SISTEMA",
      descripcion: "Sistema incial creado con roles y permisos",
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
 