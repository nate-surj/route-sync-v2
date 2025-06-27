
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Zap, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Fuel, 
  DollarSign,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Users,
  Lightbulb
} from 'lucide-react';
import { SmartJobAssignmentService, type JobAssignment } from '@/services/smartJobAssignmentService';
import { toast } from '@/hooks/use-toast';
import { LLMAssignmentEnhancementService, type LLMGlobalEnhancement } from '@/services/llmAssignmentEnhancementService';

interface SmartAssignmentPanelProps {
  onAssignmentComplete?: () => void;
}

export const SmartAssignmentPanel: React.FC<SmartAssignmentPanelProps> = ({ onAssignmentComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [assignments, setAssignments] = useState<JobAssignment[]>([]);
  const [llmEnhancement, setLlmEnhancement] = useState<LLMGlobalEnhancement | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(false);

  // Mock data - in real implementation, this would come from your backend
  const mockJobs = [
    {
      id: 'job_1',
      lat: -1.2921,
      lng: 36.8219,
      address: 'Westlands, Nairobi',
      timeWindow: { start: '09:00', end: '17:00' },
      priority: 'urgent' as const,
      packageWeight: 25,
      estimatedDuration: 30
    },
    {
      id: 'job_2',
      lat: -1.3032,
      lng: 36.8256,
      address: 'Kilimani, Nairobi',
      timeWindow: { start: '10:00', end: '18:00' },
      priority: 'standard' as const,
      packageWeight: 15,
      estimatedDuration: 20
    }
  ];

  const mockDrivers = [
    {
      driverId: 'driver_1',
      currentLat: -1.2864,
      currentLng: 36.8230,
      vehicleType: 'van',
      capacity: 1000,
      currentLoad: 200,
      plannedRoute: [],
      workingHours: { start: '08:00', end: '18:00' },
      performanceScore: 85
    },
    {
      driverId: 'driver_2',
      currentLat: -1.2990,
      currentLng: 36.8150,
      vehicleType: 'truck',
      capacity: 2000,
      currentLoad: 500,
      plannedRoute: [],
      workingHours: { start: '07:00', end: '19:00' },
      performanceScore: 92
    }
  ];

  const runSmartAssignment = async () => {
    setIsAnalyzing(true);
    setLlmEnhancement(null);
    
    try {
      console.log('🤖 Starting Smart Job Assignment...');
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const trafficData = await SmartJobAssignmentService.getTrafficData(mockJobs);
      const jobAssignments = await SmartJobAssignmentService.assignJobsToDrivers(
        mockJobs,
        mockDrivers,
        trafficData
      );
      
      const assignmentAnalytics = SmartJobAssignmentService.generateAssignmentAnalytics(jobAssignments);
      
      setAssignments(jobAssignments);
      setAnalytics(assignmentAnalytics);
      
      toast({
        title: '🤖 Smart Assignment Complete',
        description: `Optimized ${jobAssignments.length} job assignments. Now getting AI insights...`,
      });

      if (jobAssignments.length > 0) {
        setIsEnhancing(true);
        try {
          const enhancement = await LLMAssignmentEnhancementService.getLLMEnhancements(jobAssignments);
          setLlmEnhancement(enhancement);
          toast({
            title: '💡 AI Strategic Review Complete',
            description: 'LLM has provided a holistic analysis of the plan.',
          });
        } catch (enhancementError) {
          console.error('LLM enhancement error:', enhancementError);
          toast({
            title: 'AI Insight Error',
            description: 'Could not get strategic recommendations from the LLM.',
            variant: 'destructive',
          });
        } finally {
          setIsEnhancing(false);
        }
      }
      
    } catch (error) {
      console.error('Smart assignment error:', error);
      toast({
        title: 'Assignment Error',
        description: 'Failed to run smart assignment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyAssignments = async () => {
    // In real implementation, this would update the database
    toast({
      title: 'Assignments Applied',
      description: `${assignments.length} jobs have been automatically assigned to drivers.`,
    });
    
    onAssignmentComplete?.();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'flexible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return '#ef4444'; // red-500
      case 'medium': return '#f97316'; // orange-500
      case 'low': return '#eab308'; // yellow-500
      default: return '#6b7280'; // gray-500
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Smart Job Assignment AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={runSmartAssignment}
                disabled={isAnalyzing}
                className="bg-primary hover:bg-primary-dark"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Run Smart Assignment
                  </>
                )}
              </Button>
              
              {assignments.length > 0 && (
                <Button onClick={applyAssignments} variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Apply Assignments
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Auto-assign:</label>
              <Button
                variant={autoAssignEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoAssignEnabled(!autoAssignEnabled)}
              >
                {autoAssignEnabled ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Processing...</span>
                <span>Analyzing routes and traffic</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics Summary */}
      {analytics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Optimization Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto text-green-600 mb-1" />
                <div className="text-2xl font-bold text-green-600">
                  KES {analytics.totalSavings.cost.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Cost Savings</div>
              </div>
              
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                <div className="text-2xl font-bold text-blue-600">
                  {analytics.totalSavings.time.toFixed(0)}m
                </div>
                <div className="text-xs text-gray-600">Time Saved</div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Fuel className="h-6 w-6 mx-auto text-purple-600 mb-1" />
                <div className="text-2xl font-bold text-purple-600">
                  {analytics.totalSavings.fuel.toFixed(1)}L
                </div>
                <div className="text-xs text-gray-600">Fuel Saved</div>
              </div>
              
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto text-orange-600 mb-1" />
                <div className="text-2xl font-bold text-orange-600">
                  {analytics.estimatedEfficiencyGain.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Efficiency Gain</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Strategic Review */}
      {isEnhancing && (
        <div className="flex items-center gap-2 text-sm text-gray-500 p-4 justify-center">
          <Lightbulb className="h-4 w-4 animate-pulse" />
          Performing strategic review with LLM...
        </div>
      )}
      {llmEnhancement && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI Strategic Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">{llmEnhancement.overallSummary}</p>
            <div className="space-y-4">
              {llmEnhancement.strategicSuggestions.map((suggestion, index) => (
                <div key={index} className="border-l-4 p-4 rounded-r-lg bg-gray-50" style={{ borderColor: getImpactColor(suggestion.impact) }}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">{suggestion.title}</h4>
                    <Badge variant="outline" style={{ borderColor: getImpactColor(suggestion.impact), color: getImpactColor(suggestion.impact) }}>
                      {suggestion.impact.toUpperCase()} IMPACT
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignment Details */}
      {assignments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="assignments">
              <TabsList>
                <TabsTrigger value="assignments">Job Assignments</TabsTrigger>
                <TabsTrigger value="consolidation">Consolidation Opportunities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="assignments" className="space-y-3">
                {assignments.map((assignment, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Job #{assignment.jobId.substring(0, 8)}</div>
                          <div className="text-sm text-gray-600">→ Driver {assignment.recommendedDriverId.substring(0, 8)}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {(assignment.confidenceScore * 100).toFixed(0)}% confidence
                        </Badge>
                        <Badge className={assignment.confidenceScore > 0.8 ? 'bg-green-500' : 'bg-yellow-500'}>
                          {assignment.confidenceScore > 0.8 ? 'Optimal' : 'Good'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span>{assignment.estimatedSavings.distance.toFixed(1)} km saved</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span>{assignment.estimatedSavings.time.toFixed(0)} min saved</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-gray-400" />
                        <span>{assignment.estimatedSavings.fuel.toFixed(1)}L saved</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span>KES {assignment.estimatedSavings.cost.toFixed(0)}</span>
                      </div>
                    </div>
                    
                    {assignment.consolidationOpportunities.length > 0 && (
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="text-xs font-medium text-blue-800 mb-1">Consolidation Opportunities:</div>
                        {assignment.consolidationOpportunities.map((opp: string, i: number) => (
                          <div key={i} className="text-xs text-blue-700">{opp}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="consolidation">
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Route Consolidation Analysis</h3>
                  <p className="text-gray-600">
                    Found {analytics?.consolidationOpportunities || 0} consolidation opportunities that could save additional costs.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
