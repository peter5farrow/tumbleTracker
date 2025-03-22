import { DataTypes, Model } from "sequelize";
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
      type: DataTypes.ARRAY,
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

export class Level extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Level.init(
  {
    levelCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    levelName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coaches: {
      type: DataTypes.ARRAY,
      allowNull: true,
    },
    times: {
      type: DataTypes.JSONB, // Object to store times
      allowNull: true,
    },
  },
  {
    modelName: "level",
    sequelize: db,
  }
);

export class Event extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Event.init(
  {
    eventCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "event",
    sequelize: db,
  }
);

export class Coach extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Coach.init(
  {
    coachName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    modelName: "coach",
    sequelize: db,
  }
);

export { Day, Level, Event, Coach };
