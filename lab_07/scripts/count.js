// Try following this function with the first two features in seating.geojson.
// Example: countInZone(features, "eastWest", "West").
function countInZone(features, field, zoneName) {
  let count = 0; // Each call begins a fresh count for one zone.

  for (const feature of features) {
    // Brackets read the property named by field: either eastWest or northSouth.
    if (feature.properties[field] === zoneName) {
      count = count + 1;
    }
  }

  return count; // Give the finished number back to the caller.
}
