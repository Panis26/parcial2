import React, { useEffect, useState } from "react"
import { FormattedDate, IntlProvider } from "react-intl"
import { FormattedMessage } from "react-intl"

function ListCafe() {
    const [cafes, setCafes] = useState([]);
    const [selectedCafe, setSelectedCafe] = useState(null);
    const baseUrl = "http://localhost:3001";

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

    useEffect(() => {
        if (selectedCafe !== null) {
            fetch(`${baseUrl}/cafes/${selectedCafe}`)
                .then(response => response.json())
                .then(data => {
                    // Actualizar los detalles del café
                    setCafes(prevCafes => {
                        const updatedCafes = [...prevCafes];
                        updatedCafes[selectedCafe - 1] = data;
                        return updatedCafes;
                    });
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
                <div className="row justify-content-end" >
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">
                                    <FormattedMessage id="Name" />
                                    </th>
                                <th scope="col">
                                    <FormattedMessage id="Type" />
                                </th>
                                <th scope="col">
                                    <FormattedMessage id="Region" />
                                </th>
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
            <div className="col-md-4">
                <div className="card h-100 rounded" style={{ maxWidth: '300px' }}>
                    <div className="card-body text-center">
                        {selectedCafe !== null && (
                            <>
                                <h5 className="card-title">{cafes[selectedCafe - 1].nombre}</h5>
                                <p className="card-text">
                                    <FormattedDate
                                        value={new Date(cafes[selectedCafe - 1].fecha_cultivo)}
                                        year="numeric"
                                        month="long"
                                        day="numeric"
                                        weekday="long"
                                    />
                                </p>  
                                <img
                                    src={cafes[selectedCafe - 1].imagen}
                                    className="card-img-top img-fluid"
                                    alt="Imagen del café"
                                    style={{ maxWidth: '100%' }}
                                />
                                <p className="card-text">
                                    Notas:
                                    {cafes[selectedCafe - 1].notas}
                                </p>
                                <p className="card-text">{cafes[selectedCafe - 1].altura} msnm</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCafe;
