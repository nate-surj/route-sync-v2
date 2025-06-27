
interface DemandData {
  date: string;
  route: string;
  volume: number;
  value: number;
  season: 'peak' | 'normal' | 'low';
}

interface CapacityData {
  date: string;
  vehicleType: string;
  availableCapacity: number;
  utilization: number;
}

interface MarketConditions {
  fuelPrice: number;
  competitorRates: number[];
  economicIndicators: {
    gdp: number;
    inflation: number;
    tradeVolume: number;
  };
}

interface Forecast {
  period: string;
  predictedDemand: number;
  recommendedCapacity: number;
  optimalPricing: number;
  confidence: number;
  factors: string[];
}

export class PredictiveAnalyticsService {
  // Demand forecasting using historical data and market trends
  static async forecastDemand(
    historicalData: DemandData[],
    marketConditions: MarketConditions,
    forecastPeriod: number = 30 // days
  ): Promise<Forecast[]> {
    console.log('Generating demand forecast for', forecastPeriod, 'days');
    
    const forecasts: Forecast[] = [];
    
    // Analyze seasonal patterns
    const seasonalTrends = this.analyzeSeasonalTrends(historicalData);
    
    // Calculate trend growth
    const trendGrowth = this.calculateTrendGrowth(historicalData);
    
    // Market impact analysis
    const marketImpact = this.calculateMarketImpact(marketConditions);
    
    for (let i = 1; i <= forecastPeriod; i++) {
      const forecastDate = new Date();
      forecastDate.setDate(forecastDate.getDate() + i);
      
      const baseDemand = this.calculateBaseDemand(historicalData);
      const seasonalAdjustment = this.getSeasonalAdjustment(forecastDate, seasonalTrends);
      const trendAdjustment = trendGrowth * i;
      const marketAdjustment = marketImpact;
      
      const predictedDemand = baseDemand * seasonalAdjustment * (1 + trendAdjustment) * (1 + marketAdjustment);
      
      const forecast: Forecast = {
        period: forecastDate.toISOString().split('T')[0],
        predictedDemand,
        recommendedCapacity: predictedDemand * 1.1, // 10% buffer
        optimalPricing: this.calculateOptimalPricing(predictedDemand, marketConditions),
        confidence: this.calculateConfidence(historicalData.length, i),
        factors: this.identifyKeyFactors(seasonalAdjustment, trendAdjustment, marketAdjustment)
      };
      
      forecasts.push(forecast);
    }
    
    return forecasts;
  }
  
  // Capacity planning optimization
  static async optimizeCapacityPlanning(
    currentCapacity: CapacityData[],
    demandForecast: Forecast[],
    constraints: {
      maxCapacityIncrease: number;
      budgetLimit: number;
      leadTime: number; // days to acquire new capacity
    }
  ): Promise<{
    recommendations: {
      vehicleType: string;
      action: 'acquire' | 'reallocate' | 'retire';
      quantity: number;
      timing: string;
      cost: number;
      roi: number;
    }[];
    expectedUtilization: number;
    costSavings: number;
  }> {
    console.log('Optimizing capacity planning');
    
    const recommendations = [];
    let totalCost = 0;
    let expectedRevenue = 0;
    
    // Analyze capacity gaps
    const capacityGaps = this.analyzeCapacityGaps(currentCapacity, demandForecast);
    
    for (const gap of capacityGaps) {
      if (gap.shortage > 0) {
        const recommendation = {
          vehicleType: gap.vehicleType,
          action: 'acquire' as const,
          quantity: Math.ceil(gap.shortage / gap.averageCapacity),
          timing: gap.urgentDate,
          cost: gap.acquisitionCost,
          roi: gap.expectedROI
        };
        
        if (totalCost + recommendation.cost <= constraints.budgetLimit) {
          recommendations.push(recommendation);
          totalCost += recommendation.cost;
          expectedRevenue += gap.expectedRevenue;
        }
      }
    }
    
    const expectedUtilization = this.calculateExpectedUtilization(currentCapacity, recommendations);
    const costSavings = expectedRevenue - totalCost;
    
    return {
      recommendations,
      expectedUtilization,
      costSavings
    };
  }
  
  private static analyzeSeasonalTrends(data: DemandData[]): { [month: number]: number } {
    const monthlyAverages: { [month: number]: number[] } = {};
    
    data.forEach(item => {
      const month = new Date(item.date).getMonth();
      if (!monthlyAverages[month]) monthlyAverages[month] = [];
      monthlyAverages[month].push(item.volume);
    });
    
    const seasonalFactors: { [month: number]: number } = {};
    const overallAverage = data.reduce((sum, item) => sum + item.volume, 0) / data.length;
    
    Object.keys(monthlyAverages).forEach(month => {
      const monthNum = parseInt(month);
      const monthAverage = monthlyAverages[monthNum].reduce((a, b) => a + b, 0) / monthlyAverages[monthNum].length;
      seasonalFactors[monthNum] = monthAverage / overallAverage;
    });
    
    return seasonalFactors;
  }
  
  private static calculateTrendGrowth(data: DemandData[]): number {
    if (data.length < 2) return 0;
    
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstPeriod = sortedData.slice(0, Math.floor(sortedData.length / 2));
    const secondPeriod = sortedData.slice(Math.floor(sortedData.length / 2));
    
    const firstAverage = firstPeriod.reduce((sum, item) => sum + item.volume, 0) / firstPeriod.length;
    const secondAverage = secondPeriod.reduce((sum, item) => sum + item.volume, 0) / secondPeriod.length;
    
    return (secondAverage - firstAverage) / firstAverage / (sortedData.length / 2);
  }
  
  private static calculateMarketImpact(conditions: MarketConditions): number {
    // Simplified market impact calculation
    let impact = 0;
    
    // Fuel price impact (negative correlation)
    impact -= (conditions.fuelPrice - 150) / 1000; // Baseline fuel price 150 KES
    
    // Economic indicators impact
    impact += conditions.economicIndicators.gdp / 10000;
    impact += conditions.economicIndicators.tradeVolume / 10000;
    impact -= conditions.economicIndicators.inflation / 1000;
    
    return Math.max(-0.5, Math.min(0.5, impact)); // Cap between -50% and +50%
  }
  
  private static calculateBaseDemand(data: DemandData[]): number {
    return data.reduce((sum, item) => sum + item.volume, 0) / data.length;
  }
  
  private static getSeasonalAdjustment(date: Date, seasonalTrends: { [month: number]: number }): number {
    return seasonalTrends[date.getMonth()] || 1;
  }
  
  private static calculateOptimalPricing(demand: number, conditions: MarketConditions): number {
    const basePricing = 100; // KES per kg
    const demandMultiplier = Math.log(demand / 1000 + 1); // Logarithmic pricing
    const competitorAverage = conditions.competitorRates.reduce((a, b) => a + b, 0) / conditions.competitorRates.length;
    
    return basePricing * demandMultiplier * (competitorAverage / basePricing);
  }
  
  private static calculateConfidence(dataPoints: number, daysAhead: number): number {
    const baseConfidence = Math.min(dataPoints / 100, 1); // More data = higher confidence
    const timeDecay = Math.exp(-daysAhead / 30); // Confidence decreases over time
    return baseConfidence * timeDecay;
  }
  
  private static identifyKeyFactors(seasonal: number, trend: number, market: number): string[] {
    const factors = [];
    
    if (Math.abs(seasonal - 1) > 0.1) {
      factors.push(`Seasonal effect: ${seasonal > 1 ? 'peak' : 'low'} season`);
    }
    
    if (Math.abs(trend) > 0.01) {
      factors.push(`Market trend: ${trend > 0 ? 'growing' : 'declining'}`);
    }
    
    if (Math.abs(market) > 0.05) {
      factors.push(`Market conditions: ${market > 0 ? 'favorable' : 'challenging'}`);
    }
    
    return factors;
  }
  
  private static analyzeCapacityGaps(
    capacity: CapacityData[], 
    forecast: Forecast[]
  ): Array<{
    vehicleType: string;
    shortage: number;
    averageCapacity: number;
    urgentDate: string;
    acquisitionCost: number;
    expectedROI: number;
    expectedRevenue: number;
  }> {
    // Simplified capacity gap analysis
    return [
      {
        vehicleType: 'truck',
        shortage: 5000,
        averageCapacity: 1000,
        urgentDate: '2024-02-01',
        acquisitionCost: 2000000,
        expectedROI: 0.25,
        expectedRevenue: 500000
      }
    ];
  }
  
  private static calculateExpectedUtilization(
    current: CapacityData[], 
    recommendations: any[]
  ): number {
    return 0.85; // 85% utilization target
  }
}
