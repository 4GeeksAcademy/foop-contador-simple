import React, { useState, useEffect, useRef } from 'react';


const SecondsCounter = () => {
    

    const [seconds, setSeconds] = useState(0); 
    const [isRunning, setIsRunning] = useState(false);
    
    // ¿Estamos en modo cuenta regresiva?
    const [isCountdown, setIsCountdown] = useState(false);
    
    // Stop y Reset
    const [stopClicked, setStopClicked] = useState(false);

    // --- Inputs del Usuario ---
    const [countdownFrom, setCountdownFrom] = useState(""); 
    
    // Tiempo para alerta
    const [alertAt, setAlertAt] = useState("");

     const intervalRef = useRef(null);

 //Contador
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                if (isCountdown) {
                    setSeconds(prevSeconds => {
                        if (prevSeconds <= 1) {
                            clearInterval(intervalRef.current);
                            setIsRunning(false);
                            alert("¡Tiempo cumplido!");
                            return 0;
                        }
                        return prevSeconds - 1; 
                    });

                } else {
                    setSeconds(prevSeconds => {
                        const newSeconds = prevSeconds + 1;
                        //Alerta
                        if (alertAt && newSeconds === parseInt(alertAt, 10)) {
                            alert(`¡Alerta! Se alcanzaron los ${alertAt} segundos.`);
                        }
                        return newSeconds; // Suma 1
                    });
                }
            }, 1000); 
        } else {
            clearInterval(intervalRef.current);
        }

        // Función de limpieza
        return () => clearInterval(intervalRef.current);

    }, [isRunning, isCountdown, alertAt]);


    // --- Botones ---
    const handleStartPause = () => {
        if (isCountdown && !isRunning && seconds === 0) {
            setSeconds(parseInt(countdownFrom, 10) || 0);
        }
        setIsRunning(!isRunning);
        setStopClicked(false);
    };

    const handleStop = () => {
        setIsRunning(false);

        if (stopClicked) {
            setSeconds(isCountdown ? (parseInt(countdownFrom, 10) || 0) : 0);
            setStopClicked(false);
        } else {
            setStopClicked(true);//Primer click
        }
    };

    const handleModeToggle = () => {
        setIsRunning(false);
        setSeconds(0);
        setStopClicked(false);
        setIsCountdown(!isCountdown); // Cambia a cuenta regresiva
    };

    const formatTime = (num) => {
        return num.toString().padStart(6, '0');
    };

    return (
        <div className="w-100">
            {/*Display del contador */}
            <div className="counter-display">
                {formatTime(seconds)}
            </div>

            {/* Panel de Controles */}
            <div className="control-panel shadow-sm p-3 my-4 rounded">
                <div className="d-flex justify-content-center gap-2 mb-3">
                    {/* Boton Start/Pause */}
                    <button 
                        className={`btn ${isRunning ? 'btn-warning' : 'btn-success'} btn-lg`}
                        onClick={handleStartPause}
                    >
                        {isRunning ? "Pausa" : "Encender"}
                    </button>
                    
                    {/* Boton Stop/Reset */}
                    <button 
                        className={`btn ${stopClicked ? 'btn-primary' : 'btn-danger'} btn-lg`}
                        onClick={handleStop}
                    >
                        {stopClicked ? "Reiniciar" : "Stop"}
                    </button>
                </div>
            </div>

            {/* Panel de Opciones */}
            <div className="options-panel shadow-sm p-3 rounded">
                {/* Checkbox para cambiar de modo */}
                <div className="form-check form-switch mb-3 d-flex justify-content-center fs-5">
                    <input 
                        className="form-check-input me-2" 
                        type="checkbox" 
                        role="switch" 
                        id="modeSwitch"
                        checked={isCountdown}
                        onChange={handleModeToggle}
                    />
                    <label className="form-check-label" htmlFor="modeSwitch">
                        {isCountdown ? "Modo: Cuenta Regresiva" : "Modo: Contador Normal"}
                    </label>
                </div>

                {/* Inputs*/}
                {isCountdown ? (
                    <div className="input-group">
                        <span className="input-group-text">Contar desde (seg.):</span>
                        <input 
                            type="number" 
                            className="form-control"
                            placeholder="Ej: 60"
                            value={countdownFrom}
                            onChange={(e) => setCountdownFrom(e.target.value)}
                            disabled={isRunning}
                        />
                    </div>
                ) : (
                    <div className="input-group">
                        <span className="input-group-text">Alertar a los (seg.):</span>
                        <input 
                            type="number" 
                            className="form-control"
                            placeholder="Ej: 10"
                            value={alertAt}
                            onChange={(e) => setAlertAt(e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecondsCounter;