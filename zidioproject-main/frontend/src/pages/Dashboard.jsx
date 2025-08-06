import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Upload, BarChart3, History, Brain, Download, FileSpreadsheet, Calendar, TrendingUp, Users, Clock, Target, Zap, Activity, PieChart, LineChart, Star, Award, CheckCircle, AlertTriangle, Sparkles, Rocket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardData } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [uploads, setUploads] = useState([]);
  const [stats, setStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Example achievements logic (can be improved)
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const data = await getDashboardData();
        setUploads(data.uploads);
        setStats(data.stats);
        setCategoryStats(data.categoryStats);
        // Example: compute achievements based on stats
        setAchievements([
          { title: 'Data Explorer', desc: 'Uploaded 10+ files', icon: Upload, unlocked: data.stats?.totalUploads >= 10 },
          { title: 'Chart Master', desc: 'Created 25+ charts', icon: BarChart3, unlocked: data.stats?.totalCharts >= 25 },
          { title: 'Insight Hunter', desc: 'Generated 50+ insights', icon: Brain, unlocked: data.stats?.totalInsights >= 50 },
          { title: 'Analytics Pro', desc: 'Analyzed 10K+ rows', icon: Activity, unlocked: data.stats?.totalRows >= 10000 },
        ]);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!stats) return <div className="p-8 text-center text-red-500">Failed to load dashboard data.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Animated Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user?.name}! ✨
              </h1>
              <p className="text-gray-600 text-lg">Transform your data into beautiful insights and visualizations</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.recentUploads}</div>
                <div className="text-sm text-gray-500">This Week</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.avgQuality}%</div>
                <div className="text-sm text-gray-500">Avg Quality</div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Upload className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">{stats.totalUploads}</h3>
              <p className="text-xs opacity-90">Files Uploaded</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">{stats.totalCharts}</h3>
              <p className="text-xs opacity-90">Charts Created</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">{stats.totalRows.toLocaleString()}</h3>
              <p className="text-xs opacity-90">Rows Processed</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Brain className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">{stats.totalInsights}</h3>
              <p className="text-xs opacity-90">AI Insights</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">{stats.avgQuality}%</h3>
              <p className="text-xs opacity-90">Avg Quality</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">{stats.recentUploads}</h3>
              <p className="text-xs opacity-90">This Week</p>
            </CardContent>
          </Card>
        </div>
        {/* Quick Actions with Enhanced Design */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-blue-600" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to="/upload">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold">Upload Excel</h3>
                    <p className="text-sm opacity-90">Start analyzing</p>
                  </CardContent>
                </Card>
              </Link>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <PieChart className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">Create Chart</h3>
                  <p className="text-sm opacity-90">Visualize data</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white border-0 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">AI Insights</h3>
                  <p className="text-sm opacity-90">Get smart analysis</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <Download className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">Export Data</h3>
                  <p className="text-sm opacity-90">Download reports</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enhanced Upload History */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <History className="h-5 w-5 text-blue-600" />
                    <CardTitle>Recent Uploads</CardTitle>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploads.map((upload, index) => {
                    const rows = typeof upload.rows === 'number' ? upload.rows : (upload.parsedData ? upload.parsedData.length : 0);
                    const category = upload.category || 'Uncategorized';
                    const quality = typeof upload.quality === 'number' ? upload.quality : 0;
                    return (
                      <div 
                        key={upload._id || upload.id || index}
                        className="flex items-center justify-between p-4 bg-white/50 rounded-lg border hover:shadow-md transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <FileSpreadsheet className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 truncate max-w-xs">{upload.filename}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Calendar className="h-3 w-3" />
                              <span>{upload.uploadDate ? new Date(upload.uploadDate).toLocaleDateString() : ''}</span>
                              <span>•</span>
                              <span>{rows.toLocaleString()} rows</span>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs">{category}</Badge>
                            </div>
                            {quality > 0 && (
                              <div className="flex items-center space-x-2 mt-1">
                                <Progress value={quality} className="w-20 h-1" />
                                <span className="text-xs text-gray-500">{quality}% quality</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={upload.status === 'processed' ? 'default' : 'secondary'}>
                            {upload.status}
                          </Badge>
                          {upload.status === 'processed' && (
                            <div className="flex space-x-1">
                              <Link to={`/chart/${upload.id}`}>
                                <Button size="sm" variant="outline">
                                  <BarChart3 className="h-4 w-4 mr-1" />
                                  Charts ({upload.chartCount})
                                </Button>
                              </Link>
                              <Link to={`/insight/${upload.id}`}>
                                <Button size="sm" variant="outline">
                                  <Brain className="h-4 w-4 mr-1" />
                                  Insights ({upload.insights})
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Category Breakdown */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  <span>Data Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(count / uploads.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            {/* Achievements */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={achievement.title} 
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                      achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      <achievement.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.desc}</div>
                    </div>
                    {achievement.unlocked && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
                  </div>
                ))}
              </CardContent>
            </Card>
            {/* Activity Feed */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Uploaded Q4 sales data</span>
                  <span className="text-gray-400 text-xs ml-auto">2h ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Generated 5 new charts</span>
                  <span className="text-gray-400 text-xs ml-auto">4h ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">AI analysis completed</span>
                  <span className="text-gray-400 text-xs ml-auto">1d ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Downloaded financial report</span>
                  <span className="text-gray-400 text-xs ml-auto">2d ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Tips & Recommendations */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tips</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>• Upload files with clear column headers for better chart generation</div>
                  <div>• Use consistent date formats across your spreadsheets</div>
                  <div>• Remove empty rows and columns before uploading</div>
                  <div>• Try different chart types to find the best visualization</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  </div>
);
};

export default Dashboard;
