import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import {User} from './user';

class Progress extends Model {}

Progress.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Progress',
    tableName: 'progress',
    timestamps: false
});

// Define association
Progress.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Progress, { foreignKey: 'user_id' });

export default Progress;
