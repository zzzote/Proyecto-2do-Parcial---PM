import React, { useState } from 'react';
import {
  BarChart, Bar,
  PieChart, Pie,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer
} from 'recharts';

const ArtSurveyDashboard = () => {
  const [selectedChart, setSelectedChart] = useState('all');

  const surveyData = {
    q1: [
      { name: 'Pintura', value: 10 },
      { name: 'Música', value: 10 },
      { name: 'Escultura', value: 5 },
      { name: 'Danza', value: 4 },
      { name: 'Fotografía', value: 6 }
    ],
    q2: [
      { name: 'Mensualmente', value: 8 },
      { name: 'Ocasionalmente', value: 10 },
      { name: 'Nunca', value: 5 }
    ],
    q3: [
      { name: 'Contemporáneo', value: 15 },
      { name: 'Clásico', value: 10 },
      { name: 'Ambos', value: 8 }
    ],
    q4: [
      { name: 'Abstracto', value: 12 },
      { name: 'Figurativo', value: 10 },
      { name: 'Surrealista', value: 8 },
      { name: 'Realista', value: 10 }
    ],
    q5: [
      { name: 'Sí', value: 20 },
      { name: 'No', value: 30 }
    ],
    q6: [
      { name: 'Leonardo da Vinci', value: 15 },
      { name: 'Vincent van Gogh', value: 12 },
      { name: 'Pablo Picasso', value: 8 },
      { name: 'Dalí', value: 7 },
      { name: 'Otros', value: 5 }
    ],
    q7: [
      { name: 'La noche estrellada', value: 12 },
      { name: 'Guernica', value: 10 },
      { name: 'La persistencia...', value: 8 }
    ],
    q8: [
      { name: 'Expresión personal', value: 15 },
      { name: 'Crítica social', value: 12 },
      { name: 'Decorativo', value: 8 }
    ],
    q9: [
      { name: 'Sí', value: 25 },
      { name: 'No', value: 15 }
    ],
    q10: [
      { name: 'Emocionado', value: 20 },
      { name: 'Inspirado', value: 15 },
      { name: 'Indiferente', value: 5 }
    ]
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const ChartSelector = ({ onChange, value }) => (
    <div className="flex gap-2 mb-4 flex-wrap">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded ${value === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Todos
      </button>
      <button
        onClick={() => onChange('bar')}
        className={`px-4 py-2 rounded ${value === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Barras
      </button>
      <button
        onClick={() => onChange('pie')}
        className={`px-4 py-2 rounded ${value === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Pastel
      </button>
      <button
        onClick={() => onChange('line')}
        className={`px-4 py-2 rounded ${value === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Líneas
      </button>
      <button
        onClick={() => onChange('pictogram')}
        className={`px-4 py-2 rounded ${value === 'pictogram' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Pictograma
      </button>
    </div>
  );

  const renderChart = (type, data, containerHeight = 200) => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={containerHeight}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={containerHeight}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={containerHeight}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pictogram':
        return (
          <ResponsiveContainer width="100%" height={containerHeight}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const renderQuestionSection = (title, data) => {
    return (
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4 text-gray-800">{title}</h3>
        
        {selectedChart === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-[200px]">{renderChart('bar', data)}</div>
            <div className="h-[200px]">{renderChart('pie', data)}</div>
            <div className="h-[200px]">{renderChart('line', data)}</div>
            <div className="h-[200px]">{renderChart('pictogram', data)}</div>
          </div>
        ) : (
          <div className="h-[300px]">
            {renderChart(selectedChart, data, 300)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header Institucional */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
{/* Espacio para Logo */}
<div className="w-32 h-32  rounded flex items-center justify-center ">
  <img src={'/hostia.png'} alt="Logo" className="max-w-full max-h-full" />
</div>

          
          {/* Información Institucional */}
          <div className="flex-grow">
            <div className="text-center md:text-right space-y-2">
              <h1 className="text-xl font-bold text-gray-800">PLANTEL: Hermosillo V</h1>
              <p className="text-gray-600">HMO, Son. a 22 de octubre del 2024</p>
              <div className="space-y-1">
                <p className="font-medium">Los Chulos</p>
                <p>GRUPO: 108M</p>
                <p>Pensamiento Matemático</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header del Dashboard */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Resultados de la Encuesta de Arte</h2>
        <p className="text-gray-600 mb-4">Visualización de datos de la encuesta con múltiples tipos de gráficos</p>
        <ChartSelector onChange={setSelectedChart} value={selectedChart} />
      </div>

      {/* Contenido del Dashboard */}
      <div className="space-y-6">
        {renderQuestionSection("1. ¿Cuál es tu forma de arte favorita?", surveyData.q1)}
        {renderQuestionSection("2. ¿Con qué frecuencia visitas museos?", surveyData.q2)}
        {renderQuestionSection("3. ¿Prefieres arte contemporáneo o clásico?", surveyData.q3)}
        {renderQuestionSection("4. ¿Qué tipo de arte te inspira más?", surveyData.q4)}
        {renderQuestionSection("5. ¿Has tomado alguna clase o curso de arte?", surveyData.q5)}
        {renderQuestionSection("6. ¿Qué artista famoso admiras más?", surveyData.q6)}
        {renderQuestionSection("7. ¿Cuál es tu obra de arte favorita?", surveyData.q7)}
        {renderQuestionSection("8. ¿Qué papel crees que juega el arte en la sociedad?", surveyData.q8)}
        {renderQuestionSection("9. ¿Participas en actividades artísticas?", surveyData.q9)}
        {renderQuestionSection("10. ¿Cómo te sientes al ver una obra de arte?", surveyData.q10)}
      </div>
    </div>
  );
};

export default ArtSurveyDashboard;