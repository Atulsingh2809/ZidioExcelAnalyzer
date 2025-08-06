import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'; // Uncomment if you have this component
import { Badge } from '../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, ScatterChart as ScatterChartIcon, Download, Settings, ArrowLeft } from 'lucide-react';

const Chart = () => {
  const { id } = useParams();
  const [chartType, setChartType] = useState('bar');
  const [xAxis, setXAxis] = useState('month');
  const [yAxis, setYAxis] = useState('sales');

  // Mock data - replace with actual data from backend
  const mockData = [
    { month: 'Jan', sales: 4000, revenue: 2400, customers: 240 },
    { month: 'Feb', sales: 3000, revenue: 1398, customers: 210 },
    { month: 'Mar', sales: 2000, revenue: 9800, customers: 290 },
    { month: 'Apr', sales: 2780, revenue: 3908, customers: 300 },
    { month: 'May', sales: 1890, revenue: 4800, customers: 181 },
    { month: 'Jun', sales: 2390, revenue: 3800, customers: 250 },
    { month: 'Jul', sales: 3490, revenue: 4300, customers: 320 }
  ];

  const columns = ['month', 'sales', 'revenue', 'customers'];
  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={yAxis} fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={yAxis} stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={mockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey={yAxis}
                nameKey={xAxis}
              >
                {mockData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} type="number" />
              <YAxis dataKey={yAxis} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter fill="#10B981" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { value: 'line', label: 'Line Chart', icon: LineChartIcon },
    { value: 'pie', label: 'Pie Chart', icon: PieChartIcon },
    { value: 'scatter', label: 'Scatter Plot', icon: ScatterChartIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Chart Visualization</h1>
              <p className="text-gray-600">File: sales-data-2024.xlsx</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Download className="h-4 w-4 mr-1" />
              Export Chart
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chart Configuration */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Chart Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Chart Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {chartTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={chartType === type.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType(type.value)}
                      className="flex flex-col items-center p-3 h-auto"
                    >
                      <type.icon className="h-4 w-4 mb-1" />
                      <span className="text-xs">{type.label.split(' ')[0]}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">X-Axis</label>
                <select
                  value={xAxis}
                  onChange={e => setXAxis(e.target.value)}
                  className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {columns.map((column) => (
                    <option key={column} value={column}>
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Y-Axis</label>
                <select
                  value={yAxis}
                  onChange={e => setYAxis(e.target.value)}
                  className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {columns.filter(col => col !== xAxis).map((column) => (
                    <option key={column} value={column}>
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Data Summary</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Records:</span>
                    <Badge variant="secondary">{mockData.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Columns:</span>
                    <Badge variant="secondary">{columns.length}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Display */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>{chartTypes.find(t => t.value === chartType)?.label}</span>
                  </div>
                  <Badge variant="outline">
                    {xAxis} vs {yAxis}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-4">
                  {renderChart()}
                </div>
              </CardContent>
            </Card>

            {/* Data Preview */}
            <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        {columns.map((column) => (
                          <th key={column} className="text-left p-2 font-medium text-gray-700">
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.slice(0, 5).map((row, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          {columns.map((column) => (
                            <td key={column} className="p-2 text-gray-600">
                              {row[column]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {mockData.length > 5 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Showing 5 of {mockData.length} records
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart; 