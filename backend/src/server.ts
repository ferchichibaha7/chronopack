import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { sequelize, connectAuthenticate } from "../config/database";
import user from "./routes/api/user";
import auth from "./routes/api/auth";
import { Role } from "./models/Role";
import { Depot } from "./models/Depot";

const app = express();

// Connect to DB
connectAuthenticate();
sequelize.sync({logging:false}).then(async res=>{
  console.log("Sync done");
  await createRolesIfNotExist();
  await createDepotsIfNotExist();
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

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;


async function createRolesIfNotExist(): Promise<void> {
  const rolesToCreate = [
    { role_name: 'Admin' },
    { role_name: 'Manager' },
    { role_name: 'Magasinier' },
    { role_name: 'Coursier' },
    { role_name: 'Fournisseur' }
  ];

  try {
    for (const roleData of rolesToCreate) {
      const existingRole = await Role.findOne({ where: { role_name: roleData.role_name } as any });
      if (!existingRole) {
        await Role.create(roleData);
        console.log(`Role '${roleData.role_name}' created.`);
      }
    }
  } catch (error) {
    console.error('Error creating roles:', error);
  }
}

async function createDepotsIfNotExist(): Promise<void> {
  const depotsToCreate = [
    { depot_name: 'Tunis',location:'Tunis' },
   
  ];

  try {
    for (const DepotData of depotsToCreate) {
      const existingDepot = await Depot.findOne({ where: { depot_name: DepotData.depot_name } as any });
      if (!existingDepot) {
        await Depot.create(DepotData);
        console.log(`Depot '${DepotData.depot_name}' created.`);
      }
    }
  } catch (error) {
    console.error('Error creating depots:', error);
  }
}