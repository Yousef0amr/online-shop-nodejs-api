import { DataTypes, Model } from "sequelize";

class Favorite extends Model {

}



const FavoriteModel = (sequelize) => Favorite.init({
    wishlist_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
}, {
    sequelize,
    modelName: "favorites",
    timestamps: false
})



export default FavoriteModel