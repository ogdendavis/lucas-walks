export function getColorForActivityType(activityType) {
    switch (activityType.toLowerCase()) {
        case 'run':
            return '#bb5761';
        case 'walk':
        case 'hike':
            return '#648381';
        case 'ride':
            return '#ffbf46';
        default:
            console.warn(`Unknown activity type: ${activityType}, using default color.`);
            return '#1177cc';
    }
}
