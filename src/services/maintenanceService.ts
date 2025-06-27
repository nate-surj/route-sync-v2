
interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'routine' | 'repair' | 'inspection' | 'emergency';
  date: string;
  mileage: number;
  cost: number;
  description: string;
  partsReplaced: string[];
  nextServiceDue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface VehicleCondition {
  vehicleId: string;
  mileage: number;
  engineHours: number;
  lastService: string;
  upcomingServices: {
    type: string;
    dueDate: string;
    dueMileage: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }[];
  healthScore: number;
  predictedFailures: {
    component: string;
    probability: number;
    estimatedDate: string;
    cost: number;
  }[];
}

export class MaintenanceService {
  // Predictive maintenance scheduling
  static async schedulePredictiveMaintenance(
    vehicleConditions: VehicleCondition[],
    maintenanceHistory: MaintenanceRecord[]
  ): Promise<{
    urgentMaintenance: {
      vehicleId: string;
      issue: string;
      priority: string;
      estimatedCost: number;
      recommendedDate: string;
    }[];
    scheduledMaintenance: {
      vehicleId: string;
      type: string;
      dueDate: string;
      cost: number;
    }[];
    costOptimization: {
      totalCost: number;
      savings: number;
      recommendations: string[];
    };
  }> {
    console.log('Scheduling predictive maintenance for', vehicleConditions.length, 'vehicles');
    
    const urgentMaintenance = [];
    const scheduledMaintenance = [];
    
    for (const condition of vehicleConditions) {
      // Analyze urgent maintenance needs
      const urgent = this.identifyUrgentMaintenance(condition, maintenanceHistory);
      urgentMaintenance.push(...urgent);
      
      // Schedule routine maintenance
      const scheduled = this.scheduleRoutineMaintenance(condition);
      scheduledMaintenance.push(...scheduled);
    }
    
    const costOptimization = this.optimizeMaintenanceCosts(
      urgentMaintenance, 
      scheduledMaintenance, 
      maintenanceHistory
    );
    
    return {
      urgentMaintenance,
      scheduledMaintenance,
      costOptimization
    };
  }
  
  // Predictive failure analysis using machine learning patterns
  static async predictComponentFailures(
    vehicleId: string,
    maintenanceHistory: MaintenanceRecord[],
    operationalData: {
      dailyMileage: number;
      avgLoad: number;
      routeConditions: 'urban' | 'highway' | 'mixed';
      driverBehavior: {
        harshAcceleration: number;
        harshBraking: number;
        overspeeding: number;
      };
    }
  ): Promise<{
    predictions: {
      component: string;
      failureProbability: number;
      estimatedFailureDate: string;
      replacementCost: number;
      downtimeCost: number;
      preventiveCost: number;
      recommendation: 'replace_now' | 'monitor' | 'schedule_maintenance';
    }[];
    overallRiskScore: number;
    recommendedActions: string[];
  }> {
    console.log('Predicting component failures for vehicle:', vehicleId);
    
    const vehicleHistory = maintenanceHistory.filter(record => record.vehicleId === vehicleId);
    const predictions = [];
    
    // Analyze key components
    const components = [
      'engine', 'transmission', 'brakes', 'tires', 'suspension', 
      'electrical', 'cooling_system', 'fuel_system'
    ];
    
    for (const component of components) {
      const prediction = await this.analyzeComponentHealth(
        component, 
        vehicleHistory, 
        operationalData
      );
      predictions.push(prediction);
    }
    
    const overallRiskScore = this.calculateOverallRisk(predictions);
    const recommendedActions = this.generateRecommendations(predictions);
    
    return {
      predictions,
      overallRiskScore,
      recommendedActions
    };
  }
  
  // Optimize maintenance costs and scheduling
  static optimizeMaintenanceSchedule(
    vehicles: VehicleCondition[],
    constraints: {
    maxSimultaneousVehicles: number;
    availableServiceSlots: { date: string; capacity: number }[];
    budgetLimit: number;
    operationalRequirements: {
      minimumActiveFleet: number;
      peakDemandPeriods: string[];
    };
  }): {
    optimizedSchedule: {
      date: string;
      vehicleId: string;
      maintenanceType: string;
      cost: number;
      duration: number;
    }[];
    costSavings: number;
    availabilityScore: number;
  } {
    console.log('Optimizing maintenance schedule for fleet');
    
    const optimizedSchedule = [];
    let totalCost = 0;
    
    // Sort vehicles by maintenance urgency and operational impact
    const prioritizedVehicles = this.prioritizeMaintenanceOrder(vehicles, constraints);
    
    for (const vehicle of prioritizedVehicles) {
      for (const service of vehicle.upcomingServices) {
        const optimalSlot = this.findOptimalMaintenanceSlot(
          vehicle.vehicleId,
          service,
          constraints
        );
        
        if (optimalSlot && totalCost + optimalSlot.cost <= constraints.budgetLimit) {
          optimizedSchedule.push(optimalSlot);
          totalCost += optimalSlot.cost;
        }
      }
    }
    
    const costSavings = this.calculateCostSavings(optimizedSchedule, vehicles);
    const availabilityScore = this.calculateFleetAvailability(optimizedSchedule, vehicles);
    
    return {
      optimizedSchedule,
      costSavings,
      availabilityScore
    };
  }
  
  private static identifyUrgentMaintenance(
    condition: VehicleCondition, 
    history: MaintenanceRecord[]
  ): Array<{
    vehicleId: string;
    issue: string;
    priority: string;
    estimatedCost: number;
    recommendedDate: string;
  }> {
    const urgent = [];
    
    // Check for critical health score
    if (condition.healthScore < 0.3) {
      urgent.push({
        vehicleId: condition.vehicleId,
        issue: 'Critical health score - immediate inspection required',
        priority: 'critical',
        estimatedCost: 15000,
        recommendedDate: new Date().toISOString().split('T')[0]
      });
    }
    
    // Check for overdue maintenance
    const overdueServices = condition.upcomingServices.filter(service => 
      new Date(service.dueDate) < new Date() && service.priority === 'high'
    );
    
    for (const service of overdueServices) {
      urgent.push({
        vehicleId: condition.vehicleId,
        issue: `Overdue ${service.type}`,
        priority: 'high',
        estimatedCost: 8000,
        recommendedDate: new Date().toISOString().split('T')[0]
      });
    }
    
    return urgent;
  }
  
  private static scheduleRoutineMaintenance(condition: VehicleCondition): Array<{
    vehicleId: string;
    type: string;
    dueDate: string;
    cost: number;
  }> {
    return condition.upcomingServices.map(service => ({
      vehicleId: condition.vehicleId,
      type: service.type,
      dueDate: service.dueDate,
      cost: this.estimateServiceCost(service.type)
    }));
  }
  
  private static async analyzeComponentHealth(
    component: string,
    history: MaintenanceRecord[],
    operationalData: any
  ): Promise<{
    component: string;
    failureProbability: number;
    estimatedFailureDate: string;
    replacementCost: number;
    downtimeCost: number;
    preventiveCost: number;
    recommendation: 'replace_now' | 'monitor' | 'schedule_maintenance';
  }> {
    // Simplified component analysis - in reality would use ML models
    const componentHistory = history.filter(record => 
      record.description.toLowerCase().includes(component) ||
      record.partsReplaced.some(part => part.toLowerCase().includes(component))
    );
    
    let failureProbability = 0.1; // Base probability
    
    // Increase probability based on history
    if (componentHistory.length > 0) {
      const daysSinceLastService = this.daysSinceLastService(componentHistory);
      failureProbability += Math.min(0.8, daysSinceLastService / 365);
    }
    
    // Adjust based on operational stress
    const stressFactor = this.calculateStressFactor(component, operationalData);
    failureProbability *= stressFactor;
    
    const estimatedFailureDate = new Date();
    estimatedFailureDate.setDate(estimatedFailureDate.getDate() + (365 * (1 - failureProbability)));
    
    const costs = this.getComponentCosts(component);
    
    let recommendation: 'replace_now' | 'monitor' | 'schedule_maintenance' = 'monitor';
    if (failureProbability > 0.7) {
      recommendation = 'replace_now';
    } else if (failureProbability > 0.4) {
      recommendation = 'schedule_maintenance';
    }
    
    return {
      component,
      failureProbability,
      estimatedFailureDate: estimatedFailureDate.toISOString().split('T')[0],
      replacementCost: costs.replacement,
      downtimeCost: costs.downtime,
      preventiveCost: costs.preventive,
      recommendation
    };
  }
  
  private static optimizeMaintenanceCosts(
    urgent: any[], 
    scheduled: any[], 
    history: MaintenanceRecord[]
  ): {
    totalCost: number;
    savings: number;
    recommendations: string[];
  } {
    const totalCost = urgent.reduce((sum, item) => sum + item.estimatedCost, 0) +
                     scheduled.reduce((sum, item) => sum + item.cost, 0);
    
    // Calculate potential savings through optimization
    const bulkDiscountSavings = totalCost * 0.05; // 5% bulk discount
    const preventiveSavings = this.calculatePreventiveSavings(history);
    
    const savings = bulkDiscountSavings + preventiveSavings;
    
    const recommendations = [
      'Schedule multiple services together for bulk discounts',
      'Prioritize preventive maintenance to avoid costly repairs',
      'Consider maintenance contracts for predictable costs'
    ];
    
    return {
      totalCost,
      savings,
      recommendations
    };
  }
  
  private static calculateOverallRisk(predictions: any[]): number {
    const avgRisk = predictions.reduce((sum, p) => sum + p.failureProbability, 0) / predictions.length;
    return avgRisk;
  }
  
  private static generateRecommendations(predictions: any[]): string[] {
    const recommendations = [];
    
    const criticalComponents = predictions.filter(p => p.failureProbability > 0.7);
    if (criticalComponents.length > 0) {
      recommendations.push(`Immediate attention required for: ${criticalComponents.map(c => c.component).join(', ')}`);
    }
    
    const monitorComponents = predictions.filter(p => p.failureProbability > 0.4 && p.failureProbability <= 0.7);
    if (monitorComponents.length > 0) {
      recommendations.push(`Schedule maintenance for: ${monitorComponents.map(c => c.component).join(', ')}`);
    }
    
    return recommendations;
  }
  
  private static prioritizeMaintenanceOrder(vehicles: VehicleCondition[], constraints: any): VehicleCondition[] {
    return vehicles.sort((a, b) => {
      // Sort by health score (lower first) and operational impact
      const scoreA = a.healthScore;
      const scoreB = b.healthScore;
      return scoreA - scoreB;
    });
  }
  
  private static findOptimalMaintenanceSlot(
    vehicleId: string,
    service: any,
    constraints: any
  ): {
    date: string;
    vehicleId: string;
    maintenanceType: string;
    cost: number;
    duration: number;
  } | null {
    // Find the best available slot considering constraints
    const availableSlots = constraints.availableServiceSlots.filter(slot => 
      slot.capacity > 0 && 
      !constraints.operationalRequirements.peakDemandPeriods.includes(slot.date)
    );
    
    if (availableSlots.length > 0) {
      return {
        date: availableSlots[0].date,
        vehicleId,
        maintenanceType: service.type,
        cost: this.estimateServiceCost(service.type),
        duration: this.estimateServiceDuration(service.type)
      };
    }
    
    return null;
  }
  
  private static calculateCostSavings(schedule: any[], vehicles: VehicleCondition[]): number {
    // Calculate savings from optimized scheduling
    return schedule.length * 500; // Simplified savings calculation
  }
  
  private static calculateFleetAvailability(schedule: any[], vehicles: VehicleCondition[]): number {
    // Calculate fleet availability score
    const totalVehicles = vehicles.length;
    const avgDowntime = schedule.reduce((sum, item) => sum + item.duration, 0) / schedule.length;
    return Math.max(0, 1 - (avgDowntime / (24 * totalVehicles)));
  }
  
  private static estimateServiceCost(serviceType: string): number {
    const costs = {
      'routine': 5000,
      'inspection': 3000,
      'repair': 12000,
      'emergency': 20000
    };
    return costs[serviceType as keyof typeof costs] || 5000;
  }
  
  private static estimateServiceDuration(serviceType: string): number {
    const durations = {
      'routine': 4,
      'inspection': 2,
      'repair': 8,
      'emergency': 12
    };
    return durations[serviceType as keyof typeof durations] || 4;
  }
  
  private static daysSinceLastService(history: MaintenanceRecord[]): number {
    if (history.length === 0) return 365;
    
    const lastService = history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const daysDiff = (new Date().getTime() - new Date(lastService.date).getTime()) / (1000 * 3600 * 24);
    return daysDiff;
  }
  
  private static calculateStressFactor(component: string, operationalData: any): number {
    // Component-specific stress calculation
    let factor = 1.0;
    
    switch (component) {
      case 'brakes':
        factor += operationalData.driverBehavior.harshBraking * 0.1;
        break;
      case 'engine':
        factor += operationalData.driverBehavior.harshAcceleration * 0.1;
        factor += (operationalData.dailyMileage / 500) * 0.2;
        break;
      case 'tires':
        factor += operationalData.driverBehavior.overspeeding * 0.1;
        break;
    }
    
    return Math.min(2.0, factor);
  }
  
  private static getComponentCosts(component: string): {
    replacement: number;
    downtime: number;
    preventive: number;
  } {
    const costs = {
      'engine': { replacement: 500000, downtime: 100000, preventive: 25000 },
      'transmission': { replacement: 300000, downtime: 80000, preventive: 15000 },
      'brakes': { replacement: 50000, downtime: 20000, preventive: 8000 },
      'tires': { replacement: 40000, downtime: 10000, preventive: 5000 }
    };
    
    return costs[component as keyof typeof costs] || { replacement: 100000, downtime: 30000, preventive: 10000 };
  }
  
  private static calculatePreventiveSavings(history: MaintenanceRecord[]): number {
    const repairCosts = history.filter(r => r.type === 'repair').reduce((sum, r) => sum + r.cost, 0);
    const routineCosts = history.filter(r => r.type === 'routine').reduce((sum, r) => sum + r.cost, 0);
    
    // Estimate that preventive maintenance could have avoided 60% of repair costs
    return repairCosts * 0.6 - routineCosts * 0.2;
  }
}
