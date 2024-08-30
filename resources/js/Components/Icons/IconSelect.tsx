import React from 'react';
import {Logo} from "@/Components/Icons/Logo";
import {FaPlus} from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6";
import {FaPeopleRoof} from "react-icons/fa6";
import {FaUsers} from "react-icons/fa";
import {MdOutlineMapsHomeWork} from "react-icons/md";
import {FaRegBuilding} from "react-icons/fa";
import {SiAwsorganizations} from "react-icons/si";
import {MdVpnLock} from "react-icons/md";
import {FaBuildingUser} from "react-icons/fa6";
import {FaUserCircle} from "react-icons/fa";
import {CiSquareMinus} from "react-icons/ci";
import {CiSquarePlus} from "react-icons/ci";
import {FaSearch} from "react-icons/fa";
import { LuSearchX } from "react-icons/lu";


type Props = {
    className: string;
    name: string;
}
const IconSelect = ({className, name}: Props) => {
    let DynamicComponent;
    switch (name) {
        case 'logo':
            DynamicComponent = Logo;
            break;
        case 'user':
            DynamicComponent = 'Users';
            break;
        case 'users':
            DynamicComponent = FaUsers;
            break;
        case 'employee':
            DynamicComponent = FaPeopleRoof;
            break;
        case 'position':
            DynamicComponent = MdOutlineMapsHomeWork;
            break;
        case 'department':
            DynamicComponent = FaRegBuilding;
            break;
        case 'add':
            DynamicComponent = FaPlus;
            break;
        case 'api':
            DynamicComponent = MdVpnLock;
            break;
        case 'trash':
            DynamicComponent = FaRegTrashCan;
            break;
        case 'chart':
            DynamicComponent = SiAwsorganizations;
            break;
        case 'jobs':
            DynamicComponent = FaBuildingUser;
            break;
        case 'profile':
            DynamicComponent = FaUserCircle;
            break;
        case 'minus':
            DynamicComponent = CiSquareMinus;
            break;
        case 'plus':
            DynamicComponent = CiSquarePlus;
            break;
        case 'search':
            DynamicComponent = FaSearch;
            break;
        case 'cancel':
            DynamicComponent = LuSearchX;
            break;
        default:
            DynamicComponent = FaRegTrashCan
    }
    return (
        <DynamicComponent className={className}/>
    );
};

export default IconSelect;
