import './CalculadoraIMC.css';
import React, { useState } from 'react';

function CalculadoraIMC() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);

  function calcularIMC() {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!pesoNum || !alturaNum) {
      alert('Por favor, insira valores válidos de peso e altura.');
      return;
    }

   
    const imc = pesoNum / (alturaNum * alturaNum);
    setResultado(imc.toFixed(2));
  }

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2>Calculadora de IMC</h2>
      <label>
        Peso (kg):
        <input
          type="number"
          value={peso}
          onChange={e => setPeso(e.target.value)}
          placeholder="Ex: 70"
        />
      </label>
      <br />
      <label>
        Altura (m):
        <input
          type="number"
          step="0.01"
          value={altura}
          onChange={e => setAltura(e.target.value)}
          placeholder="Ex: 1.75"
        />
      </label>
      <br />
      <button onClick={calcularIMC}>Calcular</button>

      {resultado && (
        <div>
          <h3>Seu IMC é: {resultado}</h3>
          <p>
            {resultado < 18.5 && 'Abaixo do peso'}
            {resultado >= 18.5 && resultado < 25 && 'Peso normal'}
            {resultado >= 25 && resultado < 30 && 'Sobrepeso'}
            {resultado >= 30 && 'Obesidade'}
          </p>
        </div>
      )}
    </div>
  );
}

export default CalculadoraIMC;
