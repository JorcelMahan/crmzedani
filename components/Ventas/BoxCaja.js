import React, {useContext} from "react";
import CajaContext from "../../context/caja/CajaContext";

const BoxCaja = () => {
    const cajaContext = useContext(CajaContext);
    const {caja} = cajaContext;
    return (
        <div>
            <p>Caja : {caja}</p>
        </div>
    )
}

export default BoxCaja;