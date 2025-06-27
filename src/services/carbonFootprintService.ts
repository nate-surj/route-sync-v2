
interface EmissionData {
  vehicleId: string;
  date: string;
  distance: number;
  fuelConsumed: number;
  fuelType: 'diesel' | 'petrol' | 'electric' | 'hybrid';
  load: number;
  route: string;
  co2Emissions: number;
  noxEmissions: number;
  pmEmissions: number;
}

interface CarbonReduction {
  strategy: string;
  potentialReduction: number; // kg CO2
  implementationCost: number;
  paybackPeriod: number; // months
  feasibility: 'high' | 'medium' | 'low';
  priority: number;
}

export class CarbonFootprintService {
  // Environmental impact tracking and optimization
  static async trackCarbonFootprint(
    emissionData: EmissionData[],
    timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'
  ): Promise<{
    totalEmissions: number;
    emissionsByVehicle: { vehicleId: string; emissions: number }[];
    emissionTrends: { date: string; emissions: number }[];
    benchmarkComparison: {
      industry: number;
      bestPractice: number;
      percentile: number;
    };
    recommendations: string[];
  }> {
    console.log('Tracking carbon footprint for', timeframe, 'period');
    
    const filteredData = this.filterDataByTimeframe(emissionData, timeframe);
    
    const totalEmissions = filteredData.reduce((sum, data) => sum + data.co2Emissions, 0);
    
    const emissionsByVehicle = this.calculateEmissionsByVehicle(filteredData);
    const emissionTrends = this.calculateEmissionTrends(filteredData, timeframe);
    const benchmarkComparison = this.getBenchmarkComparison(totalEmissions, filteredData);
    const recommendations = this.generateCarbonRecommendations(filteredData);
    
    return {
      totalEmissions,
      emissionsByVehicle,
      emissionTrends,
      benchmarkComparison,
      recommendations
    };
  }
  
  // Carbon reduction strategy optimization
  static async optimizeCarbonReduction(
    currentEmissions: EmissionData[],
    constraints: {
      budget: number;
      timeframe: number; // months
      emissionTarget: number; // % reduction
    }
  ): Promise<{
    strategies: CarbonReduction[];
    optimalCombination: CarbonReduction[];
    projectedReduction: number;
    totalCost: number;
    roi: number;
    timeline: { month: number; reduction: number; cost: number }[];
  }> {
    console.log('Optimizing carbon reduction strategies');
    
    const strategies = this.identifyReductionStrategies(currentEmissions);
    const optimalCombination = this.selectOptimalStrategies(strategies, constraints);
    
    const projectedReduction = optimalCombination.reduce((sum, strategy) => 
      sum + strategy.potentialReduction, 0
    );
    
    const totalCost = optimalCombination.reduce((sum, strategy) => 
      sum + strategy.implementationCost, 0
    );
    
    const roi = this.calculateCarbonROI(projectedReduction, totalCost);
    const timeline = this.createImplementationTimeline(optimalCombination, constraints.timeframe);
    
    return {
      strategies,
      optimalCombination,
      projectedReduction,
      totalCost,
      roi,
      timeline
    };
  }
  
  // Real-time emission calculation
  static calculateRealTimeEmissions(
    vehicleData: {
      fuelType: 'diesel' | 'petrol' | 'electric' | 'hybrid';
      fuelConsumption: number; // liters per 100km
      load: number; // kg
      efficiency: number;
    },
    tripData: {
      distance: number;
      speed: number;
      traffic: 'light' | 'moderate' | 'heavy';
      terrain: 'flat' | 'hilly' | 'mixed';
    }
  ): {
    estimatedEmissions: number;
    emissionRate: number; // kg CO2 per km
    optimizationSuggestions: string[];
    alternativeOptions: {
      option: string;
      emissionReduction: number;
      costImpact: number;
    }[];
  } {
    const emissionFactors = {
      diesel: 2.68, // kg CO2 per liter
      petrol: 2.31,
      electric: 0.45, // kg CO2 per kWh (grid mix)
      hybrid: 1.85
    };
    
    const baseFuelConsumption = (tripData.distance / 100) * vehicleData.fuelConsumption;
    
    // Adjust for conditions
    let adjustmentFactor = 1.0;
    
    // Traffic adjustment
    const trafficFactors = { light: 1.0, moderate: 1.15, heavy: 1.3 };
    adjustmentFactor *= trafficFactors[tripData.traffic];
    
    // Terrain adjustment
    const terrainFactors = { flat: 1.0, hilly: 1.2, mixed: 1.1 };
    adjustmentFactor *= terrainFactors[tripData.terrain];
    
    // Load adjustment
    const loadFactor = 1 + (vehicleData.load / 1000) * 0.1;
    adjustmentFactor *= loadFactor;
    
    const actualFuelConsumption = baseFuelConsumption * adjustmentFactor;
    const estimatedEmissions = actualFuelConsumption * emissionFactors[vehicleData.fuelType];
    const emissionRate = estimatedEmissions / tripData.distance;
    
    const optimizationSuggestions = [
      'Maintain optimal speed (60-80 km/h) for lowest emissions',
      'Reduce idling time',
      'Plan routes to avoid traffic congestion',
      'Optimize load distribution'
    ];
    
    if (tripData.speed > 80) {
      optimizationSuggestions.push('Reduce speed to lower emissions');
    }
    
    if (vehicleData.load < 500) {
      optimizationSuggestions.push('Consolidate shipments to improve efficiency');
    }
    
    const alternativeOptions = [
      {
        option: 'Electric vehicle',
        emissionReduction: estimatedEmissions * 0.83, // 83% reduction
        costImpact: 150 // Additional cost in KES
      },
      {
        option: 'Hybrid vehicle',
        emissionReduction: estimatedEmissions * 0.31, // 31% reduction
        costImpact: 50
      },
      {
        option: 'Route optimization',
        emissionReduction: estimatedEmissions * 0.15, // 15% reduction
        costImpact: -25 // Cost savings
      }
    ];
    
    return {
      estimatedEmissions,
      emissionRate,
      optimizationSuggestions,
      alternativeOptions
    };
  }
  
  private static filterDataByTimeframe(data: EmissionData[], timeframe: string): EmissionData[] {
    const now = new Date();
    let cutoffDate: Date;
    
    switch (timeframe) {
      case 'daily':
        cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'weekly':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'monthly':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'yearly':
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  }
  
  private static calculateEmissionsByVehicle(data: EmissionData[]): { vehicleId: string; emissions: number }[] {
    const vehicleEmissions = new Map<string, number>();
    
    data.forEach(item => {
      const current = vehicleEmissions.get(item.vehicleId) || 0;
      vehicleEmissions.set(item.vehicleId, current + item.co2Emissions);
    });
    
    return Array.from(vehicleEmissions.entries()).map(([vehicleId, emissions]) => ({
      vehicleId,
      emissions
    }));
  }
  
  private static calculateEmissionTrends(data: EmissionData[], timeframe: string): { date: string; emissions: number }[] {
    const trends = new Map<string, number>();
    
    data.forEach(item => {
      const date = item.date.split('T')[0]; // Get date part only
      const current = trends.get(date) || 0;
      trends.set(date, current + item.co2Emissions);
    });
    
    return Array.from(trends.entries())
      .map(([date, emissions]) => ({ date, emissions }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
  
  private static getBenchmarkComparison(totalEmissions: number, data: EmissionData[]): {
    industry: number;
    bestPractice: number;
    percentile: number;
  } {
    const totalDistance = data.reduce((sum, item) => sum + item.distance, 0);
    const emissionRate = totalEmissions / totalDistance; // kg CO2 per km
    
    // Industry benchmarks (kg CO2 per km)
    const industryAverage = 0.85;
    const bestPractice = 0.55;
    
    let percentile = 50; // Default median
    if (emissionRate <= bestPractice) {
      percentile = 95;
    } else if (emissionRate <= industryAverage) {
      percentile = 75;
    } else if (emissionRate <= industryAverage * 1.2) {
      percentile = 50;
    } else {
      percentile = 25;
    }
    
    return {
      industry: industryAverage,
      bestPractice,
      percentile
    };
  }
  
  private static generateCarbonRecommendations(data: EmissionData[]): string[] {
    const recommendations = [];
    
    const avgEmissionRate = data.reduce((sum, item) => 
      sum + (item.co2Emissions / item.distance), 0
    ) / data.length;
    
    if (avgEmissionRate > 0.85) {
      recommendations.push('Emission rate above industry average - consider fleet modernization');
    }
    
    const highEmissionVehicles = data.filter(item => 
      (item.co2Emissions / item.distance) > 1.0
    ).length;
    
    if (highEmissionVehicles > data.length * 0.2) {
      recommendations.push('20% of fleet has high emissions - prioritize vehicle replacement');
    }
    
    const fuelTypes = new Set(data.map(item => item.fuelType));
    if (!fuelTypes.has('electric') && !fuelTypes.has('hybrid')) {
      recommendations.push('Consider introducing electric or hybrid vehicles');
    }
    
    return recommendations;
  }
  
  private static identifyReductionStrategies(data: EmissionData[]): CarbonReduction[] {
    const strategies: CarbonReduction[] = [
      {
        strategy: 'Electric Vehicle Adoption',
        potentialReduction: data.reduce((sum, item) => sum + item.co2Emissions, 0) * 0.8,
        implementationCost: 3000000,
        paybackPeriod: 36,
        feasibility: 'medium',
        priority: 1
      },
      {
        strategy: 'Route Optimization',
        potentialReduction: data.reduce((sum, item) => sum + item.co2Emissions, 0) * 0.15,
        implementationCost: 500000,
        paybackPeriod: 12,
        feasibility: 'high',
        priority: 2
      },
      {
        strategy: 'Driver Training Program',
        potentialReduction: data.reduce((sum, item) => sum + item.co2Emissions, 0) * 0.1,
        implementationCost: 200000,
        paybackPeriod: 8,
        feasibility: 'high',
        priority: 3
      },
      {
        strategy: 'Vehicle Maintenance Optimization',
        potentialReduction: data.reduce((sum, item) => sum + item.co2Emissions, 0) * 0.08,
        implementationCost: 100000,
        paybackPeriod: 6,
        feasibility: 'high',
        priority: 4
      }
    ];
    
    return strategies.sort((a, b) => a.priority - b.priority);
  }
  
  private static selectOptimalStrategies(
    strategies: CarbonReduction[], 
    constraints: any
  ): CarbonReduction[] {
    const selected = [];
    let remainingBudget = constraints.budget;
    let totalReduction = 0;
    
    for (const strategy of strategies) {
      if (strategy.implementationCost <= remainingBudget && 
          strategy.paybackPeriod <= constraints.timeframe) {
        selected.push(strategy);
        remainingBudget -= strategy.implementationCost;
        totalReduction += strategy.potentialReduction;
        
        if (totalReduction >= constraints.emissionTarget) {
          break;
        }
      }
    }
    
    return selected;
  }
  
  private static calculateCarbonROI(reduction: number, cost: number): number {
    // Calculate ROI based on carbon credit value and operational savings
    const carbonCreditValue = reduction * 50; // KES per kg CO2
    const operationalSavings = reduction * 0.15 * 150; // Fuel savings
    const totalBenefit = carbonCreditValue + operationalSavings;
    
    return (totalBenefit - cost) / cost;
  }
  
  private static createImplementationTimeline(
    strategies: CarbonReduction[], 
    timeframe: number
  ): { month: number; reduction: number; cost: number }[] {
    const timeline = [];
    let monthsUsed = 0;
    
    for (const strategy of strategies) {
      const implementationMonths = Math.min(strategy.paybackPeriod, timeframe - monthsUsed);
      
      for (let month = 1; month <= implementationMonths; month++) {
        timeline.push({
          month: monthsUsed + month,
          reduction: strategy.potentialReduction / implementationMonths,
          cost: strategy.implementationCost / implementationMonths
        });
      }
      
      monthsUsed += implementationMonths;
      if (monthsUsed >= timeframe) break;
    }
    
    return timeline;
  }
}
