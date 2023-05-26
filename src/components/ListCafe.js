import React, { useEffect, useState } from "react"

function ListCafe() {
    const [cafes, setCafes] = useState([]);
    const [selectedCafe, setSelectedCafe] = useState(null);
    const baseUrl = "http://localhost:3001";

    // Obtener la lista de cafe
    useEffect(() => {
        fetch(`${baseUrl}/cafes`)
            .then(response => response.json())
            .then(data => {
                setCafes(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Obtener los detalles de un cafe seleccionado
    useEffect(() => {
        if (selectedCafe) {
            fetch(`${baseUrl}/cafes/${selectedCafe}`)
                .then(response => response.json())
                .then(data => {
                    // Actualizar los detalles del cafe
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [selectedCafe]);

    const handleCafeClick = (cafeId) => {
        setSelectedCafe(cafeId);
    }

    //Generamos lista con solo la información de los cafe que se obtuvo en el useEffect anterior y los coloa en la tabla
    return (
        <div className="row">
            <div className="col-md-8">
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Región</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cafes.map(cafe => (
                                <tr key={cafe.id} onClick={() => handleCafeClick(cafe.id)}>
                                    <th scope="row">{cafe.id}</th>
                                    <td>{cafe.nombre}</td>
                                    <td>{cafe.tipo}</td>
                                    <td>{cafe.region}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{cafes[selectedCafe - 1].nombre}</h5>
                    <p className="card-text"> {cafes[selectedCafe - 1].fecha_cultivo}</p>
                    <img src={cafes[selectedCafe - 1].imagen} className="card-img-top" alt="Imagen del cafe" />
                    <p className="card-text">
                        Notas
                        {cafes[selectedCafe - 1].region}
                    </p>
                    <p className="card-text">{cafes[selectedCafe - 1].altura} msnm</p>
                </div>
            </div>
        </div>

    )
}

export default ListCafe;
