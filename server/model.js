import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import dotenv from "dotenv";

dotenv.config();

export const db = await connectToDB(process.env.POSTGRES_URI);

// Models
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
    },
    levelDays: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    levelCoaches: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    },
  },
  {
    modelName: "event",
    sequelize: db,
  }
);

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
    },
    dayLevels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    dayCoaches: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    modelName: "day",
    sequelize: db,
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
    coachLevels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    coachDays: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    modelName: "coach",
    sequelize: db,
  }
);

export class Timeslot extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Timeslot.init(
  {
    timeslotId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    modelName: "timeslot",
    sequelize: db,
  }
);

export class Rotation extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Rotation.init(
  {
    rotationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // levelId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // eventId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // dayId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // timeId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // coachIds: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: false,
    // },
  },
  {
    modelName: "rotation",
    sequelize: db,
  }
);

Level.hasMany(Rotation, { foreignKey: "levelCode" });
Rotation.belongsTo(Level, { foreignKey: "levelCode" });

Event.hasMany(Rotation, { foreignKey: "eventCode" });
Rotation.belongsTo(Event, { foreignKey: "eventCode" });

Day.hasMany(Rotation, { foreignKey: "dayCode" });
Rotation.belongsTo(Day, { foreignKey: "dayCode" });

Timeslot.hasMany(Rotation, { foreignKey: "timeslotId" });
Rotation.belongsTo(Timeslot, { foreignKey: "timeslotId" });

Coach.hasMany(Rotation, { foreignKey: "coachName" });
Rotation.belongsTo(Coach, { foreignKey: "coachName" });

//

// Level.hasMany(Coach, { foreignKey: "levelCode" });
// Coach.belongsTo(Level, { foreignKey: "levelCode" });
// Level.hasMany(Day, { foreignKey: "levelCode" });
// Day.belongsTo(Level, { foreignKey: "levelCode" });

// Day.hasMany(Level, { foreignKey: "dayCode" });
// Level.belongsTo(Day, { foreignKey: "dayCode" });
// Day.hasMany(Coach, { foreignKey: "dayCode" });
// Coach.belongsTo(Day, { foreignKey: "dayCode" });

// Coach.hasMany(Level, { foreignKey: "coachName" });
// Level.belongsTo(Coach, { foreignKey: "coachName" });
// Coach.hasMany(Day, { foreignKey: "coachName" });
// Day.belongsTo(Coach, { foreignKey: "coachName" });
