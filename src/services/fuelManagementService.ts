
interface FuelConsumption {
  vehicleId: string;
  date: string;
  distance: number;
  fuelUsed: number;
  cost: number;
  route: string;
  driverBehavior: {
    avgSpeed: number;
    acceleration: number;
    braking: number;
    idling: number; // minutes
  };
}

interface FuelOptimization {
  vehicleId: string;
  currentEfficiency: number; // km per liter
  targetEfficiency: number;
  potentialSavings: number;
  recommendations: string[];
  driverTrainingNeeded: boolean;
  maintenanceRequired: boolean;
}

export class FuelManagementService {
  // Fuel consumption tracking and optimization
  static async trackFuelConsumption(
    vehicleId: string,
    consumptionData: FuelConsumption[]
  ): Promise<{
    currentEfficiency: number;
    trend: 'improving' | 'stable' | 'declining';
    monthlyConsumption: number;
    monthlyCost: number;
    benchmark: number;
    recommendations: string[];
  }> {
    console.log('Tracking fuel consumption for vehicle:', vehicleId);
    
    const recentData = consumptionData
      .filter(data => data.vehicleId === vehicleId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30); // Last 30 records
    
    if (recentData.length === 0) {
      return {
        currentEfficiency: 0,
        trend: 'stable',
        monthlyConsumption: 0,
        monthlyCost: 0,
        benchmark: 0,
        recommendations: ['No data available']
      };
    }
    
    const currentEfficiency = this.calculateAverageEfficiency(recentData);
    const trend = this.analyzeTrend(recentData);
    const monthlyConsumption = recentData.reduce((sum, data) => sum + data.fuelUsed, 0);
    const monthlyCost = recentData.reduce((sum, data) => sum + data.cost, 0);
    const benchmark = this.getBenchmarkEfficiency(recentData[0]); // Based on vehicle type
    
    const recommendations = this.generateFuelRecommendations(recentData, benchmark);
    
    return {
      currentEfficiency,
      trend,
      monthlyConsumption,
      monthlyCost,
      benchmark,
      recommendations
    };
  }
  
  // Optimize fuel efficiency through route and behavior analysis
  static async optimizeFuelEfficiency(
    consumptionData: FuelConsumption[]
  ): Promise<FuelOptimization[]> {
    console.log('Optimizing fuel efficiency for fleet');
    
    const vehicleGroups = this.groupByVehicle(consumptionData);
    const optimizations: FuelOptimization[] = [];
    
    for (const [vehicleId, data] of vehicleGroups) {
      const currentEfficiency = this.calculateAverageEfficiency(data);
      const targetEfficiency = this.calculateTargetEfficiency(data);
      const potentialSavings = this.calculatePotentialSavings(data, targetEfficiency);
      const recommendations = this.generateOptimizationRecommendations(data);
      
      optimizations.push({
        vehicleId,
        currentEfficiency,
        targetEfficiency,
        potentialSavings,
        recommendations,
        driverTrainingNeeded: this.needsDriverTraining(data),
        maintenanceRequired: this.needsMaintenance(data)
      });
    }
    
    return optimizations.sort((a, b) => b.potentialSavings - a.potentialSavings);
  }
  
  // Real-time fuel optimization suggestions
  static getRealtimeOptimization(
    currentRoute: {
      distance: number;
      traffic: 'light' | 'moderate' | 'heavy';
      terrain: 'flat' | 'hilly' | 'mixed';
    },
    vehicleData: {
      type: string;
      efficiency: number;
      load: number;
    }
  ): {
    estimatedFuelUsage: number;
    estimatedCost: number;
    optimizationTips: string[];
    alternativeRoutes?: {
      route: string;
      fuelSavings: number;
      timeDifference: number;
    }[];
  } {
    const baseConsumption = currentRoute.distance / vehicleData.efficiency;
    
    // Adjust for traffic conditions
    const trafficMultipliers = {
      light: 1.0,
      moderate: 1.15,
      heavy: 1.3
    };
    
    // Adjust for terrain
    const terrainMultipliers = {
      flat: 1.0,
      hilly: 1.2,
      mixed: 1.1
    };
    
    // Adjust for load
    const loadMultiplier = 1 + (vehicleData.load / 1000) * 0.1; // 10% increase per ton
    
    const estimatedFuelUsage = baseConsumption * 
                              trafficMultipliers[currentRoute.traffic] * 
                              terrainMultipliers[currentRoute.terrain] * 
                              loadMultiplier;
    
    const estimatedCost = estimatedFuelUsage * 150; // KES per liter
    
    const optimizationTips = [
      'Maintain steady speed between 60-80 km/h for optimal efficiency',
      'Avoid aggressive acceleration and braking',
      'Use cruise control on highways when possible',
      'Plan routes to avoid peak traffic hours'
    ];
    
    if (currentRoute.traffic === 'heavy') {
      optimizationTips.push('Consider alternative routes to avoid traffic');
    }
    
    if (vehicleData.load > 500) {
      optimizationTips.push('Heavy load detected - extra gentle acceleration recommended');
    }
    
    return {
      estimatedFuelUsage,
      estimatedCost,
      optimizationTips
    };
  }
  
  private static calculateAverageEfficiency(data: FuelConsumption[]): number {
    if (data.length === 0) return 0;
    
    const totalDistance = data.reduce((sum, item) => sum + item.distance, 0);
    const totalFuel = data.reduce((sum, item) => sum + item.fuelUsed, 0);
    
    return totalDistance / totalFuel;
  }
  
  private static analyzeTrend(data: FuelConsumption[]): 'improving' | 'stable' | 'declining' {
    if (data.length < 5) return 'stable';
    
    const recent = data.slice(0, 5);
    const older = data.slice(5, 10);
    
    const recentEfficiency = this.calculateAverageEfficiency(recent);
    const olderEfficiency = this.calculateAverageEfficiency(older);
    
    const change = (recentEfficiency - olderEfficiency) / olderEfficiency;
    
    if (change > 0.05) return 'improving';
    if (change < -0.05) return 'declining';
    return 'stable';
  }
  
  private static getBenchmarkEfficiency(sampleData: FuelConsumption): number {
    // Simplified benchmark based on vehicle type (would be more sophisticated in reality)
    return 8; // km per liter benchmark for trucks
  }
  
  private static generateFuelRecommendations(
    data: FuelConsumption[], 
    benchmark: number
  ): string[] {
    const recommendations = [];
    const avgEfficiency = this.calculateAverageEfficiency(data);
    
    if (avgEfficiency < benchmark * 0.8) {
      recommendations.push('Fuel efficiency significantly below benchmark - schedule maintenance check');
    }
    
    const avgIdling = data.reduce((sum, item) => sum + item.driverBehavior.idling, 0) / data.length;
    if (avgIdling > 15) {
      recommendations.push('Reduce idling time - currently averaging ' + avgIdling.toFixed(1) + ' minutes per trip');
    }
    
    const avgSpeed = data.reduce((sum, item) => sum + item.driverBehavior.avgSpeed, 0) / data.length;
    if (avgSpeed > 90) {
      recommendations.push('Reduce average speed for better fuel efficiency');
    }
    
    return recommendations;
  }
  
  private static groupByVehicle(data: FuelConsumption[]): Map<string, FuelConsumption[]> {
    const groups = new Map<string, FuelConsumption[]>();
    
    data.forEach(item => {
      if (!groups.has(item.vehicleId)) {
        groups.set(item.vehicleId, []);
      }
      groups.get(item.vehicleId)!.push(item);
    });
    
    return groups;
  }
  
  private static calculateTargetEfficiency(data: FuelConsumption[]): number {
    const current = this.calculateAverageEfficiency(data);
    return current * 1.15; // 15% improvement target
  }
  
  private static calculatePotentialSavings(
    data: FuelConsumption[], 
    targetEfficiency: number
  ): number {
    const currentEfficiency = this.calculateAverageEfficiency(data);
    const monthlyCost = data.reduce((sum, item) => sum + item.cost, 0);
    const improvement = (targetEfficiency - currentEfficiency) / currentEfficiency;
    
    return monthlyCost * improvement;
  }
  
  private static generateOptimizationRecommendations(data: FuelConsumption[]): string[] {
    const recommendations = [];
    
    // Analyze driver behavior patterns
    const avgAcceleration = data.reduce((sum, item) => sum + item.driverBehavior.acceleration, 0) / data.length;
    if (avgAcceleration > 1.5) {
      recommendations.push('Reduce aggressive acceleration');
    }
    
    const avgBraking = data.reduce((sum, item) => sum + item.driverBehavior.braking, 0) / data.length;
    if (avgBraking > 1.5) {
      recommendations.push('Improve braking technique');
    }
    
    // Route optimization
    const routeEfficiency = this.analyzeRouteEfficiency(data);
    if (routeEfficiency < 0.8) {
      recommendations.push('Optimize route planning');
    }
    
    return recommendations;
  }
  
  private static needsDriverTraining(data: FuelConsumption[]): boolean {
    const behaviorScore = this.calculateBehaviorScore(data);
    return behaviorScore < 0.7;
  }
  
  private static needsMaintenance(data: FuelConsumption[]): boolean {
    const efficiencyTrend = this.analyzeTrend(data);
    return efficiencyTrend === 'declining';
  }
  
  private static analyzeRouteEfficiency(data: FuelConsumption[]): number {
    // Simplified route efficiency analysis
    return 0.85; // Would analyze actual vs. optimal routes
  }
  
  private static calculateBehaviorScore(data: FuelConsumption[]): number {
    // Simplified driver behavior scoring
    const avgIdling = data.reduce((sum, item) => sum + item.driverBehavior.idling, 0) / data.length;
    const avgAcceleration = data.reduce((sum, item) => sum + item.driverBehavior.acceleration, 0) / data.length;
    const avgBraking = data.reduce((sum, item) => sum + item.driverBehavior.braking, 0) / data.length;
    
    let score = 1.0;
    score -= Math.max(0, (avgIdling - 10) / 100); // Penalty for excess idling
    score -= Math.max(0, (avgAcceleration - 1.0) / 10); // Penalty for aggressive acceleration
    score -= Math.max(0, (avgBraking - 1.0) / 10); // Penalty for aggressive braking
    
    return Math.max(0, score);
  }
}
