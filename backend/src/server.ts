import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { sequelize, connectAuthenticate } from "../config/database";
import user from "./routes/api/user";
import auth from "./routes/api/auth";
import pack from "./routes/api/package";
import depot from "./routes/api/depot";
import reasons from "./routes/api/reasons"
import bcrypt from "bcryptjs";

import { Role } from "./models/Role";
import { Depot } from "./models/Depot";
import { Status } from "./models/Status";
import { User } from "./models/User";
import { ReturnReason } from "./models/ReturnReason";

const app = express();

// Connect to DB
connectAuthenticate();
sequelize.sync({logging:false}).then(async res=>{
  console.log("Sync done");
  await createRolesAndAdminIfNotExist();
  await createDepotsIfNotExist();
  await createStatesIfNotExist();
  await createReturnReasonsIfNotExist();
});

// Express configuration
app.use(cors());
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/pack", pack); // Use the pack router
app.use("/api/depot", depot); 
app.use("/api/reasons", reasons); 


const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;


async function createRolesAndAdminIfNotExist(): Promise<void> {
  const rolesToCreate = [
    { role_name: 'Administrateur' },
    { role_name: 'Manager' },
    { role_name: 'Magasinier' },
    { role_name: 'Coursier' },
    { role_name: 'Fournisseur' }
  ];

  try {
    // Create roles if they don't exist
    for (const roleData of rolesToCreate) {
      const existingRole = await Role.findOne({ where: { role_name: roleData.role_name } as any });
      if (!existingRole) {
        await Role.create(roleData);
        console.log(`Role '${roleData.role_name}' created.`);
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

      // Create admin user
      const adminData = {
        username: 'marwa',
        password: hashedPassword,
        email: 'marwa@gmail.com',
        role_id: 1, // Assuming role_id 1 represents the admin role
        issuper:true
      };

    const existingAdmin = await User.findOne({ where: { username: adminData.username } as any });
    if (!existingAdmin) {
      await User.create(adminData);
      console.log('Admin user created.');
    } 
  } catch (error) {
    console.error('Error creating roles and admin:', error);
  }
}

async function createDepotsIfNotExist(): Promise<void> {
  const depotsToCreate = [
    { depot_name: 'Tunis', location: 'Tunis', contact_info: null },
    { depot_name: 'Sfax', location: 'Sfax', contact_info: null },
    { depot_name: 'Sousse', location: 'Sousse', contact_info: null },
    { depot_name: 'Mednine', location: 'Mednine', contact_info: null },
    { depot_name: 'Gafsa', location: 'Gafsa', contact_info: null }
  ];

  try {
    for (const depotData of depotsToCreate) {
      const existingDepot = await Depot.findOne({ where: { depot_name: depotData.depot_name } as any });
      if (!existingDepot) {
        await Depot.create(depotData);
        console.log(`Depot '${depotData.depot_name}' created.`);
      }
    }
  } catch (error) {
    console.error('Error creating depots:', error);
  }
}



async function createStatesIfNotExist(): Promise<void> {
  const statesToCreate = [
    { statusName: 'Brouillon' },
    { statusName: 'En attente de ramassage' },
    { statusName: 'En transit' },
    { statusName: 'En stock' },
    { statusName: 'En cours de livraison' },
    { statusName: 'Livré' },
    { statusName: 'Retourné' },
    { statusName: 'Livré et payé' },
    { statusName: 'Annulé' },
    { statusName: 'Pickup' }
  ];

  try {
    for (const stateData of statesToCreate) {
      const existingState = await Status.findOne({ where: { statusName: stateData.statusName } as any });
      if (!existingState) {
        await Status.create(stateData);
        console.log(`State '${stateData.statusName}' created.`);
      }
    }
  } catch (error) {
    console.error('Error creating states:', error);
  }
}

async function createReturnReasonsIfNotExist(): Promise<void> {
  const reasonsToCreate = [
    { reason_text: 'Pas de réponse' },
    { reason_text: 'Téléphone injoignable' },
    { reason_text: 'Client non sérieux' },
    { reason_text: 'Annulé par le fournisseur' },
    { reason_text: 'Annulé par le client' },
    { reason_text: 'Colis daté' }
  ];

  try {
    for (const reasonData of reasonsToCreate) {
      const existingReason = await ReturnReason.findOne({ where: { reason_text: reasonData.reason_text } as any });
      if (!existingReason) {
        await ReturnReason.create(reasonData);
        console.log(`Reason '${reasonData.reason_text}' created.`);
      }
    }
  } catch (error) {
    console.error('Error creating reasons:', error);
  }
}
