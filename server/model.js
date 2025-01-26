import { DataTypes, Model } from "sequelize";
import url from "url";
import util from "util";
import connectToDB from "./db.js";

export const db = await connectToDB(
  "postgresql://postgres:postgres@/tumble_tracker_db"
);

// Model definitions go here...
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
    },
    levelName: {
      type: DataTypes.STRING,
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
    },
    dayName: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "day",
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
    },
    startTime: {
      type: DataTypes.TIME,
    },
    endTime: {
      type: DataTypes.TIME,
    },
  },
  {
    modelName: "timeslot",
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
    },
  },
  {
    modelName: "coach",
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
    },
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

// Only execute if this file is run directly
if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing database...");
  await db.sync();
  console.log("Finished syncing database!");
}
