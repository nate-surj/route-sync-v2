
interface PricingFactors {
  demand: number;
  supply: number;
  distance: number;
  urgency: 'low' | 'normal' | 'high' | 'urgent';
  season: 'peak' | 'normal' | 'low';
  fuelPrice: number;
  competitorRates: number[];
  customerTier: 'basic' | 'premium' | 'enterprise';
  routePopularity: number;
  timeOfDay: 'peak' | 'normal' | 'offpeak';
}

interface PricingRecommendation {
  basePrice: number;
  suggestedPrice: number;
  priceMultiplier: number;
  priceBreakdown: {
    base: number;
    demandSurge: number;
    distanceFactor: number;
    urgencyFactor: number;
    seasonalFactor: number;
    fuelAdjustment: number;
    competitiveAdjustment: number;
  };
  confidence: number;
  reasoning: string[];
}

export class DynamicPricingService {
  // Market-driven rate adjustments with surge pricing
  static calculateDynamicPrice(factors: PricingFactors): PricingRecommendation {
    console.log('Calculating dynamic pricing with factors:', factors);
    
    const basePrice = this.calculateBasePrice(factors.distance);
    const reasoning: string[] = [];
    
    // Demand-supply surge multiplier
    const demandSupplyRatio = factors.demand / factors.supply;
    let surgeFactor = 1;
    
    if (demandSupplyRatio > 2) {
      surgeFactor = 1.5;
      reasoning.push('High demand surge pricing applied');
    } else if (demandSupplyRatio > 1.5) {
      surgeFactor = 1.25;
      reasoning.push('Moderate demand surge pricing applied');
    } else if (demandSupplyRatio < 0.5) {
      surgeFactor = 0.8;
      reasoning.push('Low demand discount applied');
    }
    
    // Urgency multiplier
    const urgencyMultipliers = {
      low: 0.9,
      normal: 1.0,
      high: 1.2,
      urgent: 1.5
    };
    const urgencyFactor = urgencyMultipliers[factors.urgency];
    reasoning.push(`Urgency factor: ${factors.urgency}`);
    
    // Seasonal adjustment
    const seasonalMultipliers = {
      peak: 1.15,
      normal: 1.0,
      low: 0.9
    };
    const seasonalFactor = seasonalMultipliers[factors.season];
    reasoning.push(`Seasonal adjustment: ${factors.season} season`);
    
    // Time of day adjustment
    const timeMultipliers = {
      peak: 1.1,
      normal: 1.0,
      offpeak: 0.95
    };
    const timeFactor = timeMultipliers[factors.timeOfDay];
    
    // Fuel price adjustment
    const baseFuelPrice = 150; // KES per liter
    const fuelAdjustment = factors.fuelPrice / baseFuelPrice;
    reasoning.push(`Fuel adjustment: ${((fuelAdjustment - 1) * 100).toFixed(1)}%`);
    
    // Competitive adjustment
    const avgCompetitorRate = factors.competitorRates.reduce((a, b) => a + b, 0) / factors.competitorRates.length;
    const marketRate = basePrice * surgeFactor * urgencyFactor * seasonalFactor;
    let competitiveAdjustment = 1;
    
    if (marketRate > avgCompetitorRate * 1.1) {
      competitiveAdjustment = 0.95; // Slight discount to stay competitive
      reasoning.push('Competitive pricing adjustment applied');
    }
    
    // Customer tier adjustment
    const tierMultipliers = {
      basic: 1.0,
      premium: 0.95,
      enterprise: 0.9
    };
    const tierFactor = tierMultipliers[factors.customerTier];
    reasoning.push(`Customer tier discount: ${factors.customerTier}`);
    
    // Route popularity adjustment
    const popularityFactor = Math.min(1.1, 1 + (factors.routePopularity - 0.5) * 0.2);
    
    const finalMultiplier = surgeFactor * urgencyFactor * seasonalFactor * 
                           timeFactor * fuelAdjustment * competitiveAdjustment * 
                           tierFactor * popularityFactor;
    
    const suggestedPrice = basePrice * finalMultiplier;
    
    const priceBreakdown = {
      base: basePrice,
      demandSurge: basePrice * (surgeFactor - 1),
      distanceFactor: 0,
      urgencyFactor: basePrice * (urgencyFactor - 1),
      seasonalFactor: basePrice * (seasonalFactor - 1),
      fuelAdjustment: basePrice * (fuelAdjustment - 1),
      competitiveAdjustment: basePrice * (competitiveAdjustment - 1)
    };
    
    const confidence = this.calculatePricingConfidence(factors);
    
    return {
      basePrice,
      suggestedPrice,
      priceMultiplier: finalMultiplier,
      priceBreakdown,
      confidence,
      reasoning
    };
  }
  
  // Real-time price optimization based on market conditions
  static async optimizePriceInRealTime(
    currentPrice: number,
    marketData: {
      activeOrders: number;
      availableDrivers: number;
      avgResponseTime: number;
      customerSatisfaction: number;
    }
  ): Promise<{
    recommendedPrice: number;
    adjustment: number;
    reason: string;
  }> {
    const utilizationRate = marketData.activeOrders / marketData.availableDrivers;
    let adjustment = 1;
    let reason = 'No adjustment needed';
    
    if (utilizationRate > 0.9) {
      adjustment = 1.2;
      reason = 'High utilization - increase price to balance demand';
    } else if (utilizationRate < 0.3) {
      adjustment = 0.9;
      reason = 'Low utilization - decrease price to stimulate demand';
    } else if (marketData.avgResponseTime > 30) {
      adjustment = 1.1;
      reason = 'Long response times - slight price increase';
    } else if (marketData.customerSatisfaction < 0.7) {
      adjustment = 0.95;
      reason = 'Low satisfaction - slight price decrease';
    }
    
    return {
      recommendedPrice: currentPrice * adjustment,
      adjustment,
      reason
    };
  }
  
  private static calculateBasePrice(distance: number): number {
    // Base pricing formula: fixed cost + distance-based cost
    const baseCost = 500; // KES fixed cost
    const costPerKm = 50; // KES per km
    return baseCost + (distance * costPerKm);
  }
  
  private static calculatePricingConfidence(factors: PricingFactors): number {
    let confidence = 0.8; // Base confidence
    
    // Reduce confidence if market conditions are volatile
    const demandSupplyRatio = factors.demand / factors.supply;
    if (demandSupplyRatio > 3 || demandSupplyRatio < 0.3) {
      confidence -= 0.2;
    }
    
    // Increase confidence for regular routes
    if (factors.routePopularity > 0.7) {
      confidence += 0.1;
    }
    
    // Reduce confidence for competitor rate uncertainty
    if (factors.competitorRates.length < 3) {
      confidence -= 0.1;
    }
    
    return Math.max(0.3, Math.min(1.0, confidence));
  }
}
