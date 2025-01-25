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
    levelId: {
      type: DataTypes.INTEGER,
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
    eventId: {
      type: DataTypes.INTEGER,
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
    dayId: {
      type: DataTypes.INTEGER,
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
    coachId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    coachName: {
      type: DataTypes.STRING,
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
    levelId: {
      type: DataTypes.INTEGER,
    },
    eventId: {
      type: DataTypes.INTEGER,
    },
    dayId: {
      type: DataTypes.INTEGER,
    },
    timeslotId: {
      type: DataTypes.INTEGER,
    },
    coachId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "rotation",
    sequelize: db,
  }
);

Level.hasMany(Rotation, { foreignKey: "levelId" });
Rotation.belongsTo(Level, { foreignKey: "levelId" });
Event.hasMany(Rotation, { foreignKey: "eventId" });
Rotation.belongsTo(Event, { foreignKey: "eventId" });
Day.hasMany(Rotation, { foreignKey: "dayId" });
Rotation.belongsTo(Day, { foreignKey: "dayId" });
Timeslot.hasMany(Rotation, { foreignKey: "timeslotId" });
Rotation.belongsTo(Timeslot, { foreignKey: "timeslotId" });
Coach.hasMany(Rotation, { foreignKey: "coachId" });
Rotation.belongsTo(Coach, { foreignKey: "coachId" });

// Only execute if this file is run directly
if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing database...");
  await db.sync();
  console.log("Finished syncing database!");
}
