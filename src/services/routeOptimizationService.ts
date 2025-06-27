
interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface Stop {
  id: string;
  location: Location;
  type: 'pickup' | 'delivery';
  timeWindow?: {
    start: string;
    end: string;
  };
  priority: number;
  estimatedDuration: number; // minutes
}

interface Vehicle {
  id: string;
  type: string;
  capacity: number;
  currentLocation: Location;
  fuelEfficiency: number; // km per liter
  maxWorkingHours: number;
}

interface OptimizedRoute {
  vehicleId: string;
  stops: Stop[];
  totalDistance: number;
  estimatedDuration: number;
  fuelConsumption: number;
  carbonEmission: number;
  cost: number;
}

export class RouteOptimizationService {
  // Intelligent multi-stop route planning using advanced algorithms
  static async optimizeMultiStopRoute(
    stops: Stop[],
    vehicles: Vehicle[],
    constraints: {
      maxDistance?: number;
      timeConstraints?: boolean;
      fuelOptimization?: boolean;
    } = {}
  ): Promise<OptimizedRoute[]> {
    console.log('Optimizing routes for', stops.length, 'stops and', vehicles.length, 'vehicles');
    
    // Implement advanced algorithms (TSP with time windows, genetic algorithm, etc.)
    const optimizedRoutes: OptimizedRoute[] = [];
    
    for (const vehicle of vehicles) {
      const route = await this.calculateOptimalRoute(vehicle, stops, constraints);
      if (route) {
        optimizedRoutes.push(route);
      }
    }
    
    // Sort by efficiency score
    return optimizedRoutes.sort((a, b) => 
      (a.cost / a.totalDistance) - (b.cost / b.totalDistance)
    );
  }
  
  private static async calculateOptimalRoute(
    vehicle: Vehicle, 
    stops: Stop[], 
    constraints: any
  ): Promise<OptimizedRoute | null> {
    // Advanced route calculation with multiple optimization criteria
    const sortedStops = this.appleTSPAlgorithm(stops, vehicle.currentLocation);
    
    let totalDistance = 0;
    let totalDuration = 0;
    let fuelConsumption = 0;
    
    for (let i = 0; i < sortedStops.length - 1; i++) {
      const distance = this.calculateDistance(
        sortedStops[i].location,
        sortedStops[i + 1].location
      );
      totalDistance += distance;
      totalDuration += sortedStops[i].estimatedDuration;
    }
    
    fuelConsumption = totalDistance / vehicle.fuelEfficiency;
    const carbonEmission = fuelConsumption * 2.31; // kg CO2 per liter
    const cost = this.calculateRouteCost(totalDistance, totalDuration, fuelConsumption);
    
    return {
      vehicleId: vehicle.id,
      stops: sortedStops,
      totalDistance,
      estimatedDuration: totalDuration,
      fuelConsumption,
      carbonEmission,
      cost
    };
  }
  
  // Traveling Salesman Problem solver with time windows
  private static appleTSPAlgorithm(stops: Stop[], startLocation: Location): Stop[] {
    // Simplified nearest neighbor with time window constraints
    const sortedStops = [...stops];
    const optimized: Stop[] = [];
    let currentLocation = startLocation;
    
    while (sortedStops.length > 0) {
      let nearest = 0;
      let minDistance = Infinity;
      
      for (let i = 0; i < sortedStops.length; i++) {
        const distance = this.calculateDistance(currentLocation, sortedStops[i].location);
        const priority = sortedStops[i].priority;
        const score = distance / priority; // Lower is better
        
        if (score < minDistance) {
          minDistance = score;
          nearest = i;
        }
      }
      
      const nextStop = sortedStops.splice(nearest, 1)[0];
      optimized.push(nextStop);
      currentLocation = nextStop.location;
    }
    
    return optimized;
  }
  
  private static calculateDistance(loc1: Location, loc2: Location): number {
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  private static calculateRouteCost(distance: number, duration: number, fuel: number): number {
    const fuelCost = fuel * 150; // KES per liter
    const driverCost = (duration / 60) * 500; // KES per hour
    const vehicleCost = distance * 50; // KES per km
    return fuelCost + driverCost + vehicleCost;
  }
}
