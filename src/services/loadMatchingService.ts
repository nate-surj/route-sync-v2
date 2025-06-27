
interface CargoRequirement {
  id: string;
  weight: number;
  volume: number;
  type: 'fragile' | 'hazardous' | 'perishable' | 'standard';
  pickupLocation: Location;
  deliveryLocation: Location;
  timeWindow: {
    earliest: string;
    latest: string;
  };
  priority: number;
  value: number;
}

interface VehicleCapability {
  id: string;
  maxWeight: number;
  maxVolume: number;
  specializations: string[];
  currentLoad: number;
  location: Location;
  availability: {
    start: string;
    end: string;
  };
  costPerKm: number;
}

interface MatchScore {
  vehicleId: string;
  cargoId: string;
  score: number;
  efficiency: number;
  profitability: number;
  sustainability: number;
  reasons: string[];
}

export class LoadMatchingService {
  // AI-powered cargo-to-vehicle matching system
  static async findOptimalMatches(
    cargoRequirements: CargoRequirement[],
    availableVehicles: VehicleCapability[]
  ): Promise<MatchScore[]> {
    console.log('AI Load Matching: Processing', cargoRequirements.length, 'cargo requests');
    
    const matches: MatchScore[] = [];
    
    for (const cargo of cargoRequirements) {
      for (const vehicle of availableVehicles) {
        const score = await this.calculateMatchScore(cargo, vehicle);
        if (score.score > 0.5) { // Only include viable matches
          matches.push(score);
        }
      }
    }
    
    // Sort by overall score (efficiency + profitability + sustainability)
    return matches.sort((a, b) => b.score - a.score);
  }
  
  private static async calculateMatchScore(
    cargo: CargoRequirement, 
    vehicle: VehicleCapability
  ): Promise<MatchScore> {
    const reasons: string[] = [];
    let score = 0;
    
    // Capacity compatibility (30% weight)
    const capacityScore = this.calculateCapacityScore(cargo, vehicle, reasons);
    
    // Location efficiency (25% weight)
    const locationScore = this.calculateLocationScore(cargo, vehicle, reasons);
    
    // Time compatibility (20% weight)
    const timeScore = this.calculateTimeScore(cargo, vehicle, reasons);
    
    // Specialization match (15% weight)
    const specializationScore = this.calculateSpecializationScore(cargo, vehicle, reasons);
    
    // Profitability (10% weight)
    const profitabilityScore = this.calculateProfitabilityScore(cargo, vehicle, reasons);
    
    score = (capacityScore * 0.3) + 
            (locationScore * 0.25) + 
            (timeScore * 0.2) + 
            (specializationScore * 0.15) + 
            (profitabilityScore * 0.1);
    
    const efficiency = (capacityScore + locationScore + timeScore) / 3;
    const profitability = profitabilityScore;
    const sustainability = this.calculateSustainabilityScore(cargo, vehicle);
    
    return {
      vehicleId: vehicle.id,
      cargoId: cargo.id,
      score,
      efficiency,
      profitability,
      sustainability,
      reasons
    };
  }
  
  private static calculateCapacityScore(
    cargo: CargoRequirement, 
    vehicle: VehicleCapability, 
    reasons: string[]
  ): number {
    const weightUtilization = (cargo.weight + vehicle.currentLoad) / vehicle.maxWeight;
    const volumeUtilization = cargo.volume / vehicle.maxVolume;
    
    if (weightUtilization > 1 || volumeUtilization > 1) {
      reasons.push('Capacity exceeded');
      return 0;
    }
    
    if (weightUtilization > 0.8) {
      reasons.push('Optimal weight utilization');
      return 1;
    } else if (weightUtilization > 0.6) {
      reasons.push('Good weight utilization');
      return 0.8;
    } else {
      reasons.push('Low weight utilization');
      return 0.5;
    }
  }
  
  private static calculateLocationScore(
    cargo: CargoRequirement, 
    vehicle: VehicleCapability, 
    reasons: string[]
  ): number {
    const pickupDistance = this.calculateDistance(vehicle.location, cargo.pickupLocation);
    const deliveryDistance = this.calculateDistance(cargo.pickupLocation, cargo.deliveryLocation);
    
    if (pickupDistance < 10) {
      reasons.push('Vehicle nearby pickup location');
      return 1;
    } else if (pickupDistance < 25) {
      reasons.push('Reasonable distance to pickup');
      return 0.7;
    } else {
      reasons.push('Far from pickup location');
      return 0.3;
    }
  }
  
  private static calculateTimeScore(
    cargo: CargoRequirement, 
    vehicle: VehicleCapability, 
    reasons: string[]
  ): number {
    const cargoStart = new Date(cargo.timeWindow.earliest);
    const cargoEnd = new Date(cargo.timeWindow.latest);
    const vehicleStart = new Date(vehicle.availability.start);
    const vehicleEnd = new Date(vehicle.availability.end);
    
    if (vehicleStart <= cargoStart && vehicleEnd >= cargoEnd) {
      reasons.push('Perfect time alignment');
      return 1;
    } else if (vehicleStart <= cargoEnd && vehicleEnd >= cargoStart) {
      reasons.push('Partial time overlap');
      return 0.6;
    } else {
      reasons.push('No time compatibility');
      return 0;
    }
  }
  
  private static calculateSpecializationScore(
    cargo: CargoRequirement, 
    vehicle: VehicleCapability, 
    reasons: string[]
  ): number {
    if (cargo.type === 'standard') {
      return 1;
    }
    
    if (vehicle.specializations.includes(cargo.type)) {
      reasons.push(`Specialized for ${cargo.type} cargo`);
      return 1;
    } else {
      reasons.push(`Not specialized for ${cargo.type} cargo`);
      return 0.2;
    }
  }
  
  private static calculateProfitabilityScore(
    cargo: CargoRequirement, 
    vehicle: VehicleCapability, 
    reasons: string[]
  ): number {
    const distance = this.calculateDistance(cargo.pickupLocation, cargo.deliveryLocation);
    const estimatedCost = distance * vehicle.costPerKm;
    const estimatedRevenue = cargo.value * 0.1; // 10% of cargo value
    const profit = estimatedRevenue - estimatedCost;
    const profitMargin = profit / estimatedRevenue;
    
    if (profitMargin > 0.3) {
      reasons.push('High profitability');
      return 1;
    } else if (profitMargin > 0.1) {
      reasons.push('Good profitability');
      return 0.7;
    } else {
      reasons.push('Low profitability');
      return 0.3;
    }
  }
  
  private static calculateSustainabilityScore(
    cargo: CargoRequirement, 
    vehicle: VehicleCapability
  ): number {
    const distance = this.calculateDistance(cargo.pickupLocation, cargo.deliveryLocation);
    const efficiency = cargo.weight / distance; // kg per km
    return Math.min(efficiency / 100, 1); // Normalize to 0-1
  }
  
  private static calculateDistance(loc1: Location, loc2: Location): number {
    // Same Haversine formula as in RouteOptimizationService
    const R = 6371;
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}

interface Location {
  lat: number;
  lng: number;
  address: string;
}
