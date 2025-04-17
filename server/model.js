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
  },
  {
    modelName: "day",
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
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    coachName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "coach",
    sequelize: db,
  }
);

// export class Timeslot extends Model {
//   [util.inspect.custom]() {
//     return this.toJSON();
//   }
// }
// Timeslot.init(
//   {
//     timeslotId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     startTime: {
//       type: DataTypes.TIME,
//       allowNull: false,
//     },
//     endTime: {
//       type: DataTypes.TIME,
//       allowNull: false,
//     },
//   },
//   {
//     modelName: "timeslot",
//     sequelize: db,
//   }
// );

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
    levelCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayCode: {
      type: DataTypes.STRING,
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
    modelName: "rotation",
    sequelize: db,
  }
);

// Junction Tables

export class LevelDay extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
LevelDay.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    modelName: "level_days",
    tableName: "level_days",
    sequelize: db,
  }
);

export class DayCoach extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
DayCoach.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    modelName: "day_coaches",
    tableName: "day_coaches",
    sequelize: db,
  }
);

export class CoachLevel extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
CoachLevel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    modelName: "coach_levels",
    tableName: "coach_levels",
    sequelize: db,
  }
);

export class RotationCoach extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
RotationCoach.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    modelName: "rotation_coaches",
    tableName: "rotation_coaches",
    sequelize: db,
  }
);

//

Level.hasMany(Rotation, { foreignKey: "levelCode" });
Rotation.belongsTo(Level, { foreignKey: "levelCode" });

Event.hasMany(Rotation, { foreignKey: "eventCode" });
Rotation.belongsTo(Event, { foreignKey: "eventCode" });

Day.hasMany(Rotation, { foreignKey: "dayCode" });
Rotation.belongsTo(Day, { foreignKey: "dayCode" });

// Timeslot.hasMany(Rotation, { foreignKey: "timeslotId" });
// Rotation.belongsTo(Timeslot, { foreignKey: "timeslotId" });

//

Level.belongsToMany(Day, { through: LevelDay });
Day.belongsToMany(Level, { through: LevelDay });

Day.belongsToMany(Coach, { through: DayCoach });
Coach.belongsToMany(Day, { through: DayCoach });

Coach.belongsToMany(Level, { through: CoachLevel });
Level.belongsToMany(Coach, { through: CoachLevel });

Rotation.belongsToMany(Coach, { through: RotationCoach });
Coach.belongsToMany(Rotation, { through: RotationCoach });

// db.sync({ force: true });
