export interface DriverLocation {
  driverId: string;
  currentLat: number;
  currentLng: number;
  vehicleType: string;
  capacity: number;
  currentLoad: number;
  plannedRoute: DeliveryWaypoint[];
  workingHours: {
    start: string;
    end: string;
  };
  performanceScore: number;
}

export interface DeliveryWaypoint {
  id: string;
  lat: number;
  lng: number;
  address: string;
  timeWindow: {
    start: string;
    end: string;
  };
  priority: 'urgent' | 'standard' | 'flexible';
  packageWeight: number;
  estimatedDuration: number;
}

export interface JobAssignment {
  jobId: string;
  recommendedDriverId: string;
  confidenceScore: number;
  estimatedSavings: {
    distance: number;
    time: number;
    fuel: number;
    cost: number;
  };
  consolidationOpportunities: string[];
  routeOptimization: {
    newRoute: DeliveryWaypoint[];
    totalDistance: number;
    estimatedDuration: number;
  };
}

interface TrafficData {
  segmentId: string;
  averageSpeed: number;
  congestionLevel: 'low' | 'medium' | 'high';
  estimatedDelay: number;
}

export class SmartJobAssignmentService {
  private static readonly EARTH_RADIUS_KM = 6371;
  private static readonly MAX_ASSIGNMENT_DISTANCE_KM = 50;
  private static readonly CONSOLIDATION_RADIUS_KM = 5;

  // Main AI assignment function
  static async assignJobsToDrivers(
    availableJobs: DeliveryWaypoint[],
    activeDrivers: DriverLocation[],
    trafficData: TrafficData[] = []
  ): Promise<JobAssignment[]> {
    console.log('🤖 Smart Job Assignment AI: Processing', availableJobs.length, 'jobs for', activeDrivers.length, 'drivers');
    
    const assignments: JobAssignment[] = [];
    
    for (const job of availableJobs) {
      const assignment = await this.findOptimalDriverAssignment(job, activeDrivers, trafficData);
      if (assignment) {
        assignments.push(assignment);
      }
    }
    
    // Sort by confidence score and potential savings
    return assignments.sort((a, b) => 
      (b.confidenceScore * b.estimatedSavings.cost) - (a.confidenceScore * a.estimatedSavings.cost)
    );
  }

  // Find optimal driver for a specific job
  private static async findOptimalDriverAssignment(
    job: DeliveryWaypoint,
    drivers: DriverLocation[],
    trafficData: TrafficData[]
  ): Promise<JobAssignment | null> {
    let bestDriver: DriverLocation | null = null;
    let bestScore = 0;
    let bestSavings = { distance: 0, time: 0, fuel: 0, cost: 0 };
    let consolidationOps: string[] = [];

    for (const driver of drivers) {
      // Check if driver can handle the job
      if (!this.canDriverHandleJob(driver, job)) continue;

      // Calculate proximity score
      const proximityScore = this.calculateProximityScore(driver, job);
      
      // Calculate route optimization potential
      const routeOptimization = this.calculateRouteOptimization(driver, job, trafficData);
      
      // Calculate consolidation opportunities
      const consolidation = this.findConsolidationOpportunities(driver, job);
      
      // Calculate total efficiency score
      const efficiencyScore = this.calculateEfficiencyScore(
        proximityScore,
        routeOptimization,
        consolidation,
        driver.performanceScore
      );

      if (efficiencyScore > bestScore) {
        bestScore = efficiencyScore;
        bestDriver = driver;
        bestSavings = routeOptimization.savings;
        consolidationOps = consolidation.opportunities;
      }
    }

    if (!bestDriver || bestScore < 0.3) return null;

    return {
      jobId: job.id,
      recommendedDriverId: bestDriver.driverId,
      confidenceScore: bestScore,
      estimatedSavings: bestSavings,
      consolidationOpportunities: consolidationOps,
      routeOptimization: {
        newRoute: [...bestDriver.plannedRoute, job],
        totalDistance: this.calculateTotalDistance([...bestDriver.plannedRoute, job]),
        estimatedDuration: this.calculateTotalDuration([...bestDriver.plannedRoute, job], trafficData)
      }
    };
  }

  // Check if driver can handle the specific job
  private static canDriverHandleJob(driver: DriverLocation, job: DeliveryWaypoint): boolean {
    // Check capacity
    if (driver.currentLoad + job.packageWeight > driver.capacity) {
      return false;
    }

    // Check distance from current location
    const distance = this.calculateDistance(
      driver.currentLat,
      driver.currentLng,
      job.lat,
      job.lng
    );
    
    if (distance > this.MAX_ASSIGNMENT_DISTANCE_KM) {
      return false;
    }

    // Check time window compatibility
    return this.isTimeWindowCompatible(driver.workingHours, job.timeWindow);
  }

  // Calculate proximity score based on distance and current route
  private static calculateProximityScore(driver: DriverLocation, job: DeliveryWaypoint): number {
    const directDistance = this.calculateDistance(
      driver.currentLat,
      driver.currentLng,
      job.lat,
      job.lng
    );

    // Check distance to planned route waypoints
    let minRouteDistance = directDistance;
    for (const waypoint of driver.plannedRoute) {
      const waypointDistance = this.calculateDistance(
        waypoint.lat,
        waypoint.lng,
        job.lat,
        job.lng
      );
      minRouteDistance = Math.min(minRouteDistance, waypointDistance);
    }

    // Score inversely related to distance (closer = higher score)
    const maxDistance = this.MAX_ASSIGNMENT_DISTANCE_KM;
    return Math.max(0, (maxDistance - minRouteDistance) / maxDistance);
  }

  // Calculate route optimization potential
  private static calculateRouteOptimization(
    driver: DriverLocation,
    job: DeliveryWaypoint,
    trafficData: TrafficData[]
  ) {
    const currentRoute = driver.plannedRoute;
    const currentDistance = this.calculateTotalDistance(currentRoute);
    const currentDuration = this.calculateTotalDuration(currentRoute, trafficData);

    // Find optimal insertion point for new job
    const optimizedRoute = this.findOptimalInsertionPoint(currentRoute, job);
    const newDistance = this.calculateTotalDistance(optimizedRoute);
    const newDuration = this.calculateTotalDuration(optimizedRoute, trafficData);

    const distanceSaving = Math.max(0, currentDistance - newDistance);
    const timeSaving = Math.max(0, currentDuration - newDuration);
    const fuelSaving = distanceSaving * 0.1; // Assume 0.1L per km
    const costSaving = fuelSaving * 150 + (timeSaving / 60) * 500; // KES per liter + per hour

    return {
      savings: {
        distance: distanceSaving,
        time: timeSaving,
        fuel: fuelSaving,
        cost: costSaving
      },
      optimizedRoute
    };
  }

  // Find consolidation opportunities
  private static findConsolidationOpportunities(driver: DriverLocation, job: DeliveryWaypoint) {
    const opportunities: string[] = [];
    
    for (const waypoint of driver.plannedRoute) {
      const distance = this.calculateDistance(
        waypoint.lat,
        waypoint.lng,
        job.lat,
        job.lng
      );
      
      if (distance <= this.CONSOLIDATION_RADIUS_KM) {
        opportunities.push(
          `Consolidate with delivery at ${waypoint.address} (${distance.toFixed(1)}km away)`
        );
      }
    }

    return { opportunities };
  }

  // Calculate overall efficiency score
  private static calculateEfficiencyScore(
    proximityScore: number,
    routeOptimization: any,
    consolidation: any,
    performanceScore: number
  ): number {
    const proximity = proximityScore * 0.4;
    const savings = Math.min(routeOptimization.savings.cost / 1000, 1) * 0.3;
    const consolidationBonus = consolidation.opportunities.length * 0.1;
    const performance = (performanceScore / 100) * 0.2;

    return proximity + savings + consolidationBonus + performance;
  }

  // Find optimal insertion point in route
  private static findOptimalInsertionPoint(
    route: DeliveryWaypoint[],
    newJob: DeliveryWaypoint
  ): DeliveryWaypoint[] {
    if (route.length === 0) return [newJob];

    let bestInsertionIndex = 0;
    let minAdditionalDistance = Infinity;

    for (let i = 0; i <= route.length; i++) {
      const testRoute = [...route];
      testRoute.splice(i, 0, newJob);
      
      const additionalDistance = this.calculateAdditionalDistance(route, testRoute);
      
      if (additionalDistance < minAdditionalDistance) {
        minAdditionalDistance = additionalDistance;
        bestInsertionIndex = i;
      }
    }

    const optimizedRoute = [...route];
    optimizedRoute.splice(bestInsertionIndex, 0, newJob);
    return optimizedRoute;
  }

  // Calculate additional distance when adding a job
  private static calculateAdditionalDistance(
    originalRoute: DeliveryWaypoint[],
    newRoute: DeliveryWaypoint[]
  ): number {
    const originalDistance = this.calculateTotalDistance(originalRoute);
    const newDistance = this.calculateTotalDistance(newRoute);
    return newDistance - originalDistance;
  }

  // Calculate total distance of a route
  private static calculateTotalDistance(route: DeliveryWaypoint[]): number {
    if (route.length < 2) return 0;

    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += this.calculateDistance(
        route[i].lat,
        route[i].lng,
        route[i + 1].lat,
        route[i + 1].lng
      );
    }
    return totalDistance;
  }

  // Calculate total duration considering traffic
  private static calculateTotalDuration(
    route: DeliveryWaypoint[],
    trafficData: TrafficData[]
  ): number {
    if (route.length < 2) return 0;

    let totalDuration = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const segmentDistance = this.calculateDistance(
        route[i].lat,
        route[i].lng,
        route[i + 1].lat,
        route[i + 1].lng
      );
      
      // Apply traffic data if available
      const averageSpeed = this.getAverageSpeedWithTraffic(segmentDistance, trafficData);
      const segmentDuration = (segmentDistance / averageSpeed) * 60; // Convert to minutes
      
      totalDuration += segmentDuration + route[i].estimatedDuration;
    }
    return totalDuration;
  }

  // Get average speed considering traffic
  private static getAverageSpeedWithTraffic(distance: number, trafficData: TrafficData[]): number {
    // Default speed in km/h
    let baseSpeed = 40;
    
    // Apply traffic congestion if data available
    if (trafficData.length > 0) {
      const avgCongestion = trafficData.reduce((sum, data) => {
        switch (data.congestionLevel) {
          case 'high': return sum + 0.6;
          case 'medium': return sum + 0.8;
          case 'low': return sum + 1.0;
          default: return sum + 1.0;
        }
      }, 0) / trafficData.length;
      
      baseSpeed *= avgCongestion;
    }
    
    return Math.max(baseSpeed, 10); // Minimum 10 km/h
  }

  // Calculate distance between two points using Haversine formula
  private static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return this.EARTH_RADIUS_KM * c;
  }

  // Check time window compatibility
  private static isTimeWindowCompatible(
    driverHours: { start: string; end: string },
    jobWindow: { start: string; end: string }
  ): boolean {
    const driverStart = new Date(`1970-01-01T${driverHours.start}`);
    const driverEnd = new Date(`1970-01-01T${driverHours.end}`);
    const jobStart = new Date(`1970-01-01T${jobWindow.start}`);
    const jobEnd = new Date(`1970-01-01T${jobWindow.end}`);

    return jobStart >= driverStart && jobEnd <= driverEnd;
  }

  // Get real-time traffic data (mock implementation)
  static async getTrafficData(route: DeliveryWaypoint[]): Promise<TrafficData[]> {
    // In real implementation, this would call traffic APIs like Google Maps, HERE, etc.
    return route.map((waypoint, index) => ({
      segmentId: `segment_${index}`,
      averageSpeed: 35 + Math.random() * 20, // 35-55 km/h
      congestionLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      estimatedDelay: Math.random() * 15 // 0-15 minutes
    })) as TrafficData[];
  }

  // Generate assignment analytics
  static generateAssignmentAnalytics(assignments: JobAssignment[]) {
    const totalSavings = assignments.reduce((sum, assignment) => ({
      distance: sum.distance + assignment.estimatedSavings.distance,
      time: sum.time + assignment.estimatedSavings.time,
      fuel: sum.fuel + assignment.estimatedSavings.fuel,
      cost: sum.cost + assignment.estimatedSavings.cost
    }), { distance: 0, time: 0, fuel: 0, cost: 0 });

    const consolidationCount = assignments.reduce(
      (sum, assignment) => sum + assignment.consolidationOpportunities.length, 0
    );

    return {
      totalJobs: assignments.length,
      totalSavings,
      consolidationOpportunities: consolidationCount,
      averageConfidence: assignments.reduce((sum, a) => sum + a.confidenceScore, 0) / assignments.length,
      estimatedEfficiencyGain: (totalSavings.cost / 10000) * 100 // Percentage
    };
  }
}
