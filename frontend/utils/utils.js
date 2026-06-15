export function getColorForActivityType(activityType) {
    switch (activityType.toLowerCase()) {
        case 'run':
            return '#575761';
        case 'walk':
            return '#648381';
        case 'hike':
            return '#8acb88';
        case 'ride':
            return '#ffbf46';
        default:
            console.warn(`Unknown activity type: ${activityType}, using default color.`);
            return '#1177cc';
    }
}
