import React, { useState, useEffect } from "react";

export const ItemCount = ({ stock, initial, onAdd, onFinish }) => {
  const [contador, setContador] = useState(initial);
  const [lessflag, setLessflag] = useState(false);
  const [moreflag, setMoreflag] = useState(false);

  useEffect(initial => {
    if (initial === 0) {
      setLessflag(true);
      setMoreflag(true);
    }
  }, [initial]);

  const sumar = () => {
    contador < stock && setContador(contador + 1);
    stock - contador === 1 && setMoreflag(true);
    setLessflag(false);
  };
  const restar = () => {
    contador && setContador(contador - 1);
    contador === 1 && setLessflag(true);
    setMoreflag(false);
  };
  const onEachAdd = () => {
    if (contador) {
      onAdd(contador);
      onFinish();
    }
  };
  return (
    <React.Fragment>
      <div>
        <div>
          <button disabled={lessflag} className="btn btn-info" onClick={restar}>
            -
          </button>
          <div className="font-weight-bold ml-2 mr-2">{contador}</div>
          <button disabled={moreflag} className="btn btn-info" onClick={sumar}>
            +
          </button>
        </div>
        <button className="btn btn-outline-info" onClick={onEachAdd}>
          Añadir
        </button>
      </div>{" "}
    </React.Fragment>
  );
};
