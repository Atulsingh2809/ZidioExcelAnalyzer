import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input'; // Uncomment if you have this component
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'; // Uncomment if you have these components
import { Users, FileSpreadsheet, BarChart3, Activity, Search, MoreHorizontal, Trash2, Eye } from 'lucide-react';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual data from backend
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalUploads: 3456,
    totalCharts: 8912,
    storageUsed: '2.4 GB',
    monthlyGrowth: 12.5
  };

  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', uploads: 15, lastActive: '2024-01-15', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', uploads: 8, lastActive: '2024-01-14', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', uploads: 23, lastActive: '2024-01-10', status: 'inactive' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'user', uploads: 7, lastActive: '2024-01-13', status: 'active' }
  ];

  const uploads = [
    { id: '1', filename: 'sales-data-2024.xlsx', user: 'John Doe', size: '2.4 MB', uploadDate: '2024-01-15', status: 'processed', charts: 3 },
    { id: '2', filename: 'customer-analytics.xlsx', user: 'Alice Brown', size: '1.8 MB', uploadDate: '2024-01-14', status: 'processed', charts: 2 },
    { id: '3', filename: 'inventory-report.xlsx', user: 'Bob Johnson', size: '3.2 MB', uploadDate: '2024-01-13', status: 'processing', charts: 0 },
    { id: '4', filename: 'financial-summary.xlsx', user: 'Jane Smith', size: '1.1 MB', uploadDate: '2024-01-12', status: 'processed', charts: 5 }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUploads = uploads.filter(upload => 
    upload.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    upload.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, monitor system performance, and analyze platform usage</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Users</p>
                  <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Uploads</p>
                  <p className="text-2xl font-bold">{stats.totalUploads.toLocaleString()}</p>
                </div>
                <FileSpreadsheet className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Charts Created</p>
                  <p className="text-2xl font-bold">{stats.totalCharts.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <Badge variant="outline">{stats.storageUsed}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Growth</span>
                  <Badge variant="default">+{stats.monthlyGrowth}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">System Status</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">15 new uploads today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">8 new user registrations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">42 charts generated</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Export User Data
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  System Backup
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Management</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Tabs and tables would go here. For now, show users and uploads in sequence. */}
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Users ({users.length})</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-700">User</th>
                      <th className="text-left p-3 font-medium text-gray-700">Role</th>
                      <th className="text-left p-3 font-medium text-gray-700">Uploads</th>
                      <th className="text-left p-3 font-medium text-gray-700">Last Active</th>
                      <th className="text-left p-3 font-medium text-gray-700">Status</th>
                      <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-gray-800">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-3 text-gray-600">{user.uploads}</td>
                        <td className="p-3 text-gray-600">{new Date(user.lastActive).toLocaleDateString()}</td>
                        <td className="p-3">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-lg font-bold mb-2">Uploads ({uploads.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-700">File</th>
                      <th className="text-left p-3 font-medium text-gray-700">User</th>
                      <th className="text-left p-3 font-medium text-gray-700">Size</th>
                      <th className="text-left p-3 font-medium text-gray-700">Upload Date</th>
                      <th className="text-left p-3 font-medium text-gray-700">Status</th>
                      <th className="text-left p-3 font-medium text-gray-700">Charts</th>
                      <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUploads.map((upload) => (
                      <tr key={upload.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <FileSpreadsheet className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-gray-800 truncate max-w-xs">{upload.filename}</span>
                          </div>
                        </td>
                        <td className="p-3 text-gray-600">{upload.user}</td>
                        <td className="p-3 text-gray-600">{upload.size}</td>
                        <td className="p-3 text-gray-600">{new Date(upload.uploadDate).toLocaleDateString()}</td>
                        <td className="p-3">
                          <Badge variant={upload.status === 'processed' ? 'default' : 'secondary'}>
                            {upload.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-gray-600">{upload.charts}</td>
                        <td className="p-3">
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
