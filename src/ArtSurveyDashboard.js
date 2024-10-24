import React, { useState } from 'react';
import {
  BarChart, Bar,
  PieChart, Pie,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer
} from 'recharts';
import { User, Users, Smile, Heart, Star, Music, Camera, Palette, Book, Coffee } from 'lucide-react';

const ArtSurveyDashboard = () => {
  const [selectedChart, setSelectedChart] = useState('all');

  const surveyData = {
    q1: [
      { name: 'Pintura', value: 11 },
      { name: 'Música', value: 10 },
      { name: 'Escultura', value: 8 },
      { name: 'Danza', value: 6 },
      { name: 'Fotografía', value: 5 }
    ],
    q2: [
      { name: 'Mensualmente', value: 15 },
      { name: 'Ocasionalmente', value: 15 },
      { name: 'Nunca', value: 10 }
    ],
    q3: [
      { name: 'Contemporáneo', value: 15 },
      { name: 'Clásico', value: 15 },
      { name: 'Ambos', value: 10 }
    ],
    q4: [
      { name: 'Abstracto', value: 12 },
      { name: 'Figurativo', value: 10 },
      { name: 'Surrealista', value: 10 },
      { name: 'Realista', value: 8 }
    ],
    q5: [
      { name: 'Sí', value: 25 },
      { name: 'No', value: 15 }
    ],
    q6: [
      { name: 'Leonardo da Vinci', value: 12 },
      { name: 'Vincent van Gogh', value: 10 },
      { name: 'Pablo Picasso', value: 8 },
      { name: 'Dalí', value: 6 },
      { name: 'Otros', value: 4 }
    ],
    q7: [
      { name: 'La noche estrellada', value: 15 },
      { name: 'Guernica', value: 15 },
      { name: 'La persistencia...', value: 10 }
    ],
    q8: [
      { name: 'Expresión personal', value: 15 },
      { name: 'Crítica social', value: 15 },
      { name: 'Decorativo', value: 10 }
    ],
    q9: [
      { name: 'Sí', value: 25 },
      { name: 'No', value: 15 }
    ],
    q10: [
      { name: 'Emocionado', value: 20 },
      { name: 'Inspirado', value: 12 },
      { name: 'Indiferente', value: 8 }
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
        onClick={() => onChange('histogram')}
        className={`px-4 py-2 rounded ${value === 'histogram' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Histograma
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
        onClick={() => onChange('people')}
        className={`px-4 py-2 rounded ${value === 'people' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Pictograma
      </button>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="label">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const getIconForCategory = (category) => {
    switch (category.toLowerCase()) {
      case 'pintura':
      case 'arte':
        return Palette;
      case 'música':
        return Music;
      case 'fotografía':
        return Camera;
      case 'sí':
      case 'emocionado':
        return Smile;
      case 'inspirado':
        return Heart;
      case 'no':
      case 'indiferente':
        return Coffee;
      default:
        return User;
    }
  };
  const renderChart = (type, data, containerHeight = 200) => {
    const chartContainerClass = "bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 h-full hover:border-blue-300 transition-colors duration-300";
    
    // Función auxiliar para crear datos del histograma
    const createHistogramData = (data) => {
      // Encontrar el valor mínimo y máximo
      const values = data.map(d => d.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      
      // Calcular el ancho de los intervalos (bins)
      const binCount = Math.ceil(Math.sqrt(data.length)); // Regla de la raíz cuadrada
      const binWidth = Math.ceil((max - min) / binCount);
      
      // Crear los bins
      const bins = Array(binCount).fill(0).map((_, i) => ({
        binStart: min + (i * binWidth),
        binEnd: min + ((i + 1) * binWidth),
        frequency: 0
      }));
      
      // Contar frecuencias
      values.forEach(value => {
        const binIndex = Math.floor((value - min) / binWidth);
        if (binIndex >= 0 && binIndex < bins.length) {
          bins[binIndex].frequency++;
        }
      });
      
      // Formatear datos para el gráfico
      return bins.map(bin => ({
        name: `${bin.binStart}-${bin.binEnd}`,
        value: bin.frequency
      }));
    };
    
    switch (type) {
      case 'bar':
        return (
          <div className={chartContainerClass}>
            <h4 className="text-sm font-medium mb-2 text-gray-600">Gráfico de Barras</h4>
            <ResponsiveContainer width="100%" height={containerHeight}>
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
        case 'histogram':
            const histogramData = createHistogramData(data);
            return (
              <div className={chartContainerClass}>
                <h4 className="text-sm font-medium mb-2 text-gray-600">Histograma</h4>
                <ResponsiveContainer width="100%" height={containerHeight}>
                  <BarChart data={histogramData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60} 
                      interval={0}
                      label={{ value: 'Intervalos', position: 'bottom', offset: 40 }}
                    />
                    <YAxis 
                      label={{ value: 'Frecuencia', angle: -90, position: 'insideLeft', offset: -5 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#82ca9d">
                      {histogramData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
        
      case 'pie':
        return (
          <div className={chartContainerClass}>
            <h4 className="text-sm font-medium mb-2 text-gray-600">Gráfico Circular</h4>
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
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      case 'line':
        return (
          <div className={chartContainerClass}>
            <h4 className="text-sm font-medium mb-2 text-gray-600">Gráfico de Líneas</h4>
            <ResponsiveContainer width="100%" height={containerHeight}>
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'people':
        return (
          <div className={chartContainerClass}>
            <h4 className="text-sm font-medium mb-2 text-gray-600">Pictograma</h4>
            <div className="h-full flex flex-col">
              {data.map((item, index) => {
                const Icon = getIconForCategory(item.name);
                const iconCount = item.value;
                return (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium w-24 truncate">{item.name}</span>
                      <span className="text-sm text-gray-500">({item.value})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: iconCount }).map((_, i) => (
                        <Icon
                          key={i}
                          size={16}
                          className="text-blue-500"
                          style={{ color: COLORS[index % COLORS.length] }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderQuestionSection = (title, data) => {
    return (
      <div className="mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200">
          <h3 className="text-lg font-medium mb-6 text-gray-800">{title}</h3>
          
          {selectedChart === 'all' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <div className="min-h-[250px]">{renderChart('bar', data)}</div>
              <div className="min-h-[250px]">{renderChart('histogram', data)}</div>
              <div className="min-h-[250px]">{renderChart('pie', data)}</div>
              <div className="min-h-[250px]">{renderChart('line', data)}</div>
              <div className="min-h-[250px]">{renderChart('people', data)}</div>
            </div>
          ) : (
            <div className="min-h-[350px]">
              {renderChart(selectedChart, data, 300)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-32 h-32 rounded flex items-center justify-center">
            <img src={`${process.env.PUBLIC_URL}/images/hostia.png`} alt="Logo de la Preparatoria" className="w-full h-full object-contain" />
          </div>
          
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

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Resultados de la Encuesta de Arte</h2>
        <p className="text-gray-600 mb-4">Visualización de datos de la encuesta con múltiples tipos de gráficos</p>
        <ChartSelector onChange={setSelectedChart} value={selectedChart} />
      </div>

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