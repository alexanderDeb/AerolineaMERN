import React, { useState, useEffect } from "react";

export default function FlightSearch() {
  //Creamos los estados
  //El primero contendra los paises y el segundo las letras ingresadas por el usuario
  const [countries, setCountries] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [result, setResult] = useState([]);
  const [searchOrigin, setSearchOrigin] = useState("");
  const [searchDestination, setSearchDestination] = useState("");

  //creamos una constante llamada URI para almacenar la ruta del API
  const URI = "http://localhost:8000/api/";

  //Creamos la funcion para consultar el API y traer los paises
  const getCountries = async () => {
    try {
      const response = await fetch(URI + "countries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (countries != []) {
        data.map((x) => {
          countries.push(x.name);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFlights = async () => {
    try {
      const response = await fetch(URI + "flights", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFlights(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Creamos la funcion que escucha los cambios en el input de origen
  const SearcherOrigin = (e) => {
    setSearchOrigin(e.target.value);

    const valor = e.target.value;
    const Filtrado = (arr, query) => {
      return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
    };
    if (valor != "") {
      setResult(Filtrado(countries, valor));
    } else if (searchOrigin == "") {
      setResult([]);
    }
    console.log(valor);
    console.log(result);
  };

  //Creamos la funcion que escucha los cambios en el input de destino
  const SearcherDestination = (e) => {
    setSearchDestination(e.target.value);
  };

  //Se va a utilizar un hook llamado useEffect para ejecutar automaticamente la funcion
  useEffect(() => {
    getCountries();
    getFlights();
  }, []);

  return (
    <div className="flex flex-col w-full h-full pt-6 space-y-8">
      <div className="flex flex-row justify-center items-center space-x-4">
        <div>
          <input
            type="text"
            value={searchOrigin}
            onChange={SearcherOrigin}
            placeholder="Origen"
            className="input input-bordered w-80"
          />
          {result.length == 166 ? (
            <div className="hidden"></div>
          ) : (
            <ul className="absolute z-30 menu menu-sm bg-base-200 w-80 h-auto max-h-max rounded-box overflow-y-auto">
              {result ? (
                <li className="text-black">
                  {result.map((x) => {
                    return (
                      <button
                        onClick={(e) => {
                          setSelectedOrigin(e.target.value);
                        }}
                        value={x}
                        id={x}
                      >
                        {x}
                      </button>
                    );
                  })}
                </li>
              ) : (
                <li></li>
              )}
            </ul>
          )}
        </div>
        <div>TO</div>
        <div>
          <input
            type="text"
            value={searchDestination}
            onChange={SearcherDestination}
            placeholder="Destino"
            className="input input-bordered"
          />
        </div>
        <div>
          <button className="btn btn-primary">Hola</button>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
