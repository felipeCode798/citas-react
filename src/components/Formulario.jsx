import {useState, useEffect} from 'react';
import Error from './Error';


function Formulario({pacientes, setPacientes, paciente, setPaciente}) {

    const [mascota, setMascota] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if( Object.keys(paciente).length > 0 ) {
            setMascota(paciente.mascota);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);

    const generarID = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar

        if([mascota, propietario, email, fecha, sintomas].includes('')) {
            console.log('Todos los campos son obligatorios');
            setError(true);
            return;
        }

        setError(false);

        // Crear un objeto con los datos
        const objetoPaciente = {
            mascota,
            propietario,
            email,
            fecha,
            sintomas,
        }

        if(paciente.id) {
            // Editar
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);

            setPacientes(pacientesActualizados);
            setPaciente({});
        }else {
            // Agregar
            objetoPaciente.id = generarID();
            setPacientes([...pacientes, objetoPaciente]);
        }


        // Reiniciar el form
        setMascota('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    return (
        <div className="md:w-1/2 lg:w-3/5 mx-5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes
            </h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Paciente y {''}
                <span className="text-indigo-600 font-bold">
                    Administralos
                </span>
            </p>

            <form onSubmit={handleSubmit} action="" className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                { error && <Error mensaje = 'Todos los campos son obligatorios'/>}
                <div className="">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input type="text" 
                        className="border-2 w-full p-2 mt-2 mb-10 placeholder-gray-400 rounded-md" 
                        placeholder="Nombre Mascota"
                        id="mascota"
                        value={mascota}
                        onChange={ e => setMascota(e.target.value) }
                    />
                </div>
                <div className="">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input type="text" 
                        className="border-2 w-full p-2 mt-2 mb-10 placeholder-gray-400 rounded-md" 
                        placeholder="Nombre Propietario"
                        id="propietario"
                        value={propietario}
                        onChange={ e => setPropietario(e.target.value) }
                    />
                </div>
                <div className="">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input type="email" 
                        className="border-2 w-full p-2 mt-2 mb-10 placeholder-gray-400 rounded-md" 
                        placeholder="email"
                        id="email"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>
                <div className="">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Fecha de alta
                    </label>
                    <input type="date" 
                        className="border-2 w-full p-2 mt-2 mb-10 placeholder-gray-400 rounded-md" 
                        placeholder="alta"
                        id="alta"
                        value={fecha}
                        onChange={ e => setFecha(e.target.value) }
                        />
                </div>
                <div className="">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Descripcion de los sintomas
                    </label>
                    <textarea id="sintomas" 
                        className="border-2 w-full p-2 mt-2 mb-10 placeholder-gray-400 rounded-md"
                        placeholder="Describe los Sintomas"
                        value={sintomas}
                        onChange={ e => setSintomas(e.target.value) }
                    />
                </div>
                <input 
                    type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}  
                />
            </form>
        </div>
    )
}

export default Formulario
