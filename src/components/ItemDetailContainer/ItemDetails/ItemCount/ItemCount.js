import React, { useState, useEffect } from "react";

export const ItemCount = ({ stock, initial, onAdd, onFinish, setVariantChosen }) => {
  const [contador, setContador] = useState(initial);
  const [lessflag, setLessflag] = useState(false);
  const [moreflag, setMoreflag] = useState(false);
  const [addFlag, setAddFlag] = useState(false);

  // TODO fix that I'm able to click añadir without choosing a variant

  useEffect(() => {
    setContador(initial)
    }, [initial])

  useEffect(() => {
    if (stock <= 0) {
      setLessflag(true);
      setMoreflag(true);
      setAddFlag(true);
    }
  }, [stock]);

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
    setVariantChosen(false);
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
        <button disabled={addFlag} className="btn btn-outline-info" onClick={onEachAdd}>
          Añadir
        </button>
      </div>{" "}
    </React.Fragment>
  );
};
