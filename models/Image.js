import { DataTypes, Model } from 'sequelize';



class Image extends Model {

}


const ImageModel = (sequelize) => Image.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: 'images',
        timestamps: false
    }
);







export default ImageModel