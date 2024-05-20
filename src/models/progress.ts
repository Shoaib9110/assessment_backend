import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';
import { User } from './user';

// Define the attributes interface
interface ProgressAttributes {
  id: number;
  user_id: number;
  value: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define a type for creation attributes excluding the primary key
interface ProgressCreationAttributes extends Optional<ProgressAttributes, 'id'> {}

// Define the model class
class Progress extends Model<ProgressAttributes, ProgressCreationAttributes>
  implements ProgressAttributes {
  public id!: number;
  public user_id!: number;
  public value!: number;
  public date!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Declare the virtual field
  public get formattedDate(): string | null {
    const dateValue = this.date;
    if (!dateValue) return null;
    return dateValue.toISOString().split('T')[0];
  }
}

// Initialize the model
Progress.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Progress',
  tableName: 'progress',
  timestamps: false,
});

// Define association
Progress.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Progress, { foreignKey: 'user_id' });

export default Progress;
