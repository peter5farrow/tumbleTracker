import { Model, DataTypes } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import dotenv from "dotenv";

dotenv.config();

export const db = await connectToDB(process.env.POSTGRES_URI);

// Models

export class Day extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Day.init(
  {
    dayCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    dayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    levels: {
      type: DataTypes.JSONB, // JSONB can store an array of objects (level data)
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeSave: (day) => {
        const levelOrder = [
          "pre3A",
          "pre3B",
          "pre45A",
          "pre45B",
          "whiteRibA",
          "whiteRibB",
          "redRibA",
          "redRibB",
          "blueRibA",
          "blueRibB",
          "bronzeMedA",
          "bronzeMedB",
          "silvMedA",
          "silvMedB",
          "begBoys",
          "intBoys",
          "begTumb",
          "intTumb",
          "cheerTumb",
          "airAware",
          "hotShotFoun",
          "hotShotAdv",
          "hotTots",
          "xcelA",
          "xcelSilver",
          "xcelGold",
          "level3",
          "level4",
          "optionalA",
          "optionalB",
        ];

        if (day.levels && Array.isArray(day.levels)) {
          day.levels.sort((a, b) => {
            const indexA = levelOrder.indexOf(a.levelCode);
            const indexB = levelOrder.indexOf(b.levelCode);

            if (indexA === -1 || indexB === -1) return 0;
            return indexA - indexB;
          });
        }
      },
    },
  },
  {
    modelName: "day",
    sequelize: db,
  }
);

// continue updating...

const Level = sequelize.define("Level", {
  levelCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  levelName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coaches: {
    type: DataTypes.JSONB, // Array of coaches
    allowNull: true,
  },
  times: {
    type: DataTypes.JSONB, // Object to store times
    allowNull: true,
  },
});

const Event = sequelize.define("Event", {
  eventCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Coach = sequelize.define("Coach", {
  coachName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Day, Level, Event, Coach };
