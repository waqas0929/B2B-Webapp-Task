import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import userModel from "./userModel.js";
import productModel from "../models/productModel.js"



const salesModel = sequelize.define("sale", {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    userId:{
        type: DataTypes.UUID,
        references: {
            model: userModel,
            key: "id"
        },
        allowNull: false
    },
    
    productId:{
        type:DataTypes.UUID,
        references:{
            model: productModel,
            key:"id"
        },
        allowNull:false
    },

    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalAmount:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
})



export default salesModel