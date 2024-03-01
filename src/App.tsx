import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { addTodo, deleteAll, getAll, setAll } from "./service/allService";
import { Homerwork } from "./types/Homework";

import "../src/styles/style.scss";

const App: React.FC = () => {
  const [Homerworks, setHomerworks] = useState<Homerwork[]>(getAll());
  const [campos, setCampos] = useState<string[]>([]);
  const [nuevoCampo, setNuevoCampo] = useState<string>('');
  const [HomerworkEditando, setHomerworkEditando] = useState<Homerwork | null>(null);

  useEffect(() => {
    setHomerworks(getAll());
  }, []);


  const addHomerwork = () => {
    if (HomerworkEditando) {
      const nuevasHomerworks = Homerworks.map(t => (t.id === HomerworkEditando.id ? { ...t, title: nuevoCampo } : t));
      setHomerworks(nuevasHomerworks);
      setAll(nuevasHomerworks);
      setHomerworkEditando(null);
    } else {
      const nuevaHomerwork: Homerwork = {
        id: Date.now(),
        title: nuevoCampo,
        complete: false,
      };
      const nuevasHomerworks = [...Homerworks, nuevaHomerwork];
      setHomerworks(nuevasHomerworks);
      setAll(nuevasHomerworks);
    }

    setNuevoCampo('');
  };

  const editarHomerwork = (Homerwork: Homerwork) => {
    setNuevoCampo(Homerwork.title);
    setHomerworkEditando(Homerwork);
  };

  const eliminarHomerwork = (id: number) => {
    const nuevasHomerworks = deleteAll(id);
    setHomerworks(nuevasHomerworks);
    setHomerworkEditando(null);
  };

  return (
    <div className="container text-white">
      <Header />
      <div className='input-group mb-3'>
        <input
          type="text"
          value={nuevoCampo}
          onChange={(e) => setNuevoCampo(e.target.value)}
          placeholder="New field"
          className='form-control'
        />
        <button onClick={addHomerwork} type="button" className='btn btn-primary btn-sm float-right mr-2'>{HomerworkEditando ? 'Edit' : 'Add Homerwork'}</button>
      </div>

      <div>
        <h2>Homerworks</h2>
        <ul className="list-unstyled">
          {Homerworks.map((Homerwork) => (
            <li key={Homerwork.id} className="d-flex justify-content-between align-items-center mb-2">
              <span>{Homerwork.title}</span>
              <div>
                <button onClick={() => editarHomerwork(Homerwork)} className='btn btn-success btn-sm'>Edit</button>
                <button onClick={() => eliminarHomerwork(Homerwork.id)} className='btn btn-danger btn-sm'>X</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
