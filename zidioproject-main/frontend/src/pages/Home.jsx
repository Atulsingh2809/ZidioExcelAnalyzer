import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BarChart3, Upload, Eye, Download, Brain, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const features = [
    {
      icon: Upload,
      title: 'Upload Excel Files',
      description: 'Drag and drop .xls/.xlsx files with instant parsing and validation'
    },
    {
      icon: BarChart3,
      title: '2D & 3D Visualization',
      description: 'Create stunning charts with customizable axes and multiple chart types'
    },
    {
      icon: Eye,
      title: 'Upload History',
      description: 'Access and revisit all your previous uploads and visualizations'
    },
    {
      icon: Download,
      title: 'Export Charts',
      description: 'Download your visualizations as PNG or PDF files'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Get intelligent analysis and pattern recognition from your data'
    },
    {
      icon: Shield,
      title: 'Admin Dashboard',
      description: 'Comprehensive user management and system analytics for admins'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Excel Analytics & Visualization Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your Excel data into beautiful, interactive visualizations with AI-powered insights. 
            Upload, analyze, and share your data stories effortlessly.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-[#111827] text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-none hover:bg-[#1e293b] transition">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="bg-white text-[#111827] font-semibold text-lg px-8 py-3 rounded-lg border border-[#e5e7eb] shadow-none hover:bg-gray-100 transition"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Everything you need for data visualization
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to visualize your data?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust ExcelViz for their data analytics needs
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 